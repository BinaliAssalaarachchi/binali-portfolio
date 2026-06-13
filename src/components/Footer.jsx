import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const links = [
  {
    label: 'Email',
    href: 'mailto:binaliassalaarachchi@gmail.com?subject=Portfolio Inquiry&body=Hi Binali,',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/binali-assalaarachchi/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/BinaliAssalaarachchi',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Marketing Portfolio',
    href: 'https://drive.google.com/file/d/191EBLuiDe3Icj9m5TxSeC0oehNvngu3i/view',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
]

export default function Footer() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.95'],
  })

  const signatureScale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const signatureOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.8, 1])
  const currentYear = new Date().getFullYear()

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative min-h-[50vh] overflow-hidden bg-canvas px-6 pt-4 pb-24 lg:px-10 lg:pt-6 lg:pb-32 border-t border-white/5"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/45">
            Connect &amp; Collaborate
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Let&apos;s build something intelligent and impactful together.
          </h2>
        </motion.div>

        <div className="mb-24 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition duration-300 hover:border-accent/50 hover:bg-white/[0.04] text-center cursor-pointer"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Subtle hover background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-2xl bg-accent pointer-events-none" />
              
              {/* Icon container */}
              <div className="h-12 w-12 mb-3 flex items-center justify-center rounded-xl bg-white/[0.03] text-white/60 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                {link.icon}
              </div>
              
              {/* Label */}
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition duration-300">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          className="mb-20 flex justify-center"
          style={{ scale: signatureScale, opacity: signatureOpacity }}
        >
          <motion.p
            className="font-display text-[clamp(4rem,18vw,12rem)] font-extrabold lowercase leading-none tracking-[-0.05em] text-white/20"
            whileHover={{
              color: 'rgba(255,255,255,0.45)',
              textShadow: '0 0 60px rgba(0,102,255,0.35)',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            binali.
          </motion.p>
        </motion.div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            &copy; 2026 Binali Assalaarachchi.
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Built with React &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}
