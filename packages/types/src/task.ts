import { z } from "zod"

import { EchoCodeEventName } from "./events.js"
import type { EchoAiSettings } from "./global-settings.js"
import type { ClineMessage, QueuedMessage, TokenUsage } from "./message.js"
import type { ToolUsage, ToolName } from "./tool.js"
import type { StaticAppProperties, GitProperties, TelemetryProperties } from "./telemetry.js"
import type { TodoItem } from "./todo.js"

/**
 * TaskProviderLike
 */

export interface TaskProviderLike {
	// Tasks
	getCurrentTask(): TaskLike | undefined
	getRecentTasks(): string[]
	createTask(
		text?: string,
		images?: string[],
		parentTask?: TaskLike,
		options?: CreateTaskOptions,
		configuration?: EchoAiSettings,
	): Promise<TaskLike>
	cancelTask(): Promise<void>
	clearTask(): Promise<void>
	resumeTask(taskId: string): void

	// Modes
	getModes(): Promise<{ slug: string; name: string }[]>
	getMode(): Promise<string>
	setMode(mode: string): Promise<void>

	// Provider Profiles
	getProviderProfiles(): Promise<{ name: string; provider?: string }[]>
	getProviderProfile(): Promise<string>
	setProviderProfile(providerProfile: string): Promise<void>

	// Telemetry
	readonly appProperties: StaticAppProperties
	readonly gitProperties: GitProperties | undefined
	getTelemetryProperties(): Promise<TelemetryProperties>
	readonly cwd: string

	// Event Emitter
	on<K extends keyof TaskProviderEvents>(
		event: K,
		listener: (...args: TaskProviderEvents[K]) => void | Promise<void>,
	): this

	off<K extends keyof TaskProviderEvents>(
		event: K,
		listener: (...args: TaskProviderEvents[K]) => void | Promise<void>,
	): this

	// @TODO: Find a better way to do this.
	postStateToWebview(): Promise<void>
}

export type TaskProviderEvents = {
	[EchoCodeEventName.TaskCreated]: [task: TaskLike]
	[EchoCodeEventName.TaskStarted]: [taskId: string]
	[EchoCodeEventName.TaskCompleted]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]
	[EchoCodeEventName.TaskAborted]: [taskId: string]
	[EchoCodeEventName.TaskFocused]: [taskId: string]
	[EchoCodeEventName.TaskUnfocused]: [taskId: string]
	[EchoCodeEventName.TaskActive]: [taskId: string]
	[EchoCodeEventName.TaskInteractive]: [taskId: string]
	[EchoCodeEventName.TaskResumable]: [taskId: string]
	[EchoCodeEventName.TaskIdle]: [taskId: string]

	[EchoCodeEventName.TaskPaused]: [taskId: string]
	[EchoCodeEventName.TaskUnpaused]: [taskId: string]
	[EchoCodeEventName.TaskSpawned]: [taskId: string]

	[EchoCodeEventName.TaskUserMessage]: [taskId: string]

	[EchoCodeEventName.TaskTokenUsageUpdated]: [taskId: string, tokenUsage: TokenUsage]

	[EchoCodeEventName.ModeChanged]: [mode: string]
	[EchoCodeEventName.ProviderProfileChanged]: [config: { name: string; provider?: string }]
}

/**
 * TaskLike
 */

export interface CreateTaskOptions {
	enableDiff?: boolean
	enableCheckpoints?: boolean
	fuzzyMatchThreshold?: number
	consecutiveMistakeLimit?: number
	experiments?: Record<string, boolean>
	initialTodos?: TodoItem[]
}

export enum TaskStatus {
	Running = "running",
	Interactive = "interactive",
	Resumable = "resumable",
	Idle = "idle",
	None = "none",
}

export const taskMetadataSchema = z.object({
	task: z.string().optional(),
	images: z.array(z.string()).optional(),
})

export type TaskMetadata = z.infer<typeof taskMetadataSchema>

export interface TaskLike {
	readonly taskId: string
	readonly rootTaskId?: string
	readonly parentTaskId?: string
	readonly childTaskId?: string
	readonly metadata: TaskMetadata
	readonly taskStatus: TaskStatus
	readonly taskAsk: ClineMessage | undefined
	readonly queuedMessages: QueuedMessage[]
	readonly tokenUsage: TokenUsage | undefined

	on<K extends keyof TaskEvents>(event: K, listener: (...args: TaskEvents[K]) => void | Promise<void>): this
	off<K extends keyof TaskEvents>(event: K, listener: (...args: TaskEvents[K]) => void | Promise<void>): this

	approveAsk(options?: { text?: string; images?: string[] }): void
	denyAsk(options?: { text?: string; images?: string[] }): void
	submitUserMessage(text: string, images?: string[], mode?: string, providerProfile?: string): Promise<void>
	abortTask(): void
}

export type TaskEvents = {
	// Task Lifecycle
	[EchoCodeEventName.TaskStarted]: []
	[EchoCodeEventName.TaskCompleted]: [taskId: string, tokenUsage: TokenUsage, toolUsage: ToolUsage]
	[EchoCodeEventName.TaskAborted]: []
	[EchoCodeEventName.TaskFocused]: []
	[EchoCodeEventName.TaskUnfocused]: []
	[EchoCodeEventName.TaskActive]: [taskId: string]
	[EchoCodeEventName.TaskInteractive]: [taskId: string]
	[EchoCodeEventName.TaskResumable]: [taskId: string]
	[EchoCodeEventName.TaskIdle]: [taskId: string]

	// Subtask Lifecycle
	[EchoCodeEventName.TaskPaused]: [taskId: string]
	[EchoCodeEventName.TaskUnpaused]: [taskId: string]
	[EchoCodeEventName.TaskSpawned]: [taskId: string]

	// Task Execution
	[EchoCodeEventName.Message]: [{ action: "created" | "updated"; message: ClineMessage }]
	[EchoCodeEventName.TaskModeSwitched]: [taskId: string, mode: string]
	[EchoCodeEventName.TaskAskResponded]: []
	[EchoCodeEventName.TaskUserMessage]: [taskId: string]

	// Task Analytics
	[EchoCodeEventName.TaskToolFailed]: [taskId: string, tool: ToolName, error: string]
	[EchoCodeEventName.TaskTokenUsageUpdated]: [taskId: string, tokenUsage: TokenUsage]
}
