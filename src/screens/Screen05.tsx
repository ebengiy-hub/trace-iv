import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDownToLine, ArrowRight, Check, ChevronLeft, LoaderCircle, Mail, X } from 'lucide-react'
import type { NavProps } from '../nav'
import { buildCollectionPdf, downloadBlob } from '../lib/pdf'
import { isValidEmail, sendToEmail } from '../lib/email'
import ScreenFrame from '../components/ScreenFrame'

type SaveState = 'idle' | 'loading' | 'saved' | 'error'

export default function Screen05({ go }: NavProps) {
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [emailOpen, setEmailOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [emailState, setEmailState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const savePdf = async () => {
    setSaveState('loading')
    try {
      const blob = await buildCollectionPdf()
      downloadBlob(blob, 'TRACE-IV-My-Collection.pdf')
      setSaveState('saved')
    } catch {
      setSaveState('error')
    }
  }

  const submitEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isValidEmail(email)) return
    setEmailState('loading')
    setMessage('')
    try {
      const blob = await buildCollectionPdf()
      const result = await sendToEmail(email.trim(), blob)
      setMessage(result === 'shared'
        ? "Shared via your device's share sheet"
        : 'PDF downloaded and your email app opened — attach the file to send it')
      setEmailState('idle')
      setEmailOpen(false)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setEmailState('idle')
        return
      }
      setMessage('Could not prepare the PDF. Please try again.')
      setEmailState('error')
    }
  }

  return (
    <ScreenFrame n={5} go={go}>
      <main className="relative flex h-full min-h-0 flex-col overflow-y-auto pb-safe pt-[1.6rem]">
        <header className="relative z-10 pr-8">
          <h1 className="max-w-[17rem] text-[1.85rem] font-semibold leading-[1.03] tracking-[-0.055em]">SAVE YOUR<br />COLLECTION</h1>
          <p className="mt-3 max-w-[70%] text-[0.9rem] leading-[1.35] text-slate">Keep a record of the artifacts you've explored during your visit.</p>
        </header>

        <motion.div className="relative z-10 mx-auto mt-3 flex h-[14.5rem] w-[74%] max-w-[16rem] shrink-0 items-center justify-center" animate={{ y: [0, -5, 0], rotate: [0, 0.25, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
          <div className="absolute h-[14rem] w-[10.8rem] translate-x-5 translate-y-3 rotate-[11deg] rounded-[1.1rem] border border-white/90 bg-white/55 shadow-[0_1rem_2rem_-1rem_rgba(30,40,100,.28)]" />
          <div className="absolute h-[14rem] w-[10.8rem] translate-x-2 translate-y-1 rotate-[6deg] rounded-[1.1rem] border border-white/90 bg-white/70 shadow-[0_1rem_2rem_-1rem_rgba(30,40,100,.28)]" />
          <div className="glass relative h-[14.2rem] w-[11rem] -rotate-[3deg] rounded-[1.1rem] px-4 pt-4 shadow-[0_1.2rem_2rem_-1rem_rgba(30,40,100,.35)]">
            <span className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold shadow-sm">PDF</span>
            <span className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-blue" />
            <span className="absolute bottom-[4.5rem] left-3 h-3 w-3 border-b-2 border-l-2 border-blue" />
            <img src={`${import.meta.env.BASE_URL}artifacts/amphora.webp`} alt="Amphora" className="mx-auto mt-3 h-[6.3rem] w-[6.8rem] object-contain" />
            <p className="mt-2 text-[0.95rem] font-semibold italic leading-tight">My Museum<br />Collection</p>
            <p className="mt-1 text-[0.62rem] leading-tight">Archaeology Museum · 7 Artifacts</p>
          </div>
        </motion.div>

        <div className="relative z-10 mt-1 space-y-2 pb-2">
          <AnimatePresence mode="wait">
            {message && <motion.p key={message} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl px-2 text-center text-xs text-blue" role="status">{message}</motion.p>}
          </AnimatePresence>
          <button type="button" onClick={savePdf} disabled={saveState === 'loading'} className="glass flex min-h-[4.25rem] w-full items-center gap-3 rounded-[1.15rem] px-3 text-left transition active:scale-[.985] disabled:opacity-70">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/80 text-blue shadow-sm">
              {saveState === 'loading' ? <LoaderCircle className="animate-spin" size={23} /> : saveState === 'saved' ? <Check size={23} /> : <ArrowDownToLine size={24} />}
            </span>
            <span className="min-w-0 flex-1"><strong className="block text-[0.91rem] font-semibold">{saveState === 'loading' ? 'Preparing PDF…' : saveState === 'saved' ? 'Saved ✓' : saveState === 'error' ? 'Could not save PDF' : 'Save as PDF'}</strong><span className="block text-[0.72rem] text-slate">{saveState === 'error' ? 'Tap to try again' : 'Download to your gallery'}</span></span>
            {saveState !== 'loading' && <ArrowRight size={20} />}
          </button>
          <button type="button" onClick={() => { setEmailOpen(true); setMessage('') }} className="glass flex min-h-[4.25rem] w-full items-center gap-3 rounded-[1.15rem] px-3 text-left transition active:scale-[.985]">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/80 text-blue shadow-sm"><Mail size={24} /></span>
            <span className="min-w-0 flex-1"><strong className="block text-[0.91rem] font-semibold">Send to My Email</strong><span className="block text-[0.72rem] text-slate">Get a PDF copy in your inbox</span></span><ArrowRight size={20} />
          </button>
          <button type="button" onClick={() => go(1)} className="mx-auto flex items-center gap-1 py-1 text-xs text-slate"><ChevronLeft size={14} />Back to start</button>
        </div>

        <AnimatePresence>
          {emailOpen && <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/25 p-3 pb-safe backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEmailOpen(false)}>
            <motion.form onSubmit={submitEmail} className="glass w-full max-w-md rounded-[1.5rem] p-5" initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} onClick={(event) => event.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-semibold">Send your collection</h2><p className="text-xs text-slate">Choose Mail from the share options, or continue with your email app.</p></div><button type="button" aria-label="Close" onClick={() => setEmailOpen(false)} className="rounded-full p-2"><X size={18} /></button></div>
              <label htmlFor="collection-email" className="mb-1 block text-xs font-medium">Email address</label>
              <input id="collection-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-white bg-white/80 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue/30" />
              {emailState === 'error' && <p className="mt-2 text-xs text-red-700" role="alert">Could not prepare the PDF. Please try again.</p>}
              <button type="submit" disabled={!isValidEmail(email) || emailState === 'loading'} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-blue py-3 text-sm font-semibold text-white disabled:opacity-50">{emailState === 'loading' && <LoaderCircle className="animate-spin" size={17} />}{emailState === 'loading' ? 'Preparing…' : 'Send'}</button>
            </motion.form>
          </motion.div>}
        </AnimatePresence>
      </main>
    </ScreenFrame>
  )
}
