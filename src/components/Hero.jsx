import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import ScrollIndicator from './ScrollIndicator'

export default function Hero() {
  const sectionRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallex scroll transformations (disabled in reduced-motion mode)
  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '28%'])
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], shouldReduceMotion ? [1, 1] : [1, 0.2])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-canvas"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 motorsport-grid"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,161,156,0.14),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.04),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:80px_80px]" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity }} className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          
          {/* Main Info Columns */}
          <div>
            
            {/* Staggered Element 1: Console status log block (0.1s Delay) */}
            <motion.div
              className="mb-8 flex flex-col font-mono text-[11px] text-white/40 gap-1.5 tracking-widest select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-accent font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
                </span>
                <span>[SYS_STATUS]: AVAILABLE FOR INTERNSHIPS</span>
              </div>
            </motion.div>

            {/* Staggered Element 2: Identity Headings (0.35s Delay) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(16px)' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 1.0, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0.05 : 0.35 }}
            >
              <h1 className="mb-4 max-w-xl text-[clamp(2.5rem,6vw,4.5rem)] font-display font-bold leading-[1.02] tracking-[-0.03em] text-white">
                Binali Assalaarachchi
              </h1>

              <p className="text-accent mb-8 text-[clamp(1rem,2.5vw,1.35rem)] font-display font-bold uppercase tracking-[0.28em]">
                AI &amp; Software Engineering
              </p>
            </motion.div>

            {/* Staggered Element 3: Paragraph Description (0.6s Delay) */}
            <motion.p
              className="mb-10 max-w-lg text-base leading-relaxed text-white/60 md:text-lg"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, delay: shouldReduceMotion ? 0.1 : 0.6 }}
            >
              Third-year IT undergraduate specialising in Artificial Intelligence, with hands-on
              experience building AI-enabled products and full-stack software for academic and personal projects.
            </motion.p>

            {/* Staggered Element 4: Action CTAs (0.85s Delay) */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, delay: shouldReduceMotion ? 0.15 : 0.85 }}
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 hover:border-accent hover:bg-accent/10 px-8 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,161,156,0.25)] focus:outline-none cursor-pointer group"
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <span>View My Work</span>
                <motion.span
                  className="font-bold inline-block"
                  variants={{ hover: { x: 4 } }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  &rarr;
                </motion.span>
              </motion.a>

              <motion.a
                href="#contact"
                className="glass-panel inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] px-8 py-3.5 text-sm font-medium tracking-wide text-white/80 hover:text-white transition-all duration-300 focus:outline-none cursor-pointer group"
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <span>Contact</span>
                <motion.span
                  className="font-bold inline-block"
                  variants={{ hover: { x: 4 } }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  &rarr;
                </motion.span>
              </motion.a>

              <motion.a
                href="/Binali_Assalaarachchi_CV.pdf"
                download="Binali_Assalaarachchi_CV.pdf"
                className="glass-panel inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] px-8 py-3.5 text-sm font-medium tracking-wide text-white/80 hover:text-white transition-all duration-300 focus:outline-none cursor-pointer group"
                whileHover="hover"
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <span>Download CV</span>
                <motion.span
                  className="font-bold inline-block"
                  variants={{ hover: { y: 2 } }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  &darr;
                </motion.span>
              </motion.a>
            </motion.div>
          </div>

          {/* Portrait Container with Scanning Laser (0.6s Delay) */}
          <motion.div
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px]"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 1, ease: [0.22, 1, 0.36, 1], delay: shouldReduceMotion ? 0.1 : 0.6 }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-accent/20">
              <div className="pointer-events-none absolute -inset-3 rounded-[1.35rem] holographic-ring animate-rotate-slow opacity-80" />
              
              {/* Inner frame containing image and laser line */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]">
                
                {/* Horizontal scanner light overlay */}
                {!shouldReduceMotion && (
                  <div className="pointer-events-none absolute inset-x-0 h-[2.5px] bg-accent opacity-80 scan-line animate-scan z-10 shadow-[0_0_8px_var(--color-accent)]" />
                )}

                <img
                  src="/me.jpg"
                  alt="Binali Assalaarachchi portrait"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml,' +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><rect fill="#08090b" width="600" height="750"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#00a19c" font-family="sans-serif" font-size="24" font-weight="700">Add /me.jpg</text></svg>',
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
