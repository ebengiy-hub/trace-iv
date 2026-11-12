import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export default function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), reduced ? 250 : 2200)
    return () => window.clearTimeout(timer)
  }, [reduced])
  useEffect(() => { if (leaving) { const timer = window.setTimeout(onDone, reduced ? 80 : 420); return () => window.clearTimeout(timer) } }, [leaving, onDone, reduced])
  return <AnimatePresence><motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-white" initial={{ opacity: 1 }} animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.04 : 1 }} transition={{ duration: reduced ? 0.12 : 0.42 }}>
    <motion.div className="relative flex flex-col items-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.12 : 0.75 }}>
      <motion.div aria-hidden="true" className="absolute -inset-x-16 -inset-y-14 rounded-full bg-lime/25 blur-3xl" animate={reduced ? {} : { scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden="true" className="absolute -inset-12 rounded-full border-2 border-lime" animate={reduced ? {} : { scale: [0.86, 1.08, 0.86], opacity: [0.2, 0.65, 0.2] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
      <img src={`${import.meta.env.BASE_URL}wordmark.svg`} alt="TRACE IV" className="relative z-10 w-64 max-w-[72vw]" />
      <p className="relative z-10 mt-4 text-[.68rem] font-semibold tracking-[.42em] text-[#657400]">AUGMENTED HERITAGE</p>
      <motion.div className="relative z-10 mt-7 h-[3px] w-16 rounded-full bg-lime" animate={reduced ? {} : { width: [32, 76, 32] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} />
    </motion.div>
    {!reduced && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-lime/40 to-transparent" initial={{ x: '-30vw' }} animate={{ x: '130vw' }} transition={{ duration: 1.6, delay: 0.3, ease: 'easeInOut' }} />}
    <button type="button" onClick={() => setLeaving(true)} className="absolute bottom-10 rounded-full px-5 py-2 text-sm text-slate-500">Skip</button>
  </motion.div></AnimatePresence>
}
