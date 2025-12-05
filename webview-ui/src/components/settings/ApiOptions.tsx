import React, { memo, useCallback, useEffect, useMemo, useState } from "react"
import { convertHeadersToObject } from "./utils/headers"
import { useDebounce } from "react-use"
import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"

import {
	type ProviderName,
	type ProviderSettings,
	DEFAULT_CONSECUTIVE_MISTAKE_LIMIT,
	openRouterDefaultModelId,
	requestyDefaultModelId,
	glamaDefaultModelId,
	unboundDefaultModelId,
	litellmDefaultModelId,
	openAiNativeDefaultModelId,
	anthropicDefaultModelId,
	doubaoDefaultModelId,
	claudeCodeDefaultModelId,
	qwenCodeDefaultModelId,
	geminiDefaultModelId,
	deepSeekDefaultModelId,
	moonshotDefaultModelId,
	mistralDefaultModelId,
	xaiDefaultModelId,
	groqDefaultModelId,
	cerebrasDefaultModelId,
	chutesDefaultModelId,
	basetenDefaultModelId,
	bedrockDefaultModelId,
	vertexDefaultModelId,
	sambaNovaDefaultModelId,
	internationalZAiDefaultModelId,
	mainlandZAiDefaultModelId,
	fireworksDefaultModelId,
	featherlessDefaultModelId,
	ioIntelligenceDefaultModelId,
	echoDefaultModelId,
	vercelAiGatewayDefaultModelId,
	deepInfraDefaultModelId,
	minimaxDefaultModelId,
	type ToolProtocol,
	TOOL_PROTOCOL,
} from "@echo-ai/types"

import { vscode } from "@src/utils/vscode"
import { validateApiConfigurationExcludingModelErrors, getModelValidationError } from "@src/utils/validate"
import { useAppTranslation } from "@src/i18n/TranslationContext"
import { useRouterModels } from "@src/components/ui/hooks/useRouterModels"
import { useSelectedModel } from "@src/components/ui/hooks/useSelectedModel"
import { useExtensionState } from "@src/context/ExtensionStateContext"
import { useOpenRouterModelProviders } from "@src/components/ui/hooks/useOpenRouterModelProviders"
import { filterProviders, filterModels } from "./utils/organizationFilters"
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SearchableSelect,
	Collapsible,
	CollapsibleTrigger,
	CollapsibleContent,
} from "@src/components/ui"

import {
	Anthropic,
	Baseten,
	Bedrock,
	Cerebras,
	Chutes,
	ClaudeCode,
	DeepSeek,
	Doubao,
	Gemini,
	Glama,
	Groq,
	HuggingFace,
	IOIntelligence,
	LMStudio,
	LiteLLM,
	Mistral,
	Moonshot,
	Ollama,
	OpenAI,
	OpenAICompatible,
	OpenRouter,
	QwenCode,
	Requesty,
	Roo,
	SambaNova,
	Unbound,
	Vertex,
	VSCodeLM,
	XAI,
	ZAi,
	Fireworks,
	Featherless,
	VercelAiGateway,
	DeepInfra,
	MiniMax,
} from "./providers"

import { MODELS_BY_PROVIDER, PROVIDERS } from "./constants"
import { inputEventTransform, noTransform } from "./transforms"
import { ModelInfoView } from "./ModelInfoView"
import { ApiErrorMessage } from "./ApiErrorMessage"
import { ThinkingBudget } from "./ThinkingBudget"
import { SimpleThinkingBudget } from "./SimpleThinkingBudget"
import { Verbosity } from "./Verbosity"
import { DiffSettingsControl } from "./DiffSettingsControl"
import { TodoListSettingsControl } from "./TodoListSettingsControl"
import { TemperatureControl } from "./TemperatureControl"
import { RateLimitSecondsControl } from "./RateLimitSecondsControl"
import { ConsecutiveMistakeLimitControl } from "./ConsecutiveMistakeLimitControl"
import { BedrockCustomArn } from "./providers/BedrockCustomArn"
import { RooBalanceDisplay } from "./providers/EchoBalanceDisplay"
import { buildDocLink } from "@src/utils/docLinks"
import { DevLog } from "./providers/Devlog"

