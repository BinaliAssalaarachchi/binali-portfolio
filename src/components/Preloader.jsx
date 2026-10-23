import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const STATUS_SEQUENCE = [
  'INITIALISING PORTFOLIO',
  'LOADING PROJECTS // LAP 01',
  'READY TO EXPLORE',
]

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('grid')
  const [status, setStatus] = useState(STATUS_SEQUENCE[0])
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(() => setPhase('exit'), 250)
      return () => clearTimeout(timer)
    }

    const timers = [
      setTimeout(() => {
        setPhase('identity')
        setStatus(STATUS_SEQUENCE[1])
      }, 950),
      setTimeout(() => setStatus(STATUS_SEQUENCE[2]), 1900),
      setTimeout(() => setPhase('exit'), 2800),
    ]

    return () => timers.forEach(clearTimeout)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (phase !== 'exit') return undefined
    const timer = setTimeout(() => onComplete?.(), shouldReduceMotion ? 150 : 650)
    return () => clearTimeout(timer)
  }, [phase, onComplete, shouldReduceMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[100001] flex items-center justify-center overflow-hidden bg-[#08090b] px-6 text-white"
      initial={{ opacity: 1, y: 0 }}
      animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
      transition={shouldReduceMotion ? { duration: 0.2 } : { duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 motorsport-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 race-stripe" />

      <div className="relative w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
          <span>BINALI // PORTFOLIO</span>
          <span className="text-race-red">PORTFOLIO LOADING</span>
        </div>

        <div className="relative overflow-hidden border-y border-white/15 bg-white/[0.02] py-10">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 110" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 82 C145 82 138 25 270 25 S388 88 500 67 S640 18 800 32" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="5 8" />
            <motion.path d="M0 82 C145 82 138 25 270 25 S388 88 500 67 S640 18 800 32" fill="none" stroke="var(--color-petrol)" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: phase === 'exit' ? 1 : phase === 'identity' ? 0.72 : 0.34 }} transition={{ duration: shouldReduceMotion ? 0.2 : 1.8, ease: 'easeInOut' }} />
          </svg>
          <motion.div
            className="absolute h-2.5 w-2.5 rounded-full border-2 border-race-red bg-[#08090b] shadow-[0_0_16px_rgba(225,6,0,0.7)]"
            initial={{ left: '0%', top: '72%' }}
            animate={{ left: phase === 'exit' ? '98%' : phase === 'identity' ? '70%' : '34%', top: phase === 'exit' ? '28%' : phase === 'identity' ? '39%' : '24%' }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.8, ease: 'easeInOut' }}
          />
          <div className="relative flex items-end justify-between px-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            <span><i className="mr-2 inline-block h-2 w-2 rounded-full bg-white/40" />START</span>
            <span className="text-petrol">LAP 01 // CURRENT POSITION</span>
            <span>CURRENT</span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-petrol">Portfolio // Current Run</p>
            <motion.h1
              className="font-display text-[clamp(3.2rem,10vw,7rem)] font-semibold uppercase leading-[0.85] tracking-[-0.03em]"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: phase === 'grid' ? 0 : 1, x: phase === 'grid' ? -24 : 0 }}
              transition={{ duration: 0.55 }}
            >
              Binali A.
            </motion.h1>
          </div>
          <motion.div
            className="border-l-2 border-race-red pl-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-white/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'grid' ? 0 : 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            Artificial Intelligence<br />
            Software Engineering
          </motion.div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
          <span>{status}</span>
          <span>01 / 03</span>
        </div>
      </div>
    </motion.div>
  )
}
