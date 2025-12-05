import type { ModelInfo } from "../model.js"

export type DevLogModelId = keyof typeof devlogModels

export const devlogDefaultModelId: DevLogModelId = "echo-speed"

export const devlogModels = {
    "echo-speed": {
        maxTokens: 4096,
        contextWindow: 32768,
        supportsImages: true,
        supportsPromptCache: true,
        supportsNativeTools: false,
        supportsReasoningEffort: false,
        inputPrice: 0.05,
        outputPrice: 0.05,
        description: "Hızlı kod tamamlama ve genel amaçlı kullanım.",
    },
    "echo-pro": {
        maxTokens: 4096,
        contextWindow: 65536,
        supportsImages: true,
        supportsPromptCache: true,
        supportsNativeTools: true,
        supportsReasoningEffort: false,
        inputPrice: 0.10,
        outputPrice: 0.10,
        description: "Daha derin analiz ve refactoring.",
    },
    "echo-max": {
        maxTokens: 4096,
        contextWindow: 131072,
        supportsImages: true,
        supportsPromptCache: true,
        supportsNativeTools: true,
        supportsReasoningEffort: true,
        inputPrice: 0.20,
        outputPrice: 0.20,
        description: "En yüksek kapasite, büyük kod tabanları.",
    },
} as const satisfies Record<string, ModelInfo>