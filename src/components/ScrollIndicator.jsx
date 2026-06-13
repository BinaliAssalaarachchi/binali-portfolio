import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
        Scroll
      </span>
      <motion.div
        className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 pt-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="block h-2 w-0.5 rounded-full bg-white/70" />
      </motion.div>
    </motion.div>
  )
}