// Bu tipi dışarıya export edelim ki DevLog.tsx içinde kullanabilelim
export type setApiConfigurationFieldFunction = <K extends keyof ProviderSettings>(
	field: K,
	value: ProviderSettings[K],
	isUserAction?: boolean,
) => void

export interface ApiOptionsProps {
	uriScheme: string | undefined
	apiConfiguration: ProviderSettings
	setApiConfigurationField: setApiConfigurationFieldFunction
	fromWelcomeView?: boolean
	errorMessage: string | undefined
	setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
}

const ApiOptions = ({
	uriScheme,
	apiConfiguration,
	setApiConfigurationField,
	fromWelcomeView,
	errorMessage,
	setErrorMessage,
}: ApiOptionsProps) => {
	const { t } = useAppTranslation()
	const { organizationAllowList, cloudIsAuthenticated } = useExtensionState()

	const [customHeaders, setCustomHeaders] = useState<[string, string][]>(() => {
		const headers = apiConfiguration?.openAiHeaders || {}
		return Object.entries(headers)
	})

	useEffect(() => {
		const propHeaders = apiConfiguration?.openAiHeaders || {}

		if (JSON.stringify(customHeaders) !== JSON.stringify(Object.entries(propHeaders))) {
			setCustomHeaders(Object.entries(propHeaders))
		}
	}, [apiConfiguration?.openAiHeaders, customHeaders])

	useDebounce(
		() => {
			const currentConfigHeaders = apiConfiguration?.openAiHeaders || {}
			const newHeadersObject = convertHeadersToObject(customHeaders)

			if (JSON.stringify(currentConfigHeaders) !== JSON.stringify(newHeadersObject)) {
				setApiConfigurationField("openAiHeaders", newHeadersObject)
			}
		},
		300,
		[customHeaders, apiConfiguration?.openAiHeaders, setApiConfigurationField],
	)

	const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
	const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(false)

	const handleInputChange = useCallback(
		<K extends keyof ProviderSettings, E>(
			field: K,
			transform: (event: E) => ProviderSettings[K] = inputEventTransform,
		) =>
			(event: E | Event) => {
				setApiConfigurationField(field, transform(event as E))
			},
		[setApiConfigurationField],
	)

	const {
		provider: selectedProvider,
		id: selectedModelId,
		info: selectedModelInfo,
	} = useSelectedModel(apiConfiguration)

	const { data: routerModels, refetch: refetchRouterModels } = useRouterModels()

	useOpenRouterModelProviders(apiConfiguration?.openRouterModelId, apiConfiguration?.openRouterBaseUrl, {
		enabled:
			!!apiConfiguration?.openRouterModelId &&
			routerModels?.openrouter &&
			Object.keys(routerModels.openrouter).length > 1 &&
			apiConfiguration.openRouterModelId in routerModels.openrouter,
	})

	useEffect(() => {
		if (selectedModelId && apiConfiguration.apiModelId !== selectedModelId) {
			setApiConfigurationField("apiModelId", selectedModelId, false)
		}
	}, [selectedModelId, setApiConfigurationField, apiConfiguration.apiModelId])

	useDebounce(
		() => {
			if (selectedProvider === "openai") {
				const headerObject = convertHeadersToObject(customHeaders)
				vscode.postMessage({
					type: "requestOpenAiModels",
					values: {
						baseUrl: apiConfiguration?.openAiBaseUrl,
						apiKey: apiConfiguration?.openAiApiKey,
						customHeaders: {},
						openAiHeaders: headerObject,
					},
				})
			} else if (selectedProvider === "ollama") {
				vscode.postMessage({ type: "requestOllamaModels" })
			} else if (selectedProvider === "lmstudio") {
				vscode.postMessage({ type: "requestLmStudioModels" })
			} else if (selectedProvider === "vscode-lm") {
				vscode.postMessage({ type: "requestVsCodeLmModels" })
			} else if (
				selectedProvider === "litellm" ||
				selectedProvider === "deepinfra" ||
				selectedProvider === "echo" ||
				selectedProvider === "devlog" // YENİ EKLENDİ: DevLog seçildiğinde modelleri iste
			) {
				vscode.postMessage({ type: "requestRouterModels" })
			}
		},
		250,
		[
			selectedProvider,
			apiConfiguration?.requestyApiKey,
			apiConfiguration?.openAiBaseUrl,
			apiConfiguration?.openAiApiKey,
			apiConfiguration?.ollamaBaseUrl,
			apiConfiguration?.lmStudioBaseUrl,
			apiConfiguration?.litellmBaseUrl,
			apiConfiguration?.litellmApiKey,
			apiConfiguration?.deepInfraApiKey,
			apiConfiguration?.deepInfraBaseUrl,
			// Eğer devlog parametreleri değişirse tekrar fetch atması için buraya ekleyebilirsin
			 apiConfiguration?.devlogBaseUrl,
			 apiConfiguration?.devlogApiKey,
			customHeaders,
		],
	)

	useEffect(() => {
		const apiValidationResult = validateApiConfigurationExcludingModelErrors(
			apiConfiguration,
			routerModels,
			organizationAllowList,
		)
		setErrorMessage(apiValidationResult)
	}, [apiConfiguration, routerModels, organizationAllowList, setErrorMessage])

	const selectedProviderModels = useMemo(() => {
		const models = MODELS_BY_PROVIDER[selectedProvider]

		if (!models) return []

		const filteredModels = filterModels(models, selectedProvider, organizationAllowList)

		const availableModels = filteredModels
			? Object.entries(filteredModels)
					.filter(([modelId, modelInfo]) => {
						if (modelId === selectedModelId) return true
						return !modelInfo.deprecated
					})
					.map(([modelId]) => ({
						value: modelId,
						label: modelId,
					}))
			: []

		return availableModels
	}, [selectedProvider, organizationAllowList, selectedModelId])

	const onProviderChange = useCallback(
		(value: ProviderName) => {
			setApiConfigurationField("apiProvider", value)

			const validateAndResetModel = (
				modelId: string | undefined,
				field: keyof ProviderSettings,
				defaultValue?: string,
			) => {
				if (!defaultValue) return

				const shouldSetDefault = !modelId

				if (shouldSetDefault) {
					setApiConfigurationField(field, defaultValue, false)
				}
			}

			const PROVIDER_MODEL_CONFIG: Partial<
				Record<
					ProviderName,
					{
						field: keyof ProviderSettings
						default?: string
					}
				>
			> = {
				deepinfra: { field: "deepInfraModelId", default: deepInfraDefaultModelId },
				openrouter: { field: "openRouterModelId", default: openRouterDefaultModelId },
				glama: { field: "glamaModelId", default: glamaDefaultModelId },
				unbound: { field: "unboundModelId", default: unboundDefaultModelId },
				requesty: { field: "requestyModelId", default: requestyDefaultModelId },
				litellm: { field: "litellmModelId", default: litellmDefaultModelId },
				anthropic: { field: "apiModelId", default: anthropicDefaultModelId },
				cerebras: { field: "apiModelId", default: cerebrasDefaultModelId },
				"claude-code": { field: "apiModelId", default: claudeCodeDefaultModelId },
				"qwen-code": { field: "apiModelId", default: qwenCodeDefaultModelId },
				"openai-native": { field: "apiModelId", default: openAiNativeDefaultModelId },
				gemini: { field: "apiModelId", default: geminiDefaultModelId },
				deepseek: { field: "apiModelId", default: deepSeekDefaultModelId },
				doubao: { field: "apiModelId", default: doubaoDefaultModelId },
				moonshot: { field: "apiModelId", default: moonshotDefaultModelId },
				minimax: { field: "apiModelId", default: minimaxDefaultModelId },
				mistral: { field: "apiModelId", default: mistralDefaultModelId },
				xai: { field: "apiModelId", default: xaiDefaultModelId },
				groq: { field: "apiModelId", default: groqDefaultModelId },
				chutes: { field: "apiModelId", default: chutesDefaultModelId },
				baseten: { field: "apiModelId", default: basetenDefaultModelId },
				bedrock: { field: "apiModelId", default: bedrockDefaultModelId },
				vertex: { field: "apiModelId", default: vertexDefaultModelId },
				sambanova: { field: "apiModelId", default: sambaNovaDefaultModelId },
				zai: {
					field: "apiModelId",
					default:
						apiConfiguration.zaiApiLine === "china_coding"
							? mainlandZAiDefaultModelId
							: internationalZAiDefaultModelId,
				},
				fireworks: { field: "apiModelId", default: fireworksDefaultModelId },
				featherless: { field: "apiModelId", default: featherlessDefaultModelId },
				"io-intelligence": { field: "ioIntelligenceModelId", default: ioIntelligenceDefaultModelId },
				echo: { field: "apiModelId", default: echoDefaultModelId },
				"vercel-ai-gateway": { field: "vercelAiGatewayModelId", default: vercelAiGatewayDefaultModelId },
				devlog: { field: "apiModelId", default: "echo-speed" }, // YENİ EKLENDİ
				openai: { field: "openAiModelId" },
				ollama: { field: "ollamaModelId" },
				lmstudio: { field: "lmStudioModelId" },
			}

			const config = PROVIDER_MODEL_CONFIG[value]
			if (config) {
				validateAndResetModel(
					apiConfiguration[config.field] as string | undefined,
					config.field,
					config.default,
				)
			}
		},
		[setApiConfigurationField, apiConfiguration],
	)

	const modelValidationError = useMemo(() => {
		return getModelValidationError(apiConfiguration, routerModels, organizationAllowList)
	}, [apiConfiguration, routerModels, organizationAllowList])

	const docs = useMemo(() => {
		const provider = PROVIDERS.find(({ value }) => value === selectedProvider)
		const name = provider?.label

		if (!name) {
			return undefined
		}

		const slugs: Record<string, string> = {
			"openai-native": "openai",
			openai: "openai-compatible",
		}

		const slug = slugs[selectedProvider] || selectedProvider
		return {
			url: buildDocLink(`providers/${slug}`, "provider_docs"),
			name,
		}
	}, [selectedProvider])

	const defaultProtocol = selectedModelInfo?.defaultToolProtocol || TOOL_PROTOCOL.XML
	const showToolProtocolSelector = selectedModelInfo?.supportsNativeTools === true

	const providerOptions = useMemo(() => {
		const allowedProviders = filterProviders(PROVIDERS, organizationAllowList)
		const providersWithModels = allowedProviders.filter(({ value }) => {
			if (value === apiConfiguration.apiProvider) {
				return true
			}

			const staticModels = MODELS_BY_PROVIDER[value as ProviderName]
			if (staticModels) {
				const filteredModels = filterModels(staticModels, value as ProviderName, organizationAllowList)
				return filteredModels && Object.keys(filteredModels).length > 0
			}

			return true
		})

		const options = providersWithModels.map(({ value, label }) => ({
			value,
			label,
		}))

		if (!fromWelcomeView) {
			const rooIndex = options.findIndex((opt) => opt.value === "echo")
			if (rooIndex > 0) {
				const [rooOption] = options.splice(rooIndex, 1)
				options.unshift(rooOption)
			}
		}

		return options
	}, [organizationAllowList, apiConfiguration.apiProvider, fromWelcomeView])

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-1 relative">
				<div className="flex justify-between items-center">
					<label className="block font-medium mb-1">{t("settings:providers.apiProvider")}</label>
					{selectedProvider === "echo" && cloudIsAuthenticated ? (
						<RooBalanceDisplay />
					) : (
						docs && (
							<div className="text-xs text-vscode-descriptionForeground">
								<VSCodeLink href={docs.url} className="hover:text-vscode-foreground" target="_blank">
									{t("settings:providers.providerDocumentation", { provider: docs.name })}
								</VSCodeLink>
							</div>
						)
					)}
				</div>
				<SearchableSelect
					value={selectedProvider}
					onValueChange={(value) => onProviderChange(value as ProviderName)}
					options={providerOptions}
					placeholder={t("settings:common.select")}
					searchPlaceholder={t("settings:providers.searchProviderPlaceholder")}
					emptyMessage={t("settings:providers.noProviderMatchFound")}
					className="w-full"
					data-testid="provider-select"
				/>
			</div>

			{errorMessage && <ApiErrorMessage errorMessage={errorMessage} />}

			{/* YENİ EKLENDİ: DevLog Bileşeni */}
			{selectedProvider === "devlog" && (
                <DevLog
                    apiConfiguration={apiConfiguration}
                    setApiConfigurationField={setApiConfigurationField}
                    routerModels={routerModels}
                    organizationAllowList={organizationAllowList}
                    modelValidationError={modelValidationError}
                />
            )}

			{selectedProvider === "openrouter" && (
				<OpenRouter
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					selectedModelId={selectedModelId}
					uriScheme={uriScheme}
					fromWelcomeView={fromWelcomeView}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "requesty" && (
				<Requesty
					uriScheme={uriScheme}
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					refetchRouterModels={refetchRouterModels}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "glama" && (
				<Glama
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					uriScheme={uriScheme}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "unbound" && (
				<Unbound
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "deepinfra" && (
				<DeepInfra
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					refetchRouterModels={refetchRouterModels}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "anthropic" && (
				<Anthropic apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "claude-code" && (
				<ClaudeCode apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "openai-native" && (
				<OpenAI
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					selectedModelInfo={selectedModelInfo}
				/>
			)}

			{selectedProvider === "mistral" && (
				<Mistral apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "baseten" && (
				<Baseten apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "bedrock" && (
				<Bedrock
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					selectedModelInfo={selectedModelInfo}
				/>
			)}

			{selectedProvider === "vertex" && (
				<Vertex
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					fromWelcomeView={fromWelcomeView}
				/>
			)}

			{selectedProvider === "gemini" && (
				<Gemini
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					fromWelcomeView={fromWelcomeView}
				/>
			)}

			{selectedProvider === "openai" && (
				<OpenAICompatible
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "lmstudio" && (
				<LMStudio apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "deepseek" && (
				<DeepSeek apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "doubao" && (
				<Doubao apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "qwen-code" && (
				<QwenCode apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "moonshot" && (
				<Moonshot apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "minimax" && (
				<MiniMax apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "vscode-lm" && (
				<VSCodeLM apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "ollama" && (
				<Ollama apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "xai" && (
				<XAI apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "groq" && (
				<Groq apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "huggingface" && (
				<HuggingFace apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "cerebras" && (
				<Cerebras apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "chutes" && (
				<Chutes
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "litellm" && (
				<LiteLLM
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "sambanova" && (
				<SambaNova apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "zai" && (
				<ZAi apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "io-intelligence" && (
				<IOIntelligence
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "vercel-ai-gateway" && (
				<VercelAiGateway
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "human-relay" && (
				<>
					<div className="text-sm text-vscode-descriptionForeground">
						{t("settings:providers.humanRelay.description")}
					</div>
					<div className="text-sm text-vscode-descriptionForeground">
						{t("settings:providers.humanRelay.instructions")}
					</div>
				</>
			)}

			{selectedProvider === "fireworks" && (
				<Fireworks apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProvider === "echo" && (
				<Roo
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					routerModels={routerModels}
					cloudIsAuthenticated={cloudIsAuthenticated}
					organizationAllowList={organizationAllowList}
					modelValidationError={modelValidationError}
				/>
			)}

			{selectedProvider === "featherless" && (
				<Featherless apiConfiguration={apiConfiguration} setApiConfigurationField={setApiConfigurationField} />
			)}

			{selectedProviderModels.length > 0 && (
				<>
					<div>
						<label className="block font-medium mb-1">{t("settings:providers.model")}</label>
						<Select
							value={selectedModelId === "custom-arn" ? "custom-arn" : selectedModelId}
							onValueChange={(value) => {
								setApiConfigurationField("apiModelId", value)
								if (value !== "custom-arn" && selectedProvider === "bedrock") {
									setApiConfigurationField("awsCustomArn", "")
								}
								if (selectedProvider === "openai-native") {
									setApiConfigurationField("reasoningEffort", undefined)
								}
							}}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder={t("settings:common.select")} />
							</SelectTrigger>
							<SelectContent>
								{selectedProviderModels.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
								{selectedProvider === "bedrock" && (
									<SelectItem value="custom-arn">{t("settings:labels.useCustomArn")}</SelectItem>
								)}
							</SelectContent>
						</Select>
					</div>

					{selectedModelInfo?.deprecated && (
						<ApiErrorMessage errorMessage={t("settings:validation.modelDeprecated")} />
					)}

					{selectedProvider === "bedrock" && selectedModelId === "custom-arn" && (
						<BedrockCustomArn
							apiConfiguration={apiConfiguration}
							setApiConfigurationField={setApiConfigurationField}
						/>
					)}

					{!selectedModelInfo?.deprecated && (
						<ModelInfoView
							apiProvider={selectedProvider}
							selectedModelId={selectedModelId}
							modelInfo={selectedModelInfo}
							isDescriptionExpanded={isDescriptionExpanded}
							setIsDescriptionExpanded={setIsDescriptionExpanded}
						/>
					)}
				</>
			)}

			{selectedProvider === "echo" ? (
				<SimpleThinkingBudget
					key={`${selectedProvider}-${selectedModelId}`}
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					modelInfo={selectedModelInfo}
				/>
			) : (
				<ThinkingBudget
					key={`${selectedProvider}-${selectedModelId}`}
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					modelInfo={selectedModelInfo}
				/>
			)}

			{selectedModelInfo?.supportsVerbosity && (
				<Verbosity
					apiConfiguration={apiConfiguration}
					setApiConfigurationField={setApiConfigurationField}
					modelInfo={selectedModelInfo}
				/>
			)}

			{!fromWelcomeView && (
				<Collapsible open={isAdvancedSettingsOpen} onOpenChange={setIsAdvancedSettingsOpen}>
					<CollapsibleTrigger className="flex items-center gap-1 w-full cursor-pointer hover:opacity-80 mb-2">
						<span className={`codicon codicon-chevron-${isAdvancedSettingsOpen ? "down" : "right"}`}></span>
						<span className="font-medium">{t("settings:advancedSettings.title")}</span>
					</CollapsibleTrigger>
					<CollapsibleContent className="space-y-3">
						<TodoListSettingsControl
							todoListEnabled={apiConfiguration.todoListEnabled}
							onChange={(field, value) => setApiConfigurationField(field, value)}
						/>
						<DiffSettingsControl
							diffEnabled={apiConfiguration.diffEnabled}
							fuzzyMatchThreshold={apiConfiguration.fuzzyMatchThreshold}
							onChange={(field, value) => setApiConfigurationField(field, value)}
						/>
						{selectedModelInfo?.supportsTemperature !== false && (
							<TemperatureControl
								value={apiConfiguration.modelTemperature}
								onChange={handleInputChange("modelTemperature", noTransform)}
								maxValue={2}
								defaultValue={selectedModelInfo?.defaultTemperature}
							/>
						)}
						<RateLimitSecondsControl
							value={apiConfiguration.rateLimitSeconds || 0}
							onChange={(value) => setApiConfigurationField("rateLimitSeconds", value)}
						/>
						<ConsecutiveMistakeLimitControl
							value={
								apiConfiguration.consecutiveMistakeLimit !== undefined
									? apiConfiguration.consecutiveMistakeLimit
									: DEFAULT_CONSECUTIVE_MISTAKE_LIMIT
							}
							onChange={(value) => setApiConfigurationField("consecutiveMistakeLimit", value)}
						/>

						{/* Tool Protocol Selector */}
						{showToolProtocolSelector && (
							<div>
								<label className="block font-medium mb-1">{t("settings:toolProtocol.label")}</label>
								<Select
									value={apiConfiguration.toolProtocol || "default"}
									onValueChange={(value) => {
										const newValue = value === "default" ? undefined : (value as ToolProtocol)
										setApiConfigurationField("toolProtocol", newValue)
									}}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder={t("settings:common.select")} />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="default">
											{t("settings:toolProtocol.default")} (
											{defaultProtocol === TOOL_PROTOCOL.NATIVE
												? t("settings:toolProtocol.native")
												: t("settings:toolProtocol.xml")}
											)
										</SelectItem>
										<SelectItem value={TOOL_PROTOCOL.XML}>
											{t("settings:toolProtocol.xml")}
										</SelectItem>
										<SelectItem value={TOOL_PROTOCOL.NATIVE}>
											{t("settings:toolProtocol.native")}
										</SelectItem>
									</SelectContent>
								</Select>
								<div className="text-sm text-vscode-descriptionForeground mt-1">
									{t("settings:toolProtocol.description")}
								</div>
							</div>
						)}
					</CollapsibleContent>
				</Collapsible>
			)}
		</div>
	)
}

export default memo(ApiOptions)
