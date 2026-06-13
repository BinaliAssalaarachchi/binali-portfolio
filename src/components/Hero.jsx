import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ScrollIndicator from './ScrollIndicator'

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-canvas"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,102,255,0.15),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:80px_80px]" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-sky-400">
                Available for internships
              </p>
            </div>

            <h1 className="mb-4 max-w-xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white">
              Binali Assalaarachchi
            </h1>

            <p className="text-sky-400 mb-8 text-[clamp(1rem,2.5vw,1.35rem)] font-bold uppercase tracking-[0.28em]">
              AI &amp; Software Engineering
            </p>

            <p className="mb-10 max-w-lg text-base leading-relaxed text-white/60 md:text-lg">
              AI-focused IT undergraduate engineering intelligent systems, training predictive
              models, and building full-stack applications with modern technologies.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="inline-flex items-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold tracking-wide text-shutter"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                View My Work
              </motion.a>

              <motion.a
                href="#contact"
                className="glass-panel inline-flex items-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium tracking-wide text-white"
                whileHover={{ scale: 1.04, y: -2, borderColor: 'rgba(255,255,255,0.45)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-accent/20">
              <div className="pointer-events-none absolute -inset-3 rounded-[1.35rem] holographic-ring animate-rotate-slow opacity-80" />
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]">
                <img
                  src="/me.jpg"
                  alt="Binali Assalaarachchi portrait"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml,' +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><rect fill="#0066ff" width="600" height="750"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#111" font-family="sans-serif" font-size="24" font-weight="700">Add /me.jpg</text></svg>',
                      )
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
