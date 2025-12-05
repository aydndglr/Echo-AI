# Echo AI Changelog

All notable changes to this project will be documented in this file.

## [1.0.5] - 2025-12-05

### 🇹🇷 Türkçe

### 🚀 Backend ve Streaming Devrimi
- **Google GenAI SDK Geçişi:** Backend tarafında manuel `axios` istekleri ve karmaşık buffer yönetimi terk edildi. Google'ın resmi ve modern **`@google/genai` SDK**'sına geçiş yapıldı.
- **Kesintisiz Akış (Streaming):** Cevapların parça parça gelmesini sağlayan SSE (Server-Sent Events) yapısı baştan aşağı yenilendi. `JSON parse error` ve `SyntaxError` hataları tarihe karıştı.
- **Akıllı Hata Yönetimi:** 429 Rate Limit (Hız Sınırı) ve diğer API hataları artık kullanıcıya dostane bir dille sohbet penceresinde bildiriliyor.
- **Usage ve Maliyet Takibi:** Token kullanımı ve maliyet bilgisi artık akışın en sonunda Frontend'e iletiliyor. Bu sayede "API İsteği..." (Sarı Çember) takılması sorunu **kesin olarak çözüldü**. ✅

### 🧠 Model ve Zeka Entegrasyonu
- **DevLOG Cloud Modelleri:** `Echo Speed`, `Echo Pro` ve `Echo Max` modelleri sisteme tam entegre edildi.
- **Görüntü Desteği (Vision):** Modellerin "Görüntüleri desteklemez" uyarısı kaldırıldı, görsel analiz yeteneği aktif edildi. 👁️
- **Araç Kullanımı (Tool Use):** Backend yapısına uygun olarak `Native Tools` yerine **`XML Tools`** protokolüne geçildi. Bu sayede modelin cevabı ikiye bölmesi ve gereksiz döngüye girmesi engellendi.

### 🎨 Arayüz (UI) İyileştirmeleri
- **Temiz Ayarlar Menüsü:** "DevLOG Cloud" seçildiğinde artık sadece **API Key** kutusu görünüyor. Kafa karıştıran Base URL alanı gizlendi ve kod içine gömüldü.
- **Tekil Model Seçici:** Arayüzde çakışan çift model seçici (dropdown) sorunu giderildi. Artık tek ve kararlı bir liste çalışıyor.
- **Statik Yedekleme (Fallback):** Sunucuya erişilemese bile model listesi (Speed/Pro/Max) arayüzde her zaman hazır bekliyor.

### 🔧 Sistem ve Bakım
- **Merkezi Versiyon Yönetimi:** Versiyon numarası artık tek tek dosyalara yazılmıyor, doğrudan `package.json` dosyasından dinamik olarak çekiliyor.
- **Type Güvenliği:** Backend ve Frontend arasındaki veri tipleri (Zod şemaları) senkronize edildi.

---

### 🇺🇸 English

### 🚀 Backend & Streaming Revolution
- **Google GenAI SDK Migration:** Manual `axios` requests and complex buffer management in the backend have been abandoned. Switched to Google's official and modern **`@google/genai` SDK**.
- **Seamless Streaming:** The SSE (Server-Sent Events) structure for streaming responses has been completely overhauled. `JSON parse error` and `SyntaxError` issues are history.
- **Smart Error Handling:** Rate Limit (429) and other API errors are now reported to the user in a friendly language within the chat window.
- **Usage & Cost Tracking:** Token usage and cost information is now transmitted to the Frontend at the very end of the stream. This **definitively resolved** the "API Request..." (Infinite Spinner) hang issue. ✅

### 🧠 Model & Intelligence Integration
- **DevLOG Cloud Models:** `Echo Speed`, `Echo Pro`, and `Echo Max` models are fully integrated into the system.
- **Vision Support:** The "Images not supported" warning has been removed; visual analysis capability is now active. 👁️
- **Tool Use:** Switched to **`XML Tools`** protocol instead of `Native Tools` to match the backend structure. This prevents the model from splitting responses and entering unnecessary loops.

### 🎨 Interface (UI) Improvements
- **Clean Settings Menu:** When "DevLOG Cloud" is selected, only the **API Key** box is visible. The confusing Base URL field has been hidden and hardcoded.
- **Single Model Selector:** The issue of conflicting double model selectors (dropdowns) in the UI has been resolved. A single, stable list is now operational.
- **Static Fallback:** The model list (Speed/Pro/Max) is always ready in the UI, even if the server is unreachable.

