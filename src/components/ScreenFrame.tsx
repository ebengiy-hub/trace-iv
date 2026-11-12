import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import type { NavProps, ScreenId } from '../nav'

interface Props { n: ScreenId; go: NavProps['go']; children: ReactNode; footer?: ReactNode; facet?: boolean }
export default function ScreenFrame({ n, go, children, footer, facet = false }: Props) {
  const [open, setOpen] = useState(false)
  return <section className="screen-bg relative flex h-full flex-col overflow-hidden">
    {facet && <div className="facet" aria-hidden="true" />}
    <header className="relative z-20 flex h-[5.25rem] shrink-0 items-center px-6 pt-safe">
      <button type="button" onClick={() => go(1)} className="text-[.95rem] font-bold tracking-tight">Explore</button>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open screen navigation" className="ml-4 flex translate-y-1 items-center gap-[3px] p-2">
        {[0, 1, 2].map((dot) => <span key={dot} className="h-[5px] w-[5px] rounded-full bg-blue" />)}
      </button>
      <span className="ml-auto text-[1.35rem] font-light tabular-nums">0{n}</span>
      <div className="absolute bottom-0 left-6 h-[10px] w-[7px] border-l-2 border-b-2 border-blue" />
    </header>
    {n === 5 && <img src={`${import.meta.env.BASE_URL}artifacts/petals-crop.png`} alt="" aria-hidden="true" className="petals-edge pointer-events-none absolute right-0 top-[4.5rem] z-[5] h-[20rem] w-[9.5rem] object-cover object-right opacity-95" />}
    <div aria-hidden="true" className="content-glass-panel absolute inset-x-0 bottom-0 top-[5.25rem]">
      <svg className="panel-edge absolute inset-x-0 top-0 h-6 w-full overflow-visible" viewBox="0 0 390 24" preserveAspectRatio="none">
        <path className="panel-edge-highlight" d="M0 0H96 C111 0 123 14 142 14 H248 C267 14 279 0 294 0 H390" />
      </svg>
    </div>
    <div className="no-scrollbar relative z-10 min-h-0 flex-1 overflow-y-auto px-6 pb-4">{children}</div>
    {footer && <footer className="relative z-10 shrink-0 px-6 pb-safe pt-2">{footer}</footer>}
    <AnimatePresence>{open && <div className="absolute inset-0 z-40 flex items-end bg-black/20" onClick={() => setOpen(false)}>
      <motion.div role="dialog" aria-modal="true" aria-label="Choose a screen" onClick={(event) => event.stopPropagation()} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="glass w-full rounded-t-[2rem] p-6 pb-safe">
        <div className="mb-4 flex items-center justify-between"><strong className="text-lg">Explore TRACE IV</strong><button type="button" aria-label="Close navigation" onClick={() => setOpen(false)} className="rounded-full p-2"><X size={18} /></button></div>
        {(['Visit overview', 'Artifact exploration', 'Contextual Q&A', 'Saved collection', 'Save & share'] as const).map((label, index) => <button key={label} type="button" onClick={() => { go((index + 1) as ScreenId); setOpen(false) }} className="flex w-full items-center border-t border-slate-200/70 py-3 text-left"><span className="mr-4 text-sm text-slate-500">0{index + 1}</span><span className="font-medium">{label}</span></button>)}
      </motion.div>
    </div>}</AnimatePresence>
  </section>
}

export { ScreenFrame }
