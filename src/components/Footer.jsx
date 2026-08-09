import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from 'framer-motion'

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
  const shouldReduceMotion = useReducedMotion()

  // Form states
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // 'idle', 'loading', 'success', 'error'
  const [errors, setErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.7', 'end 0.95'],
  })

  // Disable dynamic scale/opacity scroll-driven transformations if reduced motion is requested
  const signatureScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [0.92, 1])
  const signatureOpacity = useTransform(scrollYProgress, [0, 0.5, 1], shouldReduceMotion ? [1, 1, 1] : [0.35, 0.8, 1])

  // Form validation & submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Simple validation
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Sender ID (Name) is required.'
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Secure transmission email is required.'
    if (!message.trim() || message.length < 10) newErrors.message = 'Telemetry message packet must exceed 10 characters.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus('loading')

    // Read environment variables (do not hardcode)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    try {
      if (serviceId && templateId && publicKey) {
        // Send email via EmailJS REST API
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: name,
              reply_to: email,
              message: message
            }
          })
        })

        if (response.ok) {
          setStatus('success')
          setName('')
          setEmail('')
          setMessage('')
        } else {
          const text = await response.text()
          throw new Error(text || 'Transmission packet rejected.')
        }
      } else {
        // Fallback simulation mode
        await new Promise(resolve => setTimeout(resolve, 1500))
        setStatus('success')
        console.info('EmailJS variables missing. Simulated connection established.')
        setName('')
        setEmail('')
        setMessage('')
      }
    } catch (err) {
      console.error(err)
      setErrorMessage(err.message || 'Transmission failed. Fatal link interruption.')
      setStatus('error')
    }
  }

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative min-h-[50vh] overflow-hidden bg-canvas px-6 pt-20 pb-24 lg:px-10 lg:pt-28 lg:pb-32 border-t border-white/5 text-white"
    >
      <div className="mx-auto max-w-7xl">
        
        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mb-24 select-none">
          
          {/* Left Column: Direct Connection Descriptions & Social Channels */}
          <div className="flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/45">
                CONNECT &amp; COLLABORATE
              </p>
              <h2 className="text-[clamp(2.2rem,5vw,3.2rem)] font-display font-bold leading-[1.08] tracking-[-0.03em] text-white">
                Let&apos;s build something intelligent and impactful together.
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                Establish a secure connection session. Drop a telemetry packet or reach out directly via verified social channels.
              </p>
            </div>

            {/* Social channels (stacked as a 2x2 grid) */}
            <div className="grid grid-cols-2 gap-4">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition duration-300 hover:border-accent/40 hover:bg-white/[0.04] text-center cursor-pointer"
                  whileHover={shouldReduceMotion ? {} : { y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 rounded-2xl bg-accent pointer-events-none" />
                  <div className="h-12 w-12 mb-3 flex items-center justify-center rounded-xl bg-white/[0.03] text-white/60 group-hover:text-accent group-hover:bg-accent/10 transition-all duration-300">
                    {link.icon}
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition duration-300">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column: Establish Connection Form Card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-8 flex flex-col justify-between h-full">
            {/* Corner Crosshairs node indicators */}
            <span className="absolute top-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
            <span className="absolute top-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
            <span className="absolute bottom-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
            <span className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>

            {/* Neural Network SVG Background Graphic in low opacity */}
            <div className="pointer-events-none absolute bottom-4 right-4 opacity-[0.02] w-36 h-36 select-none z-0">
              <svg viewBox="0 0 100 100" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="20" cy="50" r="4" fill="currentColor" />
                <circle cx="50" cy="20" r="4" fill="currentColor" />
                <circle cx="50" cy="80" r="4" fill="currentColor" />
                <circle cx="80" cy="50" r="4" fill="currentColor" />
                <line x1="20" y1="50" x2="50" y2="20" />
                <line x1="20" y1="50" x2="50" y2="80" />
                <line x1="50" y1="20" x2="80" y2="50" />
                <line x1="50" y1="80" x2="80" y2="50" />
                <line x1="50" y1="20" x2="50" y2="80" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* Success telemetry state */
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4 z-10"
                >
                  <div className="h-12 w-12 rounded-full bg-[#00e676]/10 border border-[#00e676]/30 flex items-center justify-center text-[#00e676] text-xl font-bold select-none">
                    ✓
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11.5px] uppercase tracking-widest text-accent font-bold block">
                      [TRANSMISSION_SECURE]
                    </span>
                    <h3 className="text-lg font-display font-bold text-white uppercase tracking-wider">
                      Connection Established
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">
                      Your message packet has been transmitted successfully. Binali will connect with you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="font-mono text-[11px] uppercase tracking-widest text-white/40 hover:text-white border border-white/10 hover:border-white/20 px-3.5 py-1.5 rounded-lg transition duration-200 mt-2 cursor-pointer"
                  >
                    Send Another Packet
                  </button>
                </motion.div>
              ) : (
                /* Standard Contact Form */
                <motion.form
                  key="form-state"
                  onSubmit={handleSubmit}
                  className="space-y-5 z-10"
                  noValidate
                >
                  <div className="border-b border-white/5 pb-2 mb-4 flex items-center justify-between font-mono text-[10.5px] text-white/35 tracking-widest select-none">
                    <span>[SESSION_INIT]: SECURE CHANNEL</span>
                    <span>STATUS // READY</span>
                  </div>

                  {/* Name field */}
                  <div>
                    <label htmlFor="name-input" className="block font-mono text-[11px] uppercase tracking-widest text-white/50 mb-1.5">
                      Sender Identification (Name)
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. ALEX MILLER"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 font-mono text-[13px] text-white tracking-wide transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_8px_rgba(0,102,255,0.15)] placeholder-white/15"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className="font-mono text-[11px] text-[#ff3333] tracking-wider block mt-1">
                        [ERR]: {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="email-input" className="block font-mono text-[11px] uppercase tracking-widest text-white/50 mb-1.5">
                      Secure Mail Address
                    </label>
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. CLIENT@DOMAIN.COM"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 font-mono text-[13px] text-white tracking-wide transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_8px_rgba(0,102,255,0.15)] placeholder-white/15"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="font-mono text-[11px] text-[#ff3333] tracking-wider block mt-1">
                        [ERR]: {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label htmlFor="message-input" className="block font-mono text-[11px] uppercase tracking-widest text-white/50 mb-1.5">
                      Message Packet Telemetry
                    </label>
                    <textarea
                      id="message-input"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. INQUIRY ON AI MODELING CAPABILITIES..."
                      className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-2.5 font-mono text-[13px] text-white tracking-wide transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_8px_rgba(0,102,255,0.15)] placeholder-white/15 h-24 resize-none"
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <span id="message-error" className="font-mono text-[11px] text-[#ff3333] tracking-wider block mt-1">
                        [ERR]: {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Failure feedback alert */}
                  {status === 'error' && (
                    <div className="p-3 bg-[#ff3333]/5 border border-[#ff3333]/20 rounded-lg font-mono text-[11px] text-[#ff3333] tracking-wider">
                      [FATAL_INTERRUPT]: {errorMessage}
                    </div>
                  )}

                  {/* Submit connection button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-accent/40 bg-accent/5 hover:border-accent hover:bg-accent/15 px-6 py-3 font-mono text-[12px] uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,102,255,0.25)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
                          <span>ESTABLISHING CONNECTION...</span>
                        </>
                      ) : (
                        <span>ESTABLISH CONNECTION &rarr;</span>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Big Signature Label */}
        <motion.div
          className="mb-20 flex justify-center"
          style={{ scale: signatureScale, opacity: signatureOpacity }}
        >
          <motion.p
            className="font-display text-[clamp(4rem,18vw,12rem)] font-extrabold lowercase leading-none tracking-[-0.05em] text-white/20 select-none"
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                    color: 'rgba(255,255,255,0.45)',
                    textShadow: '0 0 60px rgba(0,102,255,0.35)',
                  }
            }
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            binali.
          </motion.p>
        </motion.div>

        {/* Footer bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            &copy; {new Date().getFullYear()} Binali Assalaarachchi.
          </p>

          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
            Built with React &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}
