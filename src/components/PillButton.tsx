import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

interface Props { variant: 'dark' | 'blue'; children: ReactNode; icon?: ReactNode; onClick: () => void; className?: string; ariaLabel?: string; disabled?: boolean }
export default function PillButton({ variant, children, icon, onClick, className = '', ariaLabel, disabled }: Props) {
  const reduced = useReducedMotion()
  return <motion.button type="button" aria-label={ariaLabel} disabled={disabled} onClick={onClick} whileTap={reduced || disabled ? undefined : { scale: 0.97, transition: { type: 'spring', stiffness: 500, damping: 24 } }} className={`flex min-h-12 w-full items-center justify-center gap-3 rounded-full px-5 text-sm font-semibold tracking-wide text-white transition-colors disabled:opacity-50 ${variant === 'dark' ? 'bg-[#1a1a1a] pill-shadow' : 'bg-[#0128ff] blue-shadow'} ${className}`}>
    <span>{children}</span>{icon}
  </motion.button>
}

export { PillButton }
