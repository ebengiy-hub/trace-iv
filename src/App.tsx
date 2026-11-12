import { useCallback, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ScreenId } from './nav'
import type { NavProps } from './nav'
import Intro from './components/Intro'
import Screen01 from './screens/Screen01'
import Screen02 from './screens/Screen02'
import Screen03 from './screens/Screen03'
import Screen04 from './screens/Screen04'
import Screen05 from './screens/Screen05'

export default function App() {
  // Deep link: #screen=3 (&artifact=coin, &intro=0) opens a screen directly (QR demos, testing).
  const hash = new URLSearchParams(window.location.hash.slice(1))
  const startScreen = Number(hash.get('screen'))
  const [screen, setScreen] = useState<ScreenId>(startScreen >= 1 && startScreen <= 5 ? (startScreen as ScreenId) : 1)
  const [artifactId, selectArtifact] = useState(hash.get('artifact') ?? 'amphora')
  const [ready, setReady] = useState(hash.get('intro') === '0')
  const reduced = useReducedMotion()
  const go = useCallback((next: ScreenId) => setScreen(next), [])
  const props: NavProps = { go, artifactId, selectArtifact }

  if (!ready) return <Intro onDone={() => setReady(true)} />

  const screens = [<Screen01 {...props} />, <Screen02 {...props} />, <Screen03 {...props} />, <Screen04 {...props} />, <Screen05 {...props} />]
  return <main className="min-h-[100dvh] w-full overflow-hidden bg-white sm:flex sm:items-center sm:justify-center sm:p-4">
    <div className="relative h-[100dvh] w-full overflow-hidden sm:h-[min(844px,calc(100dvh-2rem))] sm:max-w-[430px] sm:rounded-[2.5rem] sm:border sm:border-slate-200 sm:shadow-[0_24px_80px_rgba(25,34,70,.2)]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={screen} className="absolute inset-0" initial={reduced ? { opacity: 0 } : { opacity: 0, x: screen > 1 ? 16 : -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: reduced ? 0 : screen > 1 ? -12 : 12 }} transition={{ type: 'spring', stiffness: 300, damping: 32, mass: 0.8 }}>
          {screens[screen - 1]}
        </motion.div>
      </AnimatePresence>
    </div>
  </main>
}
