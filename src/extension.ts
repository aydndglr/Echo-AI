import * as vscode from "vscode"
import * as dotenvx from "@dotenvx/dotenvx"
import * as path from "path"

// Load environment variables from .env file
try {
	const envPath = path.join(__dirname, "..", ".env")
	dotenvx.config({ path: envPath })
} catch (e) {
	console.warn("Failed to load environment variables:", e)
}

import type { CloudUserInfo, AuthState } from "@echo-ai/types"
// import { CloudService, BridgeOrchestrator } from "@echo-ai/cloud" // 🗑️ Cloud Kaldırıldı
import { TelemetryService } from "@echo-ai/telemetry"

import "./utils/path"
import { createOutputChannelLogger } from "./utils/outputChannelLogger"

import { Package } from "./shared/package"
import { formatLanguage } from "./shared/language"
import { ContextProxy } from "./core/config/ContextProxy"
import { ClineProvider } from "./core/webview/ClineProvider"
import { DIFF_VIEW_URI_SCHEME } from "./integrations/editor/DiffViewProvider"
import { TerminalRegistry } from "./integrations/terminal/TerminalRegistry"
import { McpServerManager } from "./services/mcp/McpServerManager"
import { CodeIndexManager } from "./services/code-index/manager"
import { MdmService } from "./services/mdm/MdmService"
import { migrateSettings } from "./utils/migrateSettings"
import { autoImportSettings } from "./utils/autoImportSettings"
import { API } from "./extension/api"

import {
	handleUri,
	registerCommands,
	registerCodeActions,
	registerTerminalActions,
	CodeActionProvider,
} from "./activate"
import { initializeI18n } from "./i18n"
import { initializeModelCacheRefresh } from "./api/providers/fetchers/modelCache"

// ✅ SAHTE (MOCK) TELEMETRİ - EKLENTİNİN ÇÖKMEMESİ İÇİN GEREKLİ
class MockTelemetryClient {
    async capture(eventName: string, properties?: Record<string, any>): Promise<void> {
        // Boş işlem
    }
    async identify(distinctId: string, properties?: Record<string, any>): Promise<void> {
        // Boş işlem
    }
    async shutdown(): Promise<void> {
        // Boş işlem
    }
    async updateTelemetryState(enabled: boolean): Promise<void> {
        // Boş işlem
    }
    
    // 👇 İŞTE EKSİK OLAN VE HATAYI ÇÖZECEK PARÇA BU:
    setProvider(provider: any): void {
        // Boş işlem: Provider'ı al ama hiçbir şey yapma
    }

    get isTelemetryEnabled(): boolean {
        return false
    }
}

let outputChannel: vscode.OutputChannel
let extensionContext: vscode.ExtensionContext

