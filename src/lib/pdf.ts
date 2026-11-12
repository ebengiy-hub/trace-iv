import { jsPDF } from 'jspdf'
import { ARTIFACTS, MUSEUM } from '../data/artifacts'

const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MARGIN = 18

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Could not load artifact image: ${src}`))
    image.src = src
  })
}

async function imageAsJpeg(src: string): Promise<string> {
  const image = await loadImage(src)
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth || 1200
  canvas.height = image.naturalHeight || 900
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is unavailable in this browser.')
  context.fillStyle = '#f1f3f9'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.9)
}

function addFooter(doc: jsPDF, page: number) {
  doc.setDrawColor(214, 219, 233)
  doc.line(MARGIN, 280, PAGE_WIDTH - MARGIN, 280)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(105, 111, 131)
  doc.text('Sample Museum prototype — illustrative records', MARGIN, 286)
  doc.text(String(page).padStart(2, '0'), PAGE_WIDTH - MARGIN, 286, { align: 'right' })
}

export async function buildCollectionPdf(): Promise<Blob> {
  const doc = new jsPDF({ format: 'a4', unit: 'mm', orientation: 'portrait' })
  doc.setProperties({ title: 'My Museum Collection', author: 'TRACE IV' })

  doc.setFillColor(247, 248, 252)
  doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')
  doc.setTextColor(1, 40, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('TRACE IV  ·  AUGMENTED HERITAGE', MARGIN, 28)
  doc.setDrawColor(1, 40, 255)
  doc.setLineWidth(0.6)
  doc.line(MARGIN, 35, MARGIN + 30, 35)
  doc.setTextColor(17, 19, 29)
  doc.setFontSize(31)
  doc.text('My Museum', MARGIN, 78)
  doc.text('Collection', MARGIN, 91)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(13)
  doc.setTextColor(83, 89, 108)
  doc.text(`${MUSEUM.name} · ${ARTIFACTS.length} Artifacts`, MARGIN, 105)
  doc.setFontSize(10)
  doc.text(new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date()), MARGIN, 116)
  const coverImage = await imageAsJpeg(ARTIFACTS[0].img)
  doc.addImage(coverImage, 'JPEG', 112, 134, 78, 90, undefined, 'FAST')
  doc.setFontSize(8)
  doc.setTextColor(113, 119, 137)
  doc.text('A RECORD OF YOUR VISIT', MARGIN, 263)
  addFooter(doc, 1)

  let page = 1
  for (const artifact of ARTIFACTS) {
    doc.addPage()
    page += 1
    doc.setFillColor(247, 248, 252)
    doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')
    doc.setTextColor(1, 40, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.text(`ARTIFACT  ${String(page - 1).padStart(2, '0')}`, MARGIN, 19)

    const photo = await imageAsJpeg(artifact.img)
    doc.addImage(photo, 'JPEG', MARGIN, 26, PAGE_WIDTH - MARGIN * 2, 82, undefined, 'FAST')
    if (artifact.id === 'amphora') {
      const texture = await imageAsJpeg(`${import.meta.env.BASE_URL}artifacts/amphora-texture.webp`)
      doc.addImage(texture, 'JPEG', 138, 78, 48, 37, undefined, 'FAST')
    }

    let y = 124
    doc.setTextColor(17, 19, 29)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(23)
    doc.text(artifact.name, MARGIN, y)
    y += 11
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(1, 40, 255)
    doc.text(`Material  ${artifact.material}     Region  ${artifact.region}     Period  ${artifact.period}`, MARGIN, y)
    y += 12
    doc.setTextColor(48, 52, 66)
    doc.setFontSize(11)
    const writeParagraph = (text: string, size = 11) => {
      doc.setFontSize(size)
      const lines = doc.splitTextToSize(text, PAGE_WIDTH - MARGIN * 2)
      const required = lines.length * (size * 0.48) + 6
      if (y + required > 274) {
        doc.addPage()
        page += 1
        doc.setFillColor(247, 248, 252)
        doc.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F')
        y = 24
      }
      doc.text(lines, MARGIN, y)
      y += required
    }
    writeParagraph(artifact.short)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(17, 19, 29)
    doc.text('NOTE', MARGIN, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(48, 52, 66)
    writeParagraph(artifact.note)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(17, 19, 29)
    doc.text('CONTEXT', MARGIN, y)
    y += 7
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(48, 52, 66)
    for (const paragraph of artifact.context) writeParagraph(paragraph, 10)
    addFooter(doc, page)
  }

  return doc.output('blob')
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.rel = 'noopener'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
}
