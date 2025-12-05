import { Anthropic } from "@anthropic-ai/sdk"
import axios from "axios"
import { z } from "zod"
import { ApiHandler, ApiHandlerCreateMessageMetadata } from "../index"
import { ApiHandlerOptions } from "../../shared/api"
import { ApiStream } from "../transform/stream"
import { ModelInfo } from "@echo-ai/types"

const DevLogModelSchema = z.object({
  id: z.string().optional(),
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  contextWindow: z.number().optional(),
  inputPricePer1K: z.number().optional(),
  outputPricePer1K: z.number().optional(),
})

const DevLogModelsResponseSchema = z.array(DevLogModelSchema)

export class DevLogProvider implements ApiHandler {
  private options: ApiHandlerOptions

  constructor(options: ApiHandlerOptions) {
    this.options = options
  }

  updateOptions(options: ApiHandlerOptions) {
    this.options = options
  }

  getModel(): { id: string; info: ModelInfo } {
    const modelId = this.options.apiModelId || "echo-speed"
    return {
      id: modelId,
      info: {
        contextWindow: 128000,
        maxTokens: 4096,
        supportsImages: true,
        supportsNativeTools: false,
        supportsPromptCache: true,
        inputPrice: 0,
        outputPrice: 0,
        description: "DevLOG Cloud Model"
      }
    }
  }

  async *createMessage(
    systemPrompt: string,
    messages: Anthropic.Messages.MessageParam[],
    metadata?: ApiHandlerCreateMessageMetadata 
  ): ApiStream {
    
    const PRODUCTION_URL = "http://localhost:4000"
    let baseUrl = (this.options as any).devlogBaseUrl || (this.options as any).baseUrl || PRODUCTION_URL
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1)
    }

    const apiKey = (this.options as any).devlogApiKey || (this.options as any).apiKey

    let fullPrompt = ""

    if (systemPrompt) {
      fullPrompt += `System Instruction:\n${systemPrompt}\n\n`
    }

    for (const msg of messages) {
      let content = ""
      if (typeof msg.content === "string") {
        content = msg.content
      } else if (Array.isArray(msg.content)) {
        content = msg.content
          .map(block => {
            if (block.type === "text") return block.text;
            return ""; 
          })
          .join("\n")
      }
      
      const roleName = msg.role === "user" ? "User" : "Assistant"
      fullPrompt += `${roleName}:\n${content}\n\n`
    }
    
    fullPrompt += "Assistant:\n"

    const payload = {
      prompt: fullPrompt,
      modelSlug: this.options.apiModelId || "echo-speed"
    }

    try {
      const response = await axios.post(`${baseUrl}/api/echo/chat`, payload, {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey,
        },
        responseType: "stream",
      })

      let buffer = ""

      for await (const chunk of response.data) {
        buffer += chunk.toString()

        // 🔥 GÜVENLİ PARSE MANTIĞI: "data:" ile böl
        // SSE mesajları her zaman "data:" ile başlar ve "\n\n" ile biter.
        
        let delimiterIndex
        while ((delimiterIndex = buffer.indexOf("\n\n")) >= 0) {
            const messageBlock = buffer.slice(0, delimiterIndex).trim()
            buffer = buffer.slice(delimiterIndex + 2)

            if (!messageBlock.startsWith("data:")) continue

            // "data:" önekini temizle
            const dataContent = messageBlock.slice(5).trim()

            // 🛑 BİTİŞ SİNYALİ
            if (dataContent === "[DONE]") {
                return 
            }

            try {
                const parsed = JSON.parse(dataContent)

                // 1. Metin İçeriği
                const content = parsed.content || parsed.reply || parsed.text || ""
                if (content) {
                    yield {
                        type: "text",
                        text: content
                    }
                }

                // 2. Usage Bilgisi
                if (parsed.usage) {
                    yield {
                        type: "usage",
                        inputTokens: parsed.usage.promptTokens || 0,
                        outputTokens: parsed.usage.responseTokens || 0,
                        totalCost: parsed.costTl || 0 
                    }
                }

            } catch (e) {
                // JSON parse hatası olursa (bazen nadiren olur), logla ama akışı bozma
                console.warn("DevLOG: JSON parse hatası, chunk atlandı:", e)
            }
        }
      }

    } catch (error) {
      console.error("DevLOG Cloud API Error:", error)
      throw new Error(`DevLOG Cloud bağlantı hatası: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  async getModels(): Promise<ModelInfo[]> {
    const PRODUCTION_URL = "http://localhost:4000"
    let baseUrl = (this.options as any).devlogBaseUrl || (this.options as any).baseUrl || PRODUCTION_URL
    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, -1)
    }
    
    const apiKey = (this.options as any).devlogApiKey || (this.options as any).apiKey

    try {
      const response = await axios.get(`${baseUrl}/api/echo/models`, {
        headers: {
          "X-Api-Key": apiKey,
        },
      })

      const rawData = Array.isArray(response.data) ? response.data : []

      return rawData.map((m: any) => ({
        id: m.slug,
        name: m.name,
        description: m.description,
        contextWindow: m.contextWindow || 32768, 
        maxTokens: 4096,
        inputPrice: m.inputPricePer1K || 0,
        outputPrice: m.outputPricePer1K || 0,
        
        supportsImages: true,
        supportsNativeTools: false, 
        supportsPromptCache: true,
        supportsComputerUse: false,
        supportsReasoningEffort: false
      }))

    } catch (error) {
      console.error("DevLOG Cloud Models Error:", error)
      return []
    }
  }

  async countTokens(content: Array<Anthropic.Messages.ContentBlockParam>): Promise<number> {
    const text = JSON.stringify(content);
    return Math.ceil(text.length / 4);
  }
}