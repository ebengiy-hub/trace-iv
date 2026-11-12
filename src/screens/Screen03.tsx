import { FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowRight, Mic, Send, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ScreenFrame } from '../components/ScreenFrame'
import { NavProps } from '../nav'
import { answer, suggestedQuestions } from '../lib/knowledge'
import { byId } from '../data/artifacts'

type Message = { id: number; question: string; text: string; source: string; pending?: boolean; example?: boolean }
type SpeechResultEvent = { results: ArrayLike<ArrayLike<{ transcript: string }>> }
type SpeechRecognitionLike = {
  lang: string
  interimResults: boolean
  onstart: (() => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  onresult: ((event: SpeechResultEvent) => void) | null
  start: () => void
}

export default function Screen03({ go, artifactId }: NavProps) {
  const artifact = byId(artifactId)
  const reduceMotion = useReducedMotion()
  const [messages, setMessages] = useState<Message[]>([{
    id: 0,
    question: 'Why is it made of clay?',
    text: 'Clay was abundant, easy to shape, and became durable after firing—ideal for storage and transport.',
    source: 'Museum Archive',
    example: true,
  }])
  const [value, setValue] = useState('')
  const [sourceOpen, setSourceOpen] = useState(false)
  const [sourceMessage, setSourceMessage] = useState<Message | null>(null)
  const [listening, setListening] = useState(false)
  const [notice, setNotice] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const counter = useRef(1)

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [messages, reduceMotion])

  function submit(question: string) {
    const clean = question.trim()
    if (!clean) return
    setValue('')
    const id = counter.current++
    setMessages((current) => [...current, { id, question: clean, text: '', source: 'Sample record', pending: true }])
    window.setTimeout(() => {
      const response = answer(clean, artifactId)
      setMessages((current) => current.map((message) => message.id === id
        ? { ...message, text: response.text, source: response.source, pending: false }
        : message))
    }, reduceMotion ? 10 : 650)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submit(value)
  }

  function startVoice() {
    const speechWindow = window as Window & { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike }
    const SpeechRecognitionCtor = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition
    if (!SpeechRecognitionCtor) {
      setNotice("Voice input isn't supported in this browser — you can type your question instead.")
      window.setTimeout(() => setNotice(''), 4200)
      return
    }
    const recognition = new SpeechRecognitionCtor()
    recognition.lang = navigator.language || 'en-US'
    recognition.interimResults = false
    recognition.onstart = () => setListening(true)
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognition.onresult = (event: SpeechResultEvent) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim()
      if (transcript) {
        setValue(transcript)
        window.setTimeout(() => submit(transcript), 0)
      }
    }
    recognition.start()
  }

  return <ScreenFrame n={3} go={go} facet footer={
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2 pb-safe" aria-label="Ask about this artifact">
      <input ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)}
        onFocus={() => window.setTimeout(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }), 250)}
        placeholder="Ask something..." aria-label="Ask something" className="h-12 min-w-0 flex-1 rounded-full border border-white/90 bg-white/80 px-4 text-[.92rem] text-ink shadow-[0_.35rem_1rem_-.55rem_rgba(38,48,110,.4)] outline-none placeholder:text-slate/70 focus:ring-2 focus:ring-blue/20" />
      {value.trim() ? <button type="submit" aria-label="Send question" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue text-white blue-shadow"><Send size={18} /></button> :
        <button type="button" aria-label="Use voice input" onClick={startVoice}
          className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue text-white blue-shadow transition-transform ${listening ? 'scale-105' : ''}`}>
          {listening && <span className="absolute inset-0 animate-ping rounded-full bg-blue/30" />}<Mic size={19} className="relative" />
        </button>}
    </form>
  }>
    <div ref={listRef} className="no-scrollbar flex h-full min-h-0 flex-col gap-3 overflow-y-auto px-5 pb-4 pt-4">
      <AnimatePresence initial={false}>
        {messages.map((message) => <motion.div key={message.id} layout={!reduceMotion}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 27 }} className="flex flex-col gap-3">
          <div className="relative ml-auto flex min-h-[3.15rem] max-w-[94%] items-center overflow-hidden rounded-[1rem] bg-[#111114] pl-4 pr-[4.1rem] text-[.92rem] leading-tight text-white shadow-[0_.45rem_1rem_-.5rem_rgba(0,0,0,.48)]">
            <span className="relative z-10">{message.question}</span>
            <img src={`${import.meta.env.BASE_URL}artifacts/petals-crop.png`} alt="" className="petals-bleed absolute right-0 top-0 h-full w-[3.5rem] object-cover object-center" />
          </div>
          <div className="glass w-[94%] rounded-[1.1rem] px-4 pb-3 pt-3.5 shadow-[0_.55rem_1.1rem_-.65rem_rgba(38,48,110,.4)]">
            {message.pending ? <div className="flex h-[4.2rem] items-center gap-1.5" aria-label="Generating an answer">
              {[0, 1, 2].map((dot) => <motion.span key={dot} className="h-1.5 w-1.5 rounded-full bg-blue" animate={reduceMotion ? undefined : { y: [0, -4, 0], opacity: [.45, 1, .45] }} transition={{ duration: .85, repeat: Infinity, delay: dot * .14 }} />)}
              <span className="ml-2 text-xs text-slate">Looking through the sample record</span>
            </div> : <p className="text-[.91rem] font-medium leading-[1.28] text-[#111114]">{message.text}</p>}
            {!message.pending && <button type="button" onClick={() => { setSourceMessage(message); setSourceOpen(true) }} className="pill-shadow mt-3 inline-flex min-h-[2rem] max-w-full items-center gap-2 rounded-full border border-white bg-white/90 px-3 text-[.64rem] font-extrabold tracking-[-.02em] text-[#17171a]">
              <span className="truncate">SOURCE: {message.source.toUpperCase()}</span><ArrowRight size={15} strokeWidth={2.5} />
            </button>}
          </div>
        </motion.div>)}
      </AnimatePresence>
      <div className="mt-1 flex flex-wrap gap-1.5 pb-2">
        {suggestedQuestions(artifactId).map((question) => <button key={question} type="button" onClick={() => submit(question)} className="rounded-full border border-white/80 bg-white/55 px-3 py-1.5 text-[.68rem] font-semibold text-slate shadow-sm">{question}</button>)}
      </div>
      <p className="sr-only">Questions about {artifact?.name}</p>
    </div>
    {notice && <div role="status" className="absolute bottom-[5.5rem] left-5 right-5 rounded-xl bg-[#17171a] px-4 py-3 text-sm text-white shadow-xl">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss" className="ml-2 inline-flex align-middle"><X size={14} /></button></div>}
    <AnimatePresence>
      {sourceOpen && <motion.div className="absolute inset-0 z-20 flex items-end bg-black/15 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSourceOpen(false)}>
        <motion.section role="dialog" aria-modal="true" aria-label="About this source" className="glass w-full rounded-2xl p-5" initial={reduceMotion ? false : { y: 24 }} animate={{ y: 0 }} exit={{ y: 20 }} onClick={(event) => event.stopPropagation()}>
          <div className="mb-2 flex items-center justify-between"><h2 className="font-bold">About this source</h2><button onClick={() => setSourceOpen(false)} aria-label="Close source details"><X size={18} /></button></div>
          <p className="text-sm leading-relaxed text-slate">{sourceMessage?.example ? 'Example answer from the TRACE IV design prototype.' : `This answer uses the ${artifact?.name ?? 'object'} sample record in this prototype. It is not a museum citation.`}</p>
        </motion.section>
      </motion.div>}
    </AnimatePresence>
  </ScreenFrame>
}
