# Echo AI Changelog

All notable changes to this project will be documented in this file.

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
