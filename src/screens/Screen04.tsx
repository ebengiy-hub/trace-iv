import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { ARTIFACTS, byId } from '../data/artifacts'
import { NavProps } from '../nav'
import { ScreenFrame } from '../components/ScreenFrame'
import PillButton from '../components/PillButton'

export default function Screen04({ go, artifactId, selectArtifact }: NavProps) {
  const selected = byId(artifactId) ?? ARTIFACTS[0]
  const [filter, setFilter] = useState('This Visit')
  const reduceMotion = useReducedMotion()
  const visibleArtifacts = useMemo(() => ARTIFACTS.filter((item) => filter === 'This Visit' || item.category === filter), [filter])
  const tiles = visibleArtifacts.filter((item) => item.id !== selected.id)

  return <ScreenFrame n={4} go={go} facet footer={
    <PillButton variant="dark" onClick={() => go(5)} icon={<ArrowRight size={18} />} className="w-full">SHARE COLLECTION</PillButton>
  }>
    <div className="no-scrollbar flex h-full min-h-0 flex-col overflow-y-auto pb-3 pt-3">
      <div className="filter-row mb-3 flex shrink-0 gap-2 overflow-x-auto no-scrollbar">
        {['This Visit', 'Ceramics', 'Stone', 'Metal'].map((name) => <button key={name} onClick={() => setFilter(name)} aria-pressed={filter === name}
          className={`shrink-0 rounded-full px-3 py-1.5 text-[.68rem] font-semibold transition-colors ${filter === name ? 'blue-shadow bg-blue text-white' : 'border border-white/85 bg-white/65 text-slate shadow-sm'}`}>{name}</button>)}
      </div>
      <div className="relative mb-3 shrink-0">
        <div aria-hidden className="pointer-events-none absolute -right-6 top-12 z-0 h-28 w-20 opacity-70">
          <img src={`${import.meta.env.BASE_URL}artifacts/petals-crop.png`} alt="" className="petals-bleed h-full w-full object-cover object-right" />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.button key={selected.id} layoutId={`artifact-${selected.id}`} type="button" onClick={() => go(2)}
            initial={reduceMotion ? false : { opacity: 0, scale: .97, y: 7 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .985 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="glass relative z-10 block w-[calc(100%-0.5rem)] overflow-hidden rounded-[1rem] text-left focus-visible:outline-2 focus-visible:outline-blue">
            <div className="relative flex h-[9.35rem] items-center justify-center">
              <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-blue" />
              <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-blue" />
              <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-blue" />
              <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-blue" />
              <img src={selected.img} alt={selected.name} className="amphora-feather h-[8.7rem] w-[83%] object-contain drop-shadow-[0_.45rem_.45rem_rgba(25,30,50,.2)]" />
            </div>
            <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-0.5">
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-[1.04rem] font-extrabold leading-tight">{selected.name}</h2>
                <p className="truncate text-[.72rem] font-medium text-slate">Added to your collection</p>
                <p className="mt-1 truncate text-[.65rem] text-slate/85">{selected.period} · {selected.material} · {selected.region}</p>
              </div>
              <span className="pill-shadow inline-flex shrink-0 items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-[.6rem] font-extrabold text-[#17171a]">SAVED <Check size={12} strokeWidth={3} /></span>
            </div>
          </motion.button>
        </AnimatePresence>
      </div>
      <p className="sr-only">{selected.short}</p>
      <div className="grid grid-cols-3 gap-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {tiles.map((item) => <motion.button key={item.id} layoutId={`artifact-${item.id}`} type="button" onClick={() => selectArtifact(item.id)}
            initial={reduceMotion ? false : { opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            aria-label={`Select ${item.name}`} className="glass-tile relative flex aspect-square min-w-0 items-center justify-center overflow-hidden rounded-[.78rem] border border-white/80 p-1.5 shadow-[0_.45rem_.75rem_-.55rem_rgba(38,48,110,.35)]">
            <img src={item.img} alt={item.name} className="h-full w-full object-contain drop-shadow-[0_.25rem_.25rem_rgba(25,30,50,.2)]" />
            <span className="absolute right-2 top-2 h-[.48rem] w-[.48rem] rounded-full bg-blue shadow-[0_0_0_2px_rgba(255,255,255,.85)]" />
          </motion.button>)}
        </AnimatePresence>
      </div>
      <div className="mt-3 glass rounded-xl px-3 py-2.5">
        <p className="text-[.72rem] font-bold">{selected.period} <span className="font-normal text-slate">· {selected.material} · {selected.region}</span></p>
        <p className="mt-0.5 text-[.67rem] leading-snug text-slate">{selected.short}</p>
      </div>
    </div>
  </ScreenFrame>
}
