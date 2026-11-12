import { useEffect, useState } from 'react'
import { Activity, AudioLines, MessageCircle, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { byId } from '../data/artifacts'
import ScreenFrame from '../components/ScreenFrame'
import PillButton from '../components/PillButton'
import type { NavProps } from '../nav'

export default function Screen02({ go, artifactId }: NavProps) {
  const artifact = byId(artifactId) ?? byId('amphora')
  const [details, setDetails] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [notice, setNotice] = useState('')
  useEffect(() => () => window.speechSynthesis?.cancel(), [])
  const narrate = () => {
    if (typeof window.speechSynthesis === 'undefined') { setNotice('Audio narration is not supported in this browser'); window.setTimeout(() => setNotice(''), 3500); return }
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return }
    const utterance = new SpeechSynthesisUtterance(`${artifact.name}. ${artifact.short} ${artifact.context.join(' ')}`)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    setSpeaking(true); window.speechSynthesis.speak(utterance)
  }
  return <ScreenFrame n={2} go={go} footer={<PillButton variant="blue" onClick={narrate} icon={<AudioLines size={20} />}>{speaking ? 'STOP NARRATION' : 'LISTEN AGAIN'}</PillButton>}>
    <div className="pt-4">
      <h1 className="text-[1.8rem] font-semibold uppercase leading-none tracking-[-.045em]">{artifact.name}</h1>
      <p className="mt-2 text-[.82rem]">{artifact.period}<span className="mx-2 text-slate-400">·</span>Sample Museum</p>
      <button type="button" aria-label={`Show details about ${artifact.name}`} onClick={()=>setDetails(true)} className="glass relative mt-3 flex h-[12.4rem] w-full items-center justify-center overflow-visible rounded-2xl">
        <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-blue"/><span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-blue"/><span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-blue"/><span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-blue"/>
        <img src={artifact.img} alt={artifact.name} className="amphora-feather h-[95%] max-w-[72%] object-contain drop-shadow-[0_12px_12px_rgba(25,30,50,.2)]" />
        {artifact.id === 'amphora' && <><span className="absolute left-[31%] top-[53%] h-4 w-4 rounded-full border-2 border-white bg-blue shadow"/><img src={`${import.meta.env.BASE_URL}artifacts/amphora-texture.webp`} alt="Close-up of the amphora's ceramic surface" className="absolute bottom-[-.35rem] right-2 h-[4.7rem] w-[6.4rem] rounded-xl border border-white object-cover shadow-lg"/></>}
      </button>
      <div className="mt-4 flex items-center gap-3">
        <div className="glass flex h-[4.1rem] w-[5.1rem] shrink-0 items-center justify-center rounded-xl text-blue"><Activity size={38} strokeWidth={1.7}/></div>
        <div className="min-w-0 flex-1"><p className="text-[.88rem] leading-snug">{artifact.short}</p><button type="button" onClick={()=>setDetails(true)} className="mt-1 text-[.78rem] font-semibold underline decoration-blue/40 underline-offset-2">VIEW DETAILS</button></div>
      </div>
      <ul className="mt-4 space-y-1 text-[.83rem] leading-snug"><li>● <b>Material:</b> {artifact.material}</li><li>● <b>Region:</b> {artifact.region}</li><li>● <b>Period:</b> {artifact.period}</li></ul>
      <p className="mt-2 rounded-full border border-white bg-white/65 px-3 py-2 text-[.8rem] leading-snug"><b>Note:</b> {artifact.note}</p>
      <button type="button" onClick={()=>go(3)} className="mt-3 flex items-center gap-2 py-1 text-xs font-medium text-slate-500"><MessageCircle size={14}/> Ask a question</button>
      {notice && <p role="status" className="mt-2 text-xs text-slate-600">{notice}</p>}
    </div>
    <AnimatePresence>{details && <div className="absolute inset-0 z-30 flex items-end bg-black/20" onClick={()=>setDetails(false)}><motion.div role="dialog" aria-modal="true" aria-label={`${artifact.name} details`} onClick={e=>e.stopPropagation()} initial={{y:35,opacity:0}} animate={{y:0,opacity:1}} exit={{y:35,opacity:0}} className="glass max-h-[75%] w-full overflow-y-auto rounded-t-[2rem] p-6 pb-safe"><div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-semibold">{artifact.name}</h2><button type="button" aria-label="Close details" onClick={()=>setDetails(false)} className="p-2"><X size={18}/></button></div>{artifact.context.map((paragraph,i)=><p key={i} className="mb-3 text-sm leading-relaxed">{paragraph}</p>)}</motion.div></div>}</AnimatePresence>
  </ScreenFrame>
}
