import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const FILL_DURATION = 1.6
const EXIT_DELAY = 0.15

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('fill')

  useEffect(() => {
    const fillTimer = setTimeout(() => setPhase('exit'), FILL_DURATION * 1000 + 400)
    return () => clearTimeout(fillTimer)
  }, [])

  useEffect(() => {
    if (phase !== 'exit') return undefined
    const exitTimer = setTimeout(() => onComplete?.(), 900)
    return () => clearTimeout(exitTimer)
  }, [phase, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100001] flex items-center justify-center overflow-hidden bg-canvas"
      initial={{ y: 0 }}
      animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
      transition={
        phase === 'exit'
          ? { duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: EXIT_DELAY }
          : { duration: 0 }
      }
    >
      <motion.div
        className="relative select-none"
        animate={
          phase === 'exit'
            ? { scale: 0.88, opacity: 0 }
            : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: EXIT_DELAY }}
      >
        <span
          className="font-display text-[clamp(3.5rem,12vw,8rem)] font-extrabold leading-none tracking-[0.08em] text-white/10"
          aria-hidden="true"
        >
          BINALI.
        </span>

        <motion.span
          className="absolute inset-0 font-display text-[clamp(3.5rem,12vw,8rem)] font-extrabold leading-none tracking-[0.08em] text-accent"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: FILL_DURATION, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Binali portfolio loading"
        >
          BINALI.
        </motion.span>
      </motion.div>
    </motion.div>
  )
}
