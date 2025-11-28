// PostHog artık kullanılmıyor, o yüzden import yok.
// import { PostHog } from "posthog-node"
// import * as vscode from "vscode"

import { /* TelemetryEventName */ type TelemetryEvent } from "@echo-ai/types"

import { BaseTelemetryClient } from "./BaseTelemetryClient"

/**
 * PostHogTelemetryClient handles telemetry event tracking for the Echo AI extension.
 * Uses PostHog analytics to track user interactions and system events.
 * Respects user privacy settings and VSCode's global telemetry configuration.
 */

/*

---------------- TÜM İZLEME FONKSİYONLARI KALDIRILACAK -------------------

*/

// PostHog artık kullanılmıyor, o yüzden import yok.
// import { PostHog } from "posthog-node"
// import * as vscode from "vscode"


export class PostHogTelemetryClient extends BaseTelemetryClient {
	//private client: PostHog
	//private distinctId: string = vscode.env.machineId
	// Git repository properties that should be filtered out
	private readonly gitPropertyNames = ["repositoryUrl", "repositoryName", "defaultBranch"]

	constructor(debug = false) {
		// Herhangi bir subscription kullanmıyorsak boş geçilebilir.
		super(undefined, debug)
		this.telemetryEnabled = false
	}

	/**
	 * Filter out git repository properties for PostHog telemetry
	 * @param propertyName The property name to check
	 * @returns Whether the property should be included in telemetry events
	 */
	protected override isPropertyCapturable(propertyName: string): boolean {
		// Filter out git repository properties
		if (this.gitPropertyNames.includes(propertyName)) {
			return false
		}
		return true
	}

	public override async capture(_event: TelemetryEvent): Promise<void> {
		// NO-OP
		if (this.debug) {
			// İstersen buraya console.log koyabilirsin ama tavsiye etmiyorum.
			// console.log("[Telemetry] capture called but telemetry is disabled.")
		}
		return
	}

	/**
	 * Updates the telemetry state based on user preferences and VSCode settings.
	 * Only enables telemetry if both VSCode global telemetry is enabled and
	 * user has opted in.
	 * @param didUserOptIn Whether the user has explicitly opted into telemetry
	 */
	public override updateTelemetryState(/* didUserOptIn : boolean */ ): void {
		this.telemetryEnabled = false

		/*
		// First check global telemetry level - telemetry should only be enabled when level is "all".
		const telemetryLevel = vscode.workspace.getConfiguration("telemetry").get<string>("telemetryLevel", "all")
		const globalTelemetryEnabled = telemetryLevel === "all"

		// We only enable telemetry if global vscode telemetry is enabled.
		if (globalTelemetryEnabled) {
			this.telemetryEnabled = didUserOptIn
		}

		// Update PostHog client state based on telemetry preference.
		if (this.telemetryEnabled) {
			this.client.optIn()
		} else {
			this.client.optOut()
		}
			*/
	}

	public override async shutdown(): Promise<void> {
		//await this.client.shutdown()
		return
	}
}
