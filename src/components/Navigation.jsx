import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  { id: 'hero', name: 'Home', subtitle: 'Start' },
  { id: 'about', name: 'About', subtitle: 'Profile' },
  { id: 'tech-stack', name: 'Tech Stack', subtitle: 'Tooling' },
  { id: 'process', name: 'Capabilities', subtitle: 'Methodology' },
  { id: 'projects', name: 'Projects', subtitle: 'Portfolio' },
  { id: 'skills', name: 'Skills', subtitle: 'Capabilities' },
  { id: 'education', name: 'Education', subtitle: 'Academic' },
  { id: 'experience', name: 'Experience', subtitle: 'Leadership' },
  { id: 'achievements', name: 'Certifications', subtitle: 'Credentials' },
  { id: 'contact', name: 'Contact', subtitle: 'Connectivity' },
]

const socialLinks = [
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
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  // Auto detect active section based on scroll intersection
  useEffect(() => {
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-30% 0px -50% 0px', // detects active when section occupies middle area
      threshold: 0.1,
    })

    menuItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Close menu with escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = (id) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Animation variants
  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 35,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 28,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  }

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  }

  return (
    <>
      {/* Floating Hamburger Toggle Button */}
      <motion.button
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-canvas/60 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-accent/40 hover:bg-canvas/80 focus:outline-none focus:ring-2 focus:ring-accent group"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing ring in closed state */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-accent/5 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300 pointer-events-none" />
        )}

        <div className="relative flex h-6 w-6 flex-col justify-between items-center">
          <motion.span
            className="h-[2px] w-6 rounded bg-white origin-center"
            animate={isOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="h-[2px] w-6 rounded bg-white"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="h-[2px] w-6 rounded bg-white origin-center"
            animate={isOpen ? { rotate: -45, y: -11 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Main Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              transition={{ duration: 0.4 }}
            />

            {/* Slide-in Navigation Drawer */}
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 bottom-0 z-45 w-full sm:w-[480px] bg-canvas border-l border-white/5 p-8 sm:p-12 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-y-auto overflow-x-hidden select-none"
            >
              {/* Dynamic Scanning Line */}
              <div className="pointer-events-none absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent animate-scan z-10" />

              {/* Decorative high-tech grid background inside the menu drawer */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

              {/* Drawer Header */}
              <div className="relative pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40 block mb-1">
                  Navigation Console
                </span>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                  </span>
                  <span className="font-mono text-xs text-white/70">
                    System Connected
                  </span>
                </div>
              </div>

              {/* Links Grid */}
              <div className="my-10 flex flex-col gap-4">
                {menuItems.map((item, index) => {
                  const isActive = activeSection === item.id
                  const padNum = String(index + 1).padStart(2, '0')

                  return (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      className="w-fit"
                    >
                      <button
                        onClick={() => handleLinkClick(item.id)}
                        className={`group relative flex items-baseline gap-4 py-1 text-left font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-300 focus:outline-none ${
                          isActive ? 'text-accent' : 'text-white hover:text-accent'
                        }`}
                      >
                        {/* Bullet / numbering */}
                        <span className="font-mono text-xs tracking-wider text-white/30 group-hover:text-accent/60 transition-colors">
                          {padNum}
                        </span>

                        <div className="flex flex-col">
                          <span className="relative overflow-hidden block px-2 -mx-2">
                            {/* Sliding text effect */}
                            <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                              {item.name}
                            </span>
                            <span className="absolute inset-0 px-2 block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-accent">
                              {item.name}
                            </span>
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40 group-hover:text-white/60 transition-colors mt-0.5">
                            {item.subtitle}
                          </span>
                        </div>

                        {/* Active link dot */}
                        {isActive && (
                          <motion.span
                            layoutId="activeDot"
                            className="absolute -left-3 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                    </motion.div>
                  )
                })}
              </div>

              {/* Drawer Footer */}
              <div className="relative pt-6 border-t border-white/5">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-3">
                  Direct Interfaces
                </p>
                <div className="flex items-center gap-6 mb-6">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={social.label !== 'Email' ? '_blank' : undefined}
                      rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      aria-label={`Binali's ${social.label}`}
                      className="text-white/55 hover:text-accent transition-colors duration-300"
                      whileHover={{ y: -2 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                <div className="font-mono text-[10px] text-white/30 flex justify-between items-center">
                  <span>© {new Date().getFullYear()} BINALI A.</span>
                  <span>SLIIT</span>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
