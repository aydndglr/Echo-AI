<p align="center">
  <img src="/src/assets/icons/icon.png" width="128" height="128" alt="Echo AI Logo">
</p>

# Echo AI

> **Yerel Modellerle Güçlendirilmiş, Gizlilik Odaklı Kod Asistanınız.**  
> *Your Privacy-First, Local-Model Powered Coding Assistant.*

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=echo-ai.echo-ai"><img src="https://img.shields.io/badge/VS_Code_Marketplace-007ACC?style=flat&logo=visualstudiocode&logoColor=white" alt="VS Code Marketplace"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-Apache%202.0-blue.svg" alt="License"></a>
  <img src="https://img.shields.io/badge/Version-1.0.2-green.svg" alt="Version">
  <img src="https://img.shields.io/badge/Ollama-Ready-orange.svg" alt="Ollama Ready">
</p>

<p align="center">
  <em>Gelişmeler ve iletişim için: 👉 <a href="https://devlog.tr"><strong>devlog.tr</strong></a> 👈</em>
</p>

---

# 🇹🇷 Türkçe Açıklama

## Echo AI Nedir?

**Echo AI**, Roo Code projesinin modernize edilmiş bir türevidir.  
Yerel LLM'ler (Ollama) ve düşük parametreli modeller (4B, 8B) üzerine optimize edilmiştir.

Bulut bağımlılığını azaltır, gizliliği artırır ve tamamen kendi cihazınızın gücüyle çalışır.

## Özellikler

- 🧠 **Yerel Zeka:** Ollama destekli modellerle (DeepSeek, Llama 3, Qwen vb.) uyumludur.  
- 🚀 **Kod Üretimi:** Doğal dille tarif ettiğiniz kodu eksiksiz üretir.  
- 🔧 **Refactoring & Debug:** Kodunuzu analiz eder, hataları bulur ve iyileştirir.  
- 📂 **Bağlam Yönetimi:** Projedeki dosyaları gerektiğinde otomatik okur.  
- 📝 **Dokümantasyon:** Kodlarınıza otomatik açıklama ve yorum ekler.  
- 🤖 **Otonom Görevler:** Yinelenen süreçleri sizin yerinize otomatik çözer.

## Çalışma Modları

- **Code Mode** – Günlük kodlama işlemleri  
- **Architect Mode** – Sistem tasarımı ve planlama  
- **Ask Mode** – Kod tabanı hakkında sorular  
- **Debug Mode** – Hataları analiz etme  
- **Orchestrator Mode** – Görevleri alt görevlere bölme  

---

## Kurulum

### 1. Depoyu İndir

```sh
git clone https://github.com/aydndglr/Echo-AI.git
cd Echo-AI
```

### 2. Bağımlılıkları Yükle

```sh
pnpm install
```

### 3. Geliştirme Ortamında Çalıştır (F5)

VS Code içinde:

- Projeyi aç  
- **F5** tuşuna bas  

Böylece “Extension Development Host” penceresi açılır.

### 4. VSIX Paket Oluşturma

```sh
pnpm run build
pnpm run vsix
```

Oluşan `.vsix` dosyasını kurmak için:

```sh
code --install-extension bin/echo-ai-1.0.3.vsix
```

---

## Sorumluluk Reddi

Echo AI, Roo Code tabanlı açık kaynaklı bir projedir.  
Üretilen kodların hatasız olacağı garanti edilmez.  
Kullanmadan önce sonuçları incelemeniz önerilir.

---

## Lisans

Bu proje **Apache 2.0** lisansı ile lisanslanmıştır.

---

**Happy Coding! / İyi Kodlamalar!** 🚀
