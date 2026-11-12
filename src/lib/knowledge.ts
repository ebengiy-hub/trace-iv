import { ARTIFACTS, byId } from '../data/artifacts'

export interface Answer {
  text: string
  source: string
}

const fallback = "I don't have a record about that for this object. Try asking about its material, period, region, use or how it was made."

/** Answers only from the sample artifact records and cautious general archaeology knowledge. */
export function answer(question: string, artifactId: string): Answer {
  const artifact = byId(artifactId)
  if (!artifact) return { text: fallback, source: 'Sample record' }
  const q = question.toLowerCase().trim()
  if (!q) return { text: fallback, source: 'Sample record' }

  if (artifactId === 'amphora' && /why.*(made|clay)|why clay|clay.*why/.test(q)) {
    return { text: 'Clay was abundant, easy to shape, and became durable after firing—ideal for storage and transport.', source: 'Sample record' }
  }

  let text: string | undefined
  if (/handle|two.hand|carry|carried/.test(q)) {
    text = artifact.context.find((line) => /handle/i.test(line))
  } else if (/use|store|storage|transport|hold|contain|drink|serve|wear|purpose/.test(q)) {
    text = artifact.context.find((line) => /used|held|storage|transport|drinking|serving|worn|purpose|offering/i.test(line)) ?? artifact.short
  } else if (/period|age|when|old|date/.test(q)) {
    text = `This sample record places the ${artifact.name.toLowerCase()} in the ${artifact.period}.`
  } else if (/region|where|origin|found|from/.test(q)) {
    text = `The sample record lists ${artifact.region} as the region for this ${artifact.name.toLowerCase()}.`
  } else if (/how.*(made|shape|form)|made|wheel|potter|craft|carv|strike|mould/.test(q)) {
    text = artifact.context.find((line) => /wheel|shap|carv|struck|mould|press/i.test(line))
  } else if (/size|large|small|dimension/.test(q)) {
    text = artifact.note
  } else if (/material|clay|stone|metal|what.*made/.test(q)) {
    text = `The recorded material is ${artifact.material}. ${artifact.short}`
  }

  if (!text) {
    const words = q.match(/[a-z]+/g) ?? []
    const ranked = artifact.context.map((line) => ({ line, score: words.filter((word) => word.length > 3 && line.toLowerCase().includes(word)).length }))
      .sort((a, b) => b.score - a.score)
    if (ranked[0]?.score) text = ranked[0].line
  }
  return { text: text ?? fallback, source: text ? 'Sample record' : 'Sample record' }
}

export function suggestedQuestions(artifactId: string): string[] {
  const artifact = byId(artifactId) ?? ARTIFACTS[0]
  return [`What is it made of?`, `What was it used for?`, `Where is it from?`, `How was it made?`]
    .filter((question) => question !== 'How was it made?' || artifact.context.some((line) => /wheel|shap|carv|struck|mould|press/i.test(line)))
}
