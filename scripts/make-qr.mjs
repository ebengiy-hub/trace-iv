import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))
let candidate = process.argv[2] || process.env.SITE_URL || packageJson.homepage

if (!candidate) {
  try {
    candidate = (await readFile(resolve(root, 'qr/url.txt'), 'utf8')).trim()
  } catch {
    throw new Error('No URL provided. Pass an HTTPS URL, set SITE_URL, add package.json homepage, or create qr/url.txt.')
  }
}

let url
try {
  url = new URL(candidate)
} catch {
  throw new Error(`Invalid website URL: ${candidate}`)
}
const hostname = url.hostname.toLowerCase()
if (url.protocol !== 'https:' || hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1' || hostname === 'example.com' || hostname.endsWith('.example.com') || hostname.includes('<') || hostname.includes('>')) {
  throw new Error('QR destination must be a real public HTTPS URL (localhost, example domains, placeholders, and HTTP are rejected).')
}

const output = resolve(root, 'qr')
await mkdir(output, { recursive: true })
const options = { errorCorrectionLevel: 'H', margin: 4, color: { dark: '#000000', light: '#ffffff' } }
const svg = await QRCode.toString(url.toString(), { ...options, type: 'svg' })
await writeFile(resolve(output, 'trace-iv-qr.svg'), svg, 'utf8')
await QRCode.toFile(resolve(output, 'trace-iv-qr.png'), url.toString(), { ...options, width: 2400, type: 'png' })
console.log(`QR code created for ${url.toString()}`)