export async function activate(context: vscode.ExtensionContext) {
	extensionContext = context
	outputChannel = vscode.window.createOutputChannel(Package.outputChannel)
	context.subscriptions.push(outputChannel)
	outputChannel.appendLine(`${Package.name} extension activated - ${JSON.stringify(Package)}`)

	// Migrate old settings to new
	await migrateSettings(context, outputChannel)

	// Initialize telemetry service
	const telemetryService = TelemetryService.createInstance()
	
	// ✅ BURASI KRİTİK: Gerçek PostHog yerine Sahte Client'ı kaydediyoruz
	try {
		telemetryService.register(new MockTelemetryClient() as any)
	} catch (error) {
		console.warn("Failed to register MockTelemetryClient:", error)
	}

	const logger = createOutputChannelLogger(outputChannel)

	// Initialize MDM service
	const mdmService = await MdmService.createInstance(logger)

	initializeI18n(context.globalState.get("language") ?? formatLanguage(vscode.env.language))

	TerminalRegistry.initialize()

	const defaultCommands = vscode.workspace.getConfiguration(Package.name).get<string[]>("allowedCommands") || []

	if (!context.globalState.get("allowedCommands")) {
		context.globalState.update("allowedCommands", defaultCommands)
	}

	const contextProxy = await ContextProxy.getInstance(context)

	const codeIndexManagers: CodeIndexManager[] = []

	if (vscode.workspace.workspaceFolders) {
		for (const folder of vscode.workspace.workspaceFolders) {
			const manager = CodeIndexManager.getInstance(context, folder.uri.fsPath)

			if (manager) {
				codeIndexManagers.push(manager)
				void manager.initialize(contextProxy).catch((error) => {
					const message = error instanceof Error ? error.message : String(error)
					outputChannel.appendLine(
						`[CodeIndexManager] Error during background CodeIndexManager configuration/indexing for ${folder.uri.fsPath}: ${message}`,
					)
				})
				context.subscriptions.push(manager)
			}
		}
	}

	const provider = new ClineProvider(context, outputChannel, "sidebar", contextProxy, mdmService)

	//TelemetryService.instance.setProvider(provider)

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(ClineProvider.sideBarId, provider, {
			webviewOptions: { retainContextWhenHidden: true },
		}),
	)

	try {
		await autoImportSettings(outputChannel, {
			providerSettingsManager: provider.providerSettingsManager,
			contextProxy: provider.contextProxy,
			customModesManager: provider.customModesManager,
		})
	} catch (error) {
		outputChannel.appendLine(
			`[AutoImport] Error during auto-import: ${error instanceof Error ? error.message : String(error)}`,
		)
	}

	registerCommands({ context, outputChannel, provider })

	const diffContentProvider = new (class implements vscode.TextDocumentContentProvider {
		provideTextDocumentContent(uri: vscode.Uri): string {
			return Buffer.from(uri.query, "base64").toString("utf-8")
		}
	})()

	context.subscriptions.push(
		vscode.workspace.registerTextDocumentContentProvider(DIFF_VIEW_URI_SCHEME, diffContentProvider),
	)

	context.subscriptions.push(vscode.window.registerUriHandler({ handleUri }))

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider({ pattern: "**/*" }, new CodeActionProvider(), {
			providedCodeActionKinds: CodeActionProvider.providedCodeActionKinds,
		}),
	)

	registerCodeActions(context)
	registerTerminalActions(context)

	vscode.commands.executeCommand(`${Package.name}.activationCompleted`)

	const socketPath = process.env.ROO_CODE_IPC_SOCKET_PATH
	const enableLogging = typeof socketPath === "string"

	if (process.env.NODE_ENV === "development") {
		const watchPaths = [
			{ path: context.extensionPath, pattern: "**/*.ts" },
			{ path: path.join(context.extensionPath, "../packages/types"), pattern: "**/*.ts" },
			{ path: path.join(context.extensionPath, "../packages/telemetry"), pattern: "**/*.ts" },
		]

		console.log(
			`♻️♻️♻️ Core auto-reloading: Watching for changes in ${watchPaths.map(({ path }) => path).join(", ")}`,
		)

		let reloadTimeout: NodeJS.Timeout | undefined
		const DEBOUNCE_DELAY = 1_000

		const debouncedReload = (uri: vscode.Uri) => {
			if (reloadTimeout) {
				clearTimeout(reloadTimeout)
			}
			console.log(`♻️ ${uri.fsPath} changed; scheduling reload...`)
			reloadTimeout = setTimeout(() => {
				console.log(`♻️ Reloading host after debounce delay...`)
				vscode.commands.executeCommand("workbench.action.reloadWindow")
			}, DEBOUNCE_DELAY)
		}

		watchPaths.forEach(({ path: watchPath, pattern }) => {
			const relPattern = new vscode.RelativePattern(vscode.Uri.file(watchPath), pattern)
			const watcher = vscode.workspace.createFileSystemWatcher(relPattern, false, false, false)
			watcher.onDidChange(debouncedReload)
			watcher.onDidCreate(debouncedReload)
			watcher.onDidDelete(debouncedReload)
			context.subscriptions.push(watcher)
		})

		context.subscriptions.push({
			dispose: () => {
				if (reloadTimeout) {
					clearTimeout(reloadTimeout)
				}
			},
		})
	}

	initializeModelCacheRefresh()

	return new API(outputChannel, provider, socketPath, enableLogging)
}

export async function deactivate() {
	outputChannel.appendLine(`${Package.name} extension deactivated`)
	await McpServerManager.cleanup(extensionContext)
	TelemetryService.instance.shutdown()
	TerminalRegistry.cleanup()
}