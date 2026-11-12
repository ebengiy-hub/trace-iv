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

GitHub Pages için Vite `base` değerini `/trace-iv/` olarak ayarlayın, `npm run build` çalıştırın ve `dist` içeriğini `gh-pages` dalı veya GitHub Actions ile yayınlayın. `vite.config.ts` içindeki `base` değerini Pages için `/trace-iv/` olarak ayarlayın. Vercel veya Netlify kök alanında yayınlarken `BASE=/` kullanın/uygulayın ve yeniden build alın. Gerçek adres: `https://<kullanici>.github.io/trace-iv/` (yayın sonrası yer tutucuyu güncelleyin).

```sh
npm run qr -- https://<kullanici>.github.io/trace-iv/
```

Alternatif olarak `SITE_URL` ortam değişkeni, `package.json` içindeki `homepage` alanı veya `qr/url.txt` kullanılabilir. QR üreticisi sadece kamuya açık HTTPS adreslerini kabul eder ve `qr/trace-iv-qr.svg` ile `qr/trace-iv-qr.png` oluşturur. Yayın güncellemesi: kodu değiştirin, `npm run build` çalıştırın, aynı hosting hedefine yeniden deploy edin; adres değişirse QR’ı yeniden üretin.

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

For GitHub Pages, set Vite's `base` to `/trace-iv/`, run `npm run build`, and publish `dist` using a `gh-pages` branch or GitHub Actions. For Vercel or Netlify at the domain root, use `BASE=/` and rebuild. Public URL placeholder: `https://<username>.github.io/trace-iv/` (replace it after deployment).

```sh
npm run qr -- https://<username>.github.io/trace-iv/
```

Alternatively provide `SITE_URL`, `package.json`'s `homepage`, or `qr/url.txt`. The generator accepts public HTTPS URLs only and writes `qr/trace-iv-qr.svg` and `qr/trace-iv-qr.png`. To redeploy, update the code, run `npm run build`, and publish to the same host; regenerate the QR if the public URL changes.
