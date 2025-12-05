# DevLOG Cloud (Echo AI) API

DevLOG Cloud eklentisi, diğer VS Code eklentilerinin kullanabileceği bir API sunar.
Bu API'yi kendi eklentinizde kullanmak için:

1. `npm`, `pnpm` veya `yarn` kullanarak `@echo-ai/types` paketini yükleyin.
2. `EchoAIAPI` tipini import edin.
3. Eklenti API'sini yükleyin.

```typescript
import { EchoAIAPI } from "@echo-ai/types"
import * as vscode from "vscode"

// Extension ID'sini kendi package.json dosyanızdaki (publisher.name) ile eşleşecek şekilde güncelledik.
const extension = vscode.extensions.getExtension<EchoAIAPI>("echo-ai.echo-ai")

if (!extension?.isActive) {
    throw new Error("DevLOG Cloud eklentisi aktif değil.")
}

const api = extension.exports

if (!api) {
    throw new Error("API kullanılamıyor.")
}

// Yeni bir görev başlat (Başlangıç mesajı ile)
await api.startNewTask("Merhaba Echo! Yeni bir proje oluşturalım...")

// Yeni bir görev başlat (Görseller ile)
await api.startNewTask("Bu tasarım dilini kullan", ["data:image/webp;base64,..."])

// Mevcut göreve mesaj gönder
await api.sendMessage("Şu @hataları düzeltebilir misin?")

// Sohbet arayüzündeki birincil butona basmayı simüle et (Örn: 'Kaydet' veya 'Çalışırken Devam Et')
await api.pressPrimaryButton()

// Sohbet arayüzündeki ikincil butona basmayı simüle et (Örn: 'Reddet')
await api.pressSecondaryButton()