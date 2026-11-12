# TRACE IV — Augmented Heritage

Mobil müze deneyimi prototipi: ziyaret rotası, eser keşfi, bağlamsal soru-cevap, koleksiyon ve PDF paylaşımı.

## Kurulum ve çalıştırma

```sh
npm i
npm run dev
npm run build
```

Test komutu henüz tanımlı değildir. PDF, tarayıcıda gerçek eser görselleri ve kayıt bilgileriyle oluşturulur. E-posta sunucusu yoktur: desteklenen cihazlarda PDF paylaşım menüsü açılır; diğerlerinde PDF indirilir ve e-posta uygulaması, dosyanın eklenmesi gerektiğini belirten bir taslakla açılır.

## Yayınlama ve QR

GitHub Pages için Vite `base` değerini `/trace-iv/` olarak ayarlayın, `npm run build` çalıştırın ve `dist` içeriğini `gh-pages` dalı veya GitHub Actions ile yayınlayın. `vite.config.ts` içindeki `base` değerini Pages için `/trace-iv/` olarak ayarlayın. Vercel veya Netlify kök alanında yayınlarken `BASE=/` kullanın/uygulayın ve yeniden build alın. Gerçek adres: `https://ebengiy-hub.github.io/trace-iv/` (yayın sonrası yer tutucuyu güncelleyin).

```sh
npm run qr -- https://ebengiy-hub.github.io/trace-iv/
```

Alternatif olarak `SITE_URL` ortam değişkeni, `package.json` içindeki `homepage` alanı veya `qr/url.txt` kullanılabilir. QR üreticisi sadece kamuya açık HTTPS adreslerini kabul eder ve `qr/trace-iv-qr.svg` ile `qr/trace-iv-qr.png` oluşturur. Yayın güncellemesi: kodu değiştirin, `npm run build` çalıştırın, aynı hosting hedefine yeniden deploy edin; adres değişirse QR’ı yeniden üretin.


## Güncelleme ve yeniden deploy (hızlı)

Canlı adres: https://ebengiy-hub.github.io/trace-iv/ (GitHub Pages, `gh-pages` dalı). Kodu değiştirdikten sonra:

```sh
npm run deploy   # build alır, dist'i gh-pages dalına gönderir (gh auth login gerekir)
git add -A && git commit -m "..." && git push
```

Adres aynı kaldığı için QR yeniden üretilmez. Ekranlara doğrudan bağlantı (sunum/test): `#screen=3&intro=0`. QR dosyaları: `qr/trace-iv-qr.png` (2400 px), `qr/trace-iv-qr.svg`.

---

# TRACE IV — Augmented Heritage (English)

A mobile museum experience prototype for visiting a route, exploring artifacts, asking contextual questions, saving a collection, and sharing a PDF.

## Install and run

```sh
npm i
npm run dev
npm run build
```

No test script is configured yet. The PDF is generated in the browser with artifact images and record details. There is no email backend: supported devices open the native share sheet; otherwise the PDF downloads and a mail draft opens with instructions to attach it.

## Deploy and make a QR code

For GitHub Pages, set Vite's `base` to `/trace-iv/`, run `npm run build`, and publish `dist` using a `gh-pages` branch or GitHub Actions. For Vercel or Netlify at the domain root, use `BASE=/` and rebuild. Public URL placeholder: `https://ebengiy-hub.github.io/trace-iv/` (replace it after deployment).

```sh
npm run qr -- https://ebengiy-hub.github.io/trace-iv/
```

Alternatively provide `SITE_URL`, `package.json`'s `homepage`, or `qr/url.txt`. The generator accepts public HTTPS URLs only and writes `qr/trace-iv-qr.svg` and `qr/trace-iv-qr.png`. To redeploy, update the code, run `npm run build`, and publish to the same host; regenerate the QR if the public URL changes.

## Update and redeploy (quick)

Live URL: https://ebengiy-hub.github.io/trace-iv/ (GitHub Pages, `gh-pages` branch). After changing code run `npm run deploy` (builds and force-pushes `dist` to `gh-pages`; needs `gh auth login`), then commit and push `main`. The URL stays the same, so the QR code does not change. Deep link to a screen: `#screen=3&intro=0`.
