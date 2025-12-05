import { z } from "zod"

import { clineMessageSchema, tokenUsageSchema } from "./message.js"
import { toolNamesSchema, toolUsageSchema } from "./tool.js"

/**
 * RooCodeEventName
 */

export enum EchoCodeEventName {
	// Task Provider Lifecycle
	TaskCreated = "taskCreated",

	// Task Lifecycle
	TaskStarted = "taskStarted",
	TaskCompleted = "taskCompleted",
	TaskAborted = "taskAborted",
	TaskFocused = "taskFocused",
	TaskUnfocused = "taskUnfocused",
	TaskActive = "taskActive",
	TaskInteractive = "taskInteractive",
	TaskResumable = "taskResumable",
	TaskIdle = "taskIdle",

	// Subtask Lifecycle
	TaskPaused = "taskPaused",
	TaskUnpaused = "taskUnpaused",
	TaskSpawned = "taskSpawned",

	// Task Execution
	Message = "message",
	TaskModeSwitched = "taskModeSwitched",
	TaskAskResponded = "taskAskResponded",
	TaskUserMessage = "taskUserMessage",

	// Task Analytics
	TaskTokenUsageUpdated = "taskTokenUsageUpdated",
	TaskToolFailed = "taskToolFailed",

	// Configuration Changes
	ModeChanged = "modeChanged",
	ProviderProfileChanged = "providerProfileChanged",

	// Evals
	EvalPass = "evalPass",
	EvalFail = "evalFail",
}

/**
 * RooCodeEvents
 */

export const rooCodeEventsSchema = z.object({
	[EchoCodeEventName.TaskCreated]: z.tuple([z.string()]),

	[EchoCodeEventName.TaskStarted]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskCompleted]: z.tuple([
		z.string(),
		tokenUsageSchema,
		toolUsageSchema,
		z.object({
			isSubtask: z.boolean(),
		}),
	]),
	[EchoCodeEventName.TaskAborted]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskFocused]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskUnfocused]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskActive]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskInteractive]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskResumable]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskIdle]: z.tuple([z.string()]),

	[EchoCodeEventName.TaskPaused]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskUnpaused]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskSpawned]: z.tuple([z.string(), z.string()]),

	[EchoCodeEventName.Message]: z.tuple([
		z.object({
			taskId: z.string(),
			action: z.union([z.literal("created"), z.literal("updated")]),
			message: clineMessageSchema,
		}),
	]),
	[EchoCodeEventName.TaskModeSwitched]: z.tuple([z.string(), z.string()]),
	[EchoCodeEventName.TaskAskResponded]: z.tuple([z.string()]),
	[EchoCodeEventName.TaskUserMessage]: z.tuple([z.string()]),

	[EchoCodeEventName.TaskToolFailed]: z.tuple([z.string(), toolNamesSchema, z.string()]),
	[EchoCodeEventName.TaskTokenUsageUpdated]: z.tuple([z.string(), tokenUsageSchema]),

	[EchoCodeEventName.ModeChanged]: z.tuple([z.string()]),
	[EchoCodeEventName.ProviderProfileChanged]: z.tuple([z.object({ name: z.string(), provider: z.string() })]),
})

export type RooCodeEvents = z.infer<typeof rooCodeEventsSchema>

/**
 * TaskEvent
 */

export const taskEventSchema = z.discriminatedUnion("eventName", [
	// Task Provider Lifecycle
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskCreated),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskCreated],
		taskId: z.number().optional(),
	}),

	// Task Lifecycle
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskStarted),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskStarted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskCompleted),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskCompleted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskAborted),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskAborted],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskFocused),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskFocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskUnfocused),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskUnfocused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskActive),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskActive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskInteractive),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskInteractive],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskResumable),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskResumable],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskIdle),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskIdle],
		taskId: z.number().optional(),
	}),

	// Subtask Lifecycle
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskPaused),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskPaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskUnpaused),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskUnpaused],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskSpawned),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskSpawned],
		taskId: z.number().optional(),
	}),

	// Task Execution
	z.object({
		eventName: z.literal(EchoCodeEventName.Message),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.Message],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskModeSwitched),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskModeSwitched],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskAskResponded),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskAskResponded],
		taskId: z.number().optional(),
	}),

	// Task Analytics
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskToolFailed),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskToolFailed],
		taskId: z.number().optional(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.TaskTokenUsageUpdated),
		payload: rooCodeEventsSchema.shape[EchoCodeEventName.TaskTokenUsageUpdated],
		taskId: z.number().optional(),
	}),

	// Evals
	z.object({
		eventName: z.literal(EchoCodeEventName.EvalPass),
		payload: z.undefined(),
		taskId: z.number(),
	}),
	z.object({
		eventName: z.literal(EchoCodeEventName.EvalFail),
		payload: z.undefined(),
		taskId: z.number(),
	}),
])

export type TaskEvent = z.infer<typeof taskEventSchema>