### 🔧 System & Maintenance
- **Centralized Version Management:** Version numbers are no longer hardcoded in multiple files; they are fetched dynamically directly from `package.json`.
- **Type Safety:** Data types (Zod schemas) between Backend and Frontend have been synchronized.

## [1.0.4] - 2025-11-30

### 🇹🇷 Türkçe

### 🔧 Arayüz ve Metin Temizliği
- RooCode döneminden kalan tüm **Roomote**, **Roo**, **Roo Cloud**, **.echomodes** ve benzeri kalıntı metinler arayüzden tamamen temizlendi.
- Cloud ekranındaki yanlış/eskimiş metinler güncellendi:
  - "Roomote Control" → "Uzaktan Kontrol / Remote Control"
  - "Enjoying Roo?" → "Enjoying Echo AI?"
- Mod düzenleme açıklamaları Echo yapısına uygun hale getirildi:
  - `.echomodes` yerine artık doğru yol **`.echo/modes/custom_modes.yaml`** olarak gösteriliyor.
  - `loadFromFile` açıklamaları yenilendi ve `.echo/rules-{{slug}}/` yapısına göre düzeltildi.
- Hoş geldin ekranındaki eski "Roo logo" alt metni **Echo AI** olarak güncellendi.

### 📝 Sürüm Bilgilendirme (What's New) Ekranı Güncellendi
- 1.0.3 popup’ında görüntülenen eski/yanlış özellikler kaldırıldı.
- Artık gerçek Echo AI 1.0.3 değişiklikleri gösteriliyor:
  - Telemetri tamamen kaldırıldı.
  - Cloud/analitik bağımlılıkları temizlendi.
  - Kullanıcı verilerinin sadece yerel makinede kaldığı açıkça belirtiliyor.

### 🔗 Sosyal Bağlantıların Temizlenmesi
- Eski X / Discord / Reddit linkleri tamamen kaldırıldı.
- Sosyal alan artık yalnızca Echo AI GitHub deposunu gösteriyor.
- Yeni `<githubLink>` bileşeni eklendi ve popup’taki bağlantı **https://github.com/aydndglr/Echo-AI** adresine yönlendiriyor.

### 🎨 Genel Temizlik ve Uyum
- UI boyunca Echo AI markasıyla uyuşmayan tüm kelimeler, açıklamalar ve linkler temizlendi veya yeniden düzenlendi.
- Eski belgelerden, uyarılardan ve Roo/Roomote’e gönderme yapan ifadeler kaldırıldı.
- Sürüm gösterim alanı, açıklamalar ve sosyal linkler artık tamamen Echo AI'a göre uyumlu.

---

### 🇬🇧 English

### 🔧 UI & Text Cleanup
- Removed all remaining references to **Roomote**, **Roo**, **Roo Cloud**, and deprecated **.echomodes** terminology.
- Updated Cloud panel texts:
  - "Roomote Control" → "Remote Control"
  - "Enjoying Roo?" → "Enjoying Echo AI?"
- Updated mode configuration descriptions to match Echo’s directory structure:
  - `.echomodes` replaced with correct **`.echo/modes/custom_modes.yaml`**
  - `loadFromFile` instructions rewritten based on `.echo/rules-{{slug}}/`.

### 📝 Updated “What’s New” Popup
- Removed outdated/inaccurate feature descriptions from earlier builds.
- Now correctly displays the actual 1.0.3 improvements:
  - Telemetry fully removed.
  - Cloud/analytics dependencies cleaned up.
  - Clear communication that Echo AI stores all data locally.

### 🔗 Social Links Cleanup
- Removed old X / Discord / Reddit links.
- Replaced with a single GitHub link pointing to:
  - **https://github.com/aydndglr/Echo-AI**
- Added new `<githubLink>` component to support this.

### 🎨 Overall Cleanup & Branding Alignment
- All text/content mismatching the Echo AI branding has been updated or removed.
- Deprecated comments, outdated warnings, and Roo/Roomote messaging fully removed.
- Version popup, social area, and descriptive texts now fully aligned with Echo AI identity.



---


## **[1.0.3] – 2025-11-29**

### 🇹🇷 Türkçe

### 🔒 **Telemetry Tamamen Kaldırıldı – %100 Yerel Gizlilik**
Bu sürümde telemetri sistemi tamamen temizlendi.  
Hem backend (Node) hem de webview (React UI) tarafında kalan tüm izleme kodları kaldırıldı.

#### Yapılan değişiklikler:
- **TelemetryService → NO-OP:**
  - Tüm `captureEvent` ve benzeri izleme fonksiyonları boşaltıldı.
  - Artık hiçbir olay kaydedilmez veya işlenmez.

