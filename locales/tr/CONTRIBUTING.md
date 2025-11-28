<div align="center">
  <img src="/src/assets/icons/icon.png" width="64" height="64" alt="Echo AI Logo">
  <h1>Contributing to Echo AI</h1>
</div>

[🇹🇷 Türkçe Versiyon](#-echo-ai-katkıda-bulunma-rehberi) | [🇬🇧 English Version](#-contributing-to-echo-ai)

---

<a name="turkish"></a>
# 🇹🇷 Echo AI Katkıda Bulunma Rehberi

Echo AI, topluluk odaklı bir projedir ve her türlü katkıya büyük değer veriyoruz. İşbirliğini düzenli tutmak için **[Önce Sorun Bildirimi (Issue-First)](#sorun-bildirimi-yaklaşımı)** prensibiyle çalışıyoruz. Yani, göndereceğiniz tüm "Pull Request" (PR) işlemleri, önceden açılmış bir GitHub Issue (Sorun Kaydı) ile bağlantılı olmalıdır.

Lütfen bu rehberi dikkatlice okuyun.

## İçindekiler

- [Başlamadan Önce](#başlamadan-önce)
- [Katkı Planlaması](#katkı-planlaması)
- [Geliştirme ve Gönderim Süreci](#geliştirme-ve-gönderim-süreci)
- [Yasal](#yasal)

## Başlamadan Önce

### 1. Davranış Kuralları
Tüm katılımcıların [Davranış Kuralları](./CODE_OF_CONDUCT.md) metnine uyması gerekmektedir.

### 2. Proje Vizyonu
Katkılarınızın projenin ana hedefleriyle uyumlu olması önemlidir:

* **Güvenilirlik:** Komut yürütme ve dosya işlemlerinde tutarlılık.
* **Yerel ve Gizlilik Odaklı:** Ollama ve yerel modellerle tam uyumluluk ve veri gizliliği.
* **Kullanıcı Deneyimi:** Arayüzün sade, anlaşılır ve geliştirici dostu olması.
* **Performans:** Gereksiz kaynak tüketiminden kaçınma.

### 3. İletişim
Projeyle ilgili sorularınız veya tartışmalarınız için:
* **GitHub Issues:** Teknik tartışmalar ve görev takibi.
* **Web:** Gelişmeler için [devlog.tr](https://devlog.tr) adresini takip edebilirsiniz. (Hazırlanıyor)

## Katkı Planlaması

### Sorun Bildirimi Yaklaşımı (Issue-First)
Kod yazmaya başlamadan önce bir tartışma ortamı yaratmayı tercih ediyoruz.

1.  **Mevcut Sorunları Kontrol Edin:** [GitHub Issues](https://github.com/aydndglr/Echo-AI/issues) sayfasında arama yapın.
2.  **Yeni Bir Issue Oluşturun:**
    * **Geliştirme (Enhancement):** Yeni bir özellik fikriniz varsa.
    * **Hata (Bug):** Bir sorun bulduysanız (Nasıl tekrar edileceğini adım adım yazın).
3.  **Üzerinde Çalışmak mı İstiyorsunuz?** İlgili Issue altına "Bu görev üzerinde çalışmak istiyorum" (Claiming) yazın.

### Hata Raporlama
* [GitHub Issues](https://github.com/aydndglr/Echo-AI/issues/new/choose) üzerinden yeni bir kayıt oluşturun.
* **Güvenlik Açıkları:** Lütfen GitHub yerine doğrudan `security@devlog.tr` adresine bildirin.

## Geliştirme ve Gönderim Süreci

### Geliştirme Kurulumu

1.  **Fork Edin ve Klonlayın:**
    Projeyi kendi hesabınıza fork'layın ve bilgisayarınıza indirin:
    ```bash
    git clone [https://github.com/SENIN_KULLANICI_ADIN/Echo-AI.git](https://github.com/SENIN_KULLANICI_ADIN/Echo-AI.git)
    cd Echo-AI
    ```

2.  **Bağımlılıkları Yükleyin:**
    ```bash
    pnpm install
    ```

3.  **Hata Ayıklama (Debug):**
    VS Code içinde projeyi açın ve `F5` tuşuna basarak test edin.

### Kod Yazma Kuralları
* Her PR sadece tek bir sorunu veya özelliği çözmelidir.
* ESLint ve TypeScript standartlarına uyun.
* Commit mesajlarında ilgili Issue numarasına referans verin (Örn: `Fixes #123`).
* Göndermeden önce yerel olarak test edin.

### Pull Request (PR) Gönderimi
* Henüz bitmediyse PR'ı **"Draft"** (Taslak) olarak açın.
* PR açıklamasında ilgili sorunu (Issue) mutlaka belirtin.
* Arayüz değişikliği yaptıysanız ekran görüntüsü ekleyin.

## Yasal
Katkıda bulunarak, katkılarınızın Echo AI'ın kullandığı **Apache 2.0 Lisansı** altında lisanslanacağını kabul etmiş olursunuz.
