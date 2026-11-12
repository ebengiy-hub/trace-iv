import { downloadBlob } from './pdf'

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export async function sendToEmail(email: string, blob: Blob): Promise<'shared' | 'composed'> {
  const file = new File([blob], 'TRACE-IV-My-Collection.pdf', { type: 'application/pdf' })
  const shareData: ShareData = { files: [file], title: 'My Museum Collection' }
  if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
    await navigator.share(shareData)
    return 'shared'
  }

  downloadBlob(blob, file.name)
  const subject = encodeURIComponent('My TRACE IV Museum Collection')
  const body = encodeURIComponent('I downloaded my TRACE IV collection PDF. Please attach the downloaded TRACE-IV-My-Collection.pdf file to this email before sending.')
  window.location.href = `mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`
  return 'composed'
}
