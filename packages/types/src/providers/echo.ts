import { z } from "zod"

import type { ModelInfo } from "../model.js"

/**
 * Echo AI Cloud is a dynamic provider - models are loaded from the /v1/models API endpoint.
 * Default model ID used as fallback when no model is specified.
 */
export const echoDefaultModelId = "xai/grok-code-fast-1"

/**
 * Empty models object maintained for type compatibility.
 * All model data comes dynamically from the API.
 */
export const echoModels = {} as const satisfies Record<string, ModelInfo>

/**
 * Echo AI Cloud API response schemas
 */

export const EchoPricingSchema = z.object({
	input: z.string(),
	output: z.string(),
	input_cache_read: z.string().optional(),
	input_cache_write: z.string().optional(),
})

export const EchoModelSchema = z.object({
	id: z.string(),
	object: z.literal("model"),
	created: z.number(),
	owned_by: z.string(),
	name: z.string(),
	description: z.string(),
	context_window: z.number(),
	max_tokens: z.number(),
	type: z.literal("language"),
	tags: z.array(z.string()).optional(),
	pricing: EchoPricingSchema,
	deprecated: z.boolean().optional(),
})

export const EchoModelsResponseSchema = z.object({
	object: z.literal("list"),
	data: z.array(EchoModelSchema),
})

export type EchoModel = z.infer<typeof EchoModelSchema>
export type EchoModelsResponse = z.infer<typeof EchoModelsResponseSchema>
