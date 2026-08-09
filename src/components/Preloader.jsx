import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const STATUSES = [
  'SYSTEM CORE INITIALIZING',
  'ESTABLISHING COGNITIVE INTERFACE',
  'SYSTEM READY'
]

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('init') // 'init', 'processing', 'reveal', 'exit'
  const [status, setStatus] = useState(STATUSES[0])
  const [typedText, setTypedText] = useState('')
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion) {
      // Reduced motion fast-track
      const timer = setTimeout(() => {
        setPhase('exit')
      }, 300)
      return () => clearTimeout(timer)
    }

    // Sequence Milestones:
    // Phase 1 (0.0s - 2.0s): Robot Head outline forms
    // Phase 2 (2.0s - 3.2s): Typing simulation "Hi, I'm Binali..."
    // Phase 3 (3.2s - 6.2s): Calm Identity Reveal (Stable hold for 3.0s total)
    // Phase 4 (6.2s+): Exit transition
    const timers = [
      setTimeout(() => {
        setPhase('processing')
        setStatus(STATUSES[1])
      }, 2000),
      setTimeout(() => {
        setPhase('reveal')
        setStatus(STATUSES[2])
      }, 3200),
      setTimeout(() => {
        setPhase('exit')
      }, 6200)
    ]

    return () => timers.forEach(clearTimeout)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (phase !== 'exit') return undefined
    const exitTimer = setTimeout(() => {
      onComplete?.()
    }, shouldReduceMotion ? 200 : 850)
    return () => clearTimeout(exitTimer)
  }, [phase, onComplete, shouldReduceMotion])

  // Character typing simulation in Phase 2
  useEffect(() => {
    if (phase !== 'processing') return

    let index = 0
    const textToType = "Hi, I'm Binali!"
    setTypedText('')

    const interval = setInterval(() => {
      if (index < textToType.length) {
        setTypedText(prev => prev + textToType.charAt(index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 60)

    return () => clearInterval(interval)
  }, [phase])

  return (
    <motion.div
      className="fixed inset-0 z-[100001] flex flex-col items-center justify-center overflow-hidden bg-canvas select-none"
      initial={{ opacity: 1, y: 0 }}
      animate={phase === 'exit' ? { y: '-100%' } : { y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.25, ease: 'easeOut' }
          : { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
      }
    >
      {/* Blueprint Grid Background */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:60px_60px]" />
      )}

      <div className="relative flex flex-col items-center justify-center w-full max-w-lg px-6 h-[400px]">

        {/* Animated Robot / AI Head SVG */}
        <AnimatePresence>
          {!shouldReduceMotion && (phase === 'init' || phase === 'processing') && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
            >
              {/* Cute full-body waving robot outline */}
              <motion.svg
                className="w-48 h-48 text-white opacity-90"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {/* 1. Antenna */}
                <motion.line
                  x1="50" y1="18" x2="50" y2="10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <motion.circle
                  cx="50" cy="8" r="2.5"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                />

                {/* 2. Head */}
                <motion.rect
                  x="34" y="18" width="32" height="24" rx="6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, ease: 'easeInOut', delay: 0.1 }}
                />

                {/* 3. Ears */}
                <motion.circle
                  cx="31" cy="30" r="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                />
                <motion.circle
                  cx="69" cy="30" r="2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                />

                {/* 4. Eye nodes */}
                <motion.circle
                  cx="43" cy="28" r="3"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.9 }}
                />
                <motion.circle
                  cx="57" cy="28" r="3"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.9 }}
                />

                {/* 5. Curved smile */}
                <motion.path
                  d="M46 34 Q50 37 54 34"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 1.1 }}
                />

                {/* 6. Neck */}
                <motion.rect
                  x="47" y="42" width="6" height="4" rx="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                />

                {/* 7. Body */}
                <motion.rect
                  x="30" y="46" width="40" height="30" rx="8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
                />

                {/* 8. Screen inside chest */}
                <motion.rect
                  x="37" y="52" width="26" height="14" rx="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                />

                {/* Heartbeat pulse line inside screen */}
                <motion.path
                  d="M 40 59 L 45 59 L 48 55 L 51 63 L 54 57 L 57 59 L 60 59"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: 1.5 }}
                />

                {/* 9. Waving Left Arm */}
                <motion.path
                  d="M30 52 C 22 50, 18 42, 20 36"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                />
                <motion.circle
                  cx="20" cy="34" r="2"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6 }}
                />

                {/* 10. Right Arm */}
                <motion.path
                  d="M70 52 C 78 55, 82 62, 80 68"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                />
                <motion.circle
                  cx="80" cy="70" r="2"
                  fill="currentColor"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6 }}
                />

                {/* 11. Legs */}
                <motion.path
                  d="M40 76 L40 88 C 40 90, 36 90, 36 88"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                />
                <motion.path
                  d="M60 76 L60 88 C 60 90, 64 90, 64 88"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 1.2 }}
                />
              </motion.svg>

              {/* Console typing simulation display */}
              <div className="mt-10 font-mono text-[16px] tracking-widest text-accent h-6 select-none flex items-center gap-1.5">
                <span>{typedText}</span>
                {phase === 'processing' && (
                  <span className="w-1.5 h-4 bg-accent animate-pulse" />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Identity Reveal */}
        <AnimatePresence>
          {(phase === 'reveal' || phase === 'exit' || shouldReduceMotion) && (
            <div className="flex flex-col items-center text-center z-10">

              {/* Monospace Sublabel */}
              <motion.span
                className="font-mono text-[14px] tracking-[0.35em] text-accent uppercase font-bold mb-3"
                initial={shouldReduceMotion ? { opacity: 0 } : { filter: 'blur(8px)', opacity: 0, y: 10 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { filter: 'blur(0px)', opacity: 0.9, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                Welcome to System Console
              </motion.span>

              {/* Binali Assalaarachchi */}
              <motion.h1
                className="font-display text-[clamp(2.2rem,6vw,3.8rem)] font-extrabold leading-tight tracking-[-0.03em] text-white"
                initial={shouldReduceMotion ? { opacity: 0 } : { filter: 'blur(16px)', opacity: 0, y: 15 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                Binali Assalaarachchi
              </motion.h1>

              {/* Subtitle taglines */}
              <motion.p
                className="mt-4 font-mono text-[clamp(12px,2.2vw,14.5px)] tracking-[0.22em] text-white/50 uppercase font-semibold border-t border-white/10 pt-3 px-4"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                Software Engineering • AI • Machine Learning
              </motion.p>
            </div>
          )}
        </AnimatePresence>

        {/* Status Line */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <p className="font-mono text-[13px] tracking-widest text-white/30 uppercase font-semibold h-4 select-none">
            {status}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
