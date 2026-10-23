import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const chapters = [
  { id: 'hero', label: 'START' },
  { id: 'about', label: 'PROFILE' },
  { id: 'projects', label: 'WORK' },
  { id: 'skills', label: 'STACK' },
  { id: 'education', label: 'PATH' },
  { id: 'contact', label: 'CONTACT' },
]

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.25 })
  const markerY = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <aside className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex" aria-label="Page progress">
      <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-white/35 [writing-mode:vertical-rl]">RUN // 01</span>
      <div className="relative h-56 w-px bg-white/15">
        <motion.div className="absolute inset-x-0 top-0 origin-top bg-petrol" style={{ height: '100%', scaleY: progress }} />
        <motion.div className="absolute -left-[3px] h-2 w-2 rounded-full border border-race-red bg-[#08090b] shadow-[0_0_10px_rgba(225,6,0,0.7)]" style={{ top: markerY }} />
      </div>
      <div className="flex flex-col items-center gap-2">
        {chapters.map((chapter, index) => (
          <a key={chapter.id} href={`#${chapter.id}`} className="pointer-events-auto font-mono text-[8px] uppercase tracking-[0.12em] text-white/30 transition-colors hover:text-white" aria-label={`Go to ${chapter.label}`}>
            {String(index + 1).padStart(2, '0')}
          </a>
        ))}
      </div>
    </aside>
  )
}
