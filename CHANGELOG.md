# Echo AI Changelog

All notable changes to this project will be documented in this file.

## [1.0.2] - 2025-11-27

### 🇹🇷 Türkçe
- **Temizlik:** Kullanılmayan `CloudService` ve `MarketplaceManager` kalıntıları tamamen temizlendi.
- **Düzeltme:** Derleme (Build) sırasında oluşan `PostHog` ve `Types` hataları giderildi.
- **İyileştirme:** VS Code arayüzündeki isim uyuşmazlıkları düzeltildi, menüler "Echo AI" olarak güncellendi.
- **Performans:** Temel amaç küçük yerel modellerin etkili kullanımına yönelik çalışma olduğu için performans odaklı düzenleme ve geliştirme yapıldı.

### 🇬🇧 English
- **Cleanup:** Removed remaining dead code related to `CloudService` and `MarketplaceManager`.
- **Fix:** Resolved build errors related to `PostHog` telemetry and missing types.
- **Refinement:** Fixed UI labeling inconsistencies; menus now correctly display "Echo AI".

---

## [1.0.1] - 2025-11-20

### 🇹🇷 Türkçe
**🚀 Echo AI Sürüm 1.0: Performans ve Yerel Zeka Odaklı Yeni Nesil Ajan**

Bu sürüm, Echo AI'ın performans, gizlilik ve yerel model optimizasyonu üzerine yeniden inşa edilen ilk kararlı sürümüdür.

- **⚡ Genel Optimizasyon ve Performans:**
  - Uygulama içi gereksiz arka plan servisleri ve veri izleme (telemetri) süreçleri tamamen devre dışı bırakılarak bellek kullanımı minimize edildi.
  - Başlangıç hızı (Startup Time) önemli ölçüde iyileştirildi.
  - Bulut bağımlılıkları kaldırılarak, çevrimdışı (offline) ve yerel ağlarda çalışabilen "Local-First" odaklı mimariye geçildi.

- **🧠 Gelişmiş Prompt Mühendisliği (Prompt Engineering):**
  - **Yerel Model Uyumluluğu:** Küçük parametreli modellerden (4B/8B) büyük model performansı almak için sistem promptları yeniden tasarlandı.
  - **Bağlam Yönetimi:** Gereksiz token tüketimini önleyen akıllı bağlam (context) sıkıştırma algoritmaları optimize edildi.
  - **Düşünce Zinciri (CoT):** Modelin kod yazmadan önce planlama yapmasını sağlayan özel talimat setleri eklendi.

- **🎨 Arayüz İyileştirmeleri:**
  - **Odak Modu:** Dikkat dağıtıcı reklam, duyuru ve harici servis yönlendirmeleri arayüzden temizlendi.
  - **Sadeleştirilmiş Kurulum:** Karmaşık sağlayıcı seçim ekranları yerine, doğrudan geliştirme ortamına odaklanan yeni bir karşılama ekranı (WelcomeView) tasarlandı.

### 🇬🇧 English
**🚀 Echo AI Version 1.0: Next-Gen Agent Focused on Performance & Local Intelligence**

This release marks the first stable version of Echo AI, re-engineered for performance, privacy, and local model optimization.

- **⚡ General Optimization & Performance:**
  - Minimized memory usage by completely disabling unnecessary background services and telemetry tracking processes.
  - Significantly improved application startup time.
  - Transitioned to a "Local-First" architecture by removing cloud dependencies, enabling full offline capability.

- **🧠 Advanced Prompt Engineering:**
  - **Local Model Compatibility:** System prompts have been redesigned to extract large-model performance from small parameter models (4B/8B).
  - **Context Management:** Optimized smart context compression algorithms to prevent unnecessary token consumption.
  - **Chain of Thought (CoT):** Added specialized instruction sets that force the model to plan before coding.

- **🎨 UI/UX Refinements:**
  - **Focus Mode:** Removed distracting ads, announcements, and external service redirects from the interface.
  - **Streamlined Setup:** Replaced complex provider selection screens with a simplified WelcomeView focused purely on the development environment.

---

## 📬 İletişim & Kaynaklar / Contact & Resources

* **GitHub:** [aydndglr/Echo-AI](https://github.com/aydndglr/Echo-AI)
* **Website:** [devlog.tr](https://devlog.tr)
* **Email:** [echo@devlog.tr](mailto:echo@devlog.tr)

## ❤️ Teşekkür ve Atıf / Acknowledgments & Attribution

**Echo AI**, harika bir açık kaynak projesi olan **Roo Code** temel alınarak geliştirilmiştir. Bu projenin önceki sürümleri ve mimarisi için Roo Code ekibine ve topluluğuna içtenlikle teşekkür ederiz.

**Echo AI** is built upon the foundation of the amazing open-source project **Roo Code**. We sincerely thank the Roo Code team and community for the earlier versions and architecture of this project.

🔗 **Original Project:** [Roo Code on GitHub](https://github.com/RooCodeInc/Roo-Code)