- **CloudTelemetryClient → NO-OP:**
  - Roo API’ye veya herhangi bir uzak sunucuya veri gönderimi tamamen durduruldu.
  - `fetch`, `backfillMessages`, `retryQueue` gibi tüm mekanizmalar pasifleştirildi.

- **WelcomeView güncellendi:**
  - Telemetry onayı, PostHog flag kontrolü ve izleme kodları tamamen kaldırıldı.
  - Cloud provider tespiti & telemetri tabanlı yönlendirmeler devre dışı bırakıldı.

- **About (Hakkında) ekranı yenilendi:**
  - Telemetry checkbox ve açıklamalar yoruma alındı.
  - Yerine: **“Echo AI hiçbir veri toplamaz, tamamen yerel çalışır.”** mesajı eklendi.

- **Çeviri dosyaları:**
  - Telemetri ile ilgili kullanılmayan string'ler artık arayüzde kullanılmıyor.

### 🌟 **Ek İyileştirmeler**
- UI sadeleştirildi, daha gizlilik odaklı hâle getirildi.
- Kullanılmayan PostHog import’ları ve kod parçacıkları projeden tamamen temizlendi.
- Sürüm bilgileri güncellenerek 1.0.3 olarak işaretlendi.

---

### 🇬🇧 English

### 🔒 **Telemetry Fully Removed – 100% Local Privacy**
This release removes the entire telemetry system.  
Tracking logic for both backend and webview has been eliminated to ensure full privacy.

#### Changes:
- **TelemetryService → NO-OP:**
  - All telemetry functions now do nothing.
  - No events are recorded or sent.

- **CloudTelemetryClient → NO-OP:**
  - No API calls, message uploads, or queue retries.
  - All Roo Cloud–related logic disabled.

- **WelcomeView updated:**
  - Telemetry opt-in UI removed.
  - PostHog feature flag handling removed.
  - Provider click tracking disabled.

- **About page updated:**
  - Telemetry checkbox and description commented out.
  - Replaced with a clear privacy statement:
    **“Echo AI collects no telemetry and operates fully locally.”**

- **Translations:**
  - Telemetry strings no longer used anywhere in the UI.

### 🌟 **Additional Improvements**
- Cleaner and more privacy-friendly UI design.
- Removed all unused PostHog references.
- Version bumped to 1.0.3 across related files.

---

## **[1.0.2] – 2025-11-27**

### 🇹🇷 Türkçe
- **Temizlik:** Kullanılmayan `CloudService` kalıntıları tamamen temizlendi.
- **Düzeltme:** Derleme sırasında oluşan `PostHog` ve `Types` hataları giderildi.
- **İyileştirme:** UI etiketleri düzeltildi; menüler artık doğru şekilde "Echo AI" gösteriyor.
- **Performans:** Küçük yerel modellerin performansını artırmaya yönelik düzenlemeler yapıldı.

### 🇬🇧 English
- **Cleanup:** Removed old `CloudService` code.
- **Fix:** Addressed build errors caused by PostHog and type mismatches.
- **Refinement:** UI labels updated to consistently show “Echo AI”.

---

## **[1.0.1] – 2025-11-20**

### 🇹🇷 Türkçe
**🚀 Echo AI Sürüm 1.0 – Performans ve Yerel Zeka Odaklı Modern Yapı**

- Gereksiz arka plan servisleri ve telemetri süreçleri devre dışı bırakıldı.
- Başlangıç süresi ve çalışma performansı iyileştirildi.
- “Local-First” çalışma yapısı güçlendirildi.
- Prompt mühendisliği ve bağlam yönetimi geliştirildi.
- Yeni sadeleştirilmiş kurulum arayüzü eklendi.

### 🇬🇧 English
**🚀 Echo AI Version 1.0 – Performance & Local Intelligence**

- Background services & telemetry disabled for minimal memory usage.
- Startup and overall performance improved.
- Transitioned fully to a Local-First architecture.
- Improved prompt engineering and context compression.
- Redesigned welcome experience.

---

## 📬 İletişim & Kaynaklar / Contact & Resources

- **GitHub:** https://github.com/aydndglr/Echo-AI  
- **Website:** https://devlog.tr  
- **Email:** echo@devlog.tr  

---

## ❤️ Teşekkür & Atıf / Acknowledgments & Attribution

**Echo AI**, açık kaynaklı **Roo Code** projesi temel alınarak geliştirilmiştir.  
Projenin önceki sürümleri için Roo Code ekibine ve topluluğuna teşekkür ederiz.

**Based on the open-source Roo Code project.**  
We sincerely thank the Roo Code team and its community.

🔗 **Original Project:** https://github.com/RooCodeInc/Roo-Code
