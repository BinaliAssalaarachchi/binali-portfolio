import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

export default function About() {
  const shouldReduceMotion = useReducedMotion()
  const profileRef = useRef(null)
  const [profileMouse, setProfileMouse] = useState({ x: 0, y: 0 })
  const [profileHover, setProfileHover] = useState(false)

  const handleProfileMove = (e) => {
    if (shouldReduceMotion || !profileRef.current) return
    const rect = profileRef.current.getBoundingClientRect()
    setProfileMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <section id="about" data-chapter="01 // PROFILE" className="relative overflow-hidden bg-canvas px-6 py-20 lg:px-10 lg:py-28 text-white border-t border-white/5">
      {/* Background blueprint grid */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:60px_60px]" />
      )}

      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/45">
            PROFILE.DATA
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-display font-bold leading-[1.08] tracking-[-0.03em] text-white">
            System Readout &amp; Telemetry
          </h2>
        </motion.div>

        {/* Dashboard Grid (Aligned as stretch to match heights) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left Column: Biometric Profile Card */}
          <motion.div
            ref={profileRef}
            onMouseMove={handleProfileMove}
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
            className="lg:col-span-1 relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 transition-all duration-300 hover:border-accent/40 cursor-default flex flex-col justify-between h-full"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Corner Node Crosshairs */}
            <span className="absolute top-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
            <span className="absolute top-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
            <span className="absolute bottom-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
            <span className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>

            {/* Restrained cursor glow */}
            {profileHover && !shouldReduceMotion && (
              <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(180px circle at ${profileMouse.x}px ${profileMouse.y}px, rgba(0, 102, 255, 0.06), transparent 80%)`
                }}
              />
            )}

            <div>
              {/* Telemetry Bio Label */}
              <div className="mb-4 flex items-center justify-between font-mono text-[9px] text-white/35 tracking-wider">
                <span>SYS_TELEMETRY // R_02</span>
                <span>BIO_OK</span>
              </div>

              {/* Photo frame with scanner laser line (Fills card height dynamically) */}
              <div className="relative overflow-hidden rounded-xl bg-accent/25 border border-white/5 w-full flex-grow min-h-[220px] max-h-[380px] flex items-center justify-center">
                {!shouldReduceMotion && (
                  <div className="pointer-events-none absolute inset-x-0 h-[2.5px] bg-accent opacity-80 scan-line animate-scan z-10 shadow-[0_0_8px_var(--color-accent)]" />
                )}
                <img
                  src="/me.jpg"
                  alt="Binali Assalaarachchi telemetry card"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>

            {/* Telemetry data fields list (Enlarged to 11px) */}
            <div className="mt-6 border-t border-white/10 pt-5 font-mono text-[11px] text-white/50 space-y-2 select-none">
              <div className="flex justify-between">
                <span>[SYS_UID]:</span>
                <span className="text-white font-semibold">BINALI_A</span>
              </div>
              <div className="flex justify-between">
                <span>[ROLE]:</span>
                <span className="text-accent font-bold">AI_SOFTWARE_ENG</span>
              </div>
              <div className="flex justify-between">
                <span>[CGPA]:</span>
                <span className="text-white font-bold">3.56 / 4.0</span>
              </div>
              <div className="flex justify-between">
                <span>[LOC]:</span>
                <span className="text-white">COLOMBO, LK</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-white/15 tracking-tight select-none text-[11px]">
                <span>|||||||||||||||||||||||||</span>
                <span>DATA_STREAM</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 2x2 Telemetry block grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            
            <TelemetryCard
              label="[01 // FOCUS]"
              title="Focus Areas"
              shouldReduceMotion={shouldReduceMotion}
            >
              AI &amp; Machine Learning models pipeline engineering, full-stack web platforms, and responsive cross-platform mobile apps.
            </TelemetryCard>

            <TelemetryCard
              label="[02 // STATUS]"
              title="Current Status"
              shouldReduceMotion={shouldReduceMotion}
            >
              Third-year BSc (Hons) Information Technology undergraduate at SLIIT, specialising in Artificial Intelligence. BCS Professional Graduate Diploma in IT — graduated.
            </TelemetryCard>

            <TelemetryCard
              label="[03 // BUILDING]"
              title="Building"
              shouldReduceMotion={shouldReduceMotion}
            >
              Lunelle, a deployed AI companion for PMDD-related symptom awareness, alongside CineMatch and full-stack software engineering projects.
            </TelemetryCard>

            <TelemetryCard
              label="[04 // INTERESTS]"
              title="Areas of interest"
              shouldReduceMotion={shouldReduceMotion}
            >
              AI engineering, full-stack development, recommendation systems, responsible AI API integration, and intelligent search algorithms.
            </TelemetryCard>

          </div>
        </div>
      </div>
    </section>
  )
}

function TelemetryCard({ label, title, children, shouldReduceMotion }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6.5 flex flex-col justify-between transition-all duration-300 hover:border-accent/40 group cursor-default h-full min-h-[190px]"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: shouldReduceMotion ? 0.25 : 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Corner crosshair nodes */}
      <span className="absolute top-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
      <span className="absolute top-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
      <span className="absolute bottom-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
      <span className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>

      {/* Restrained cursor-following mask glow */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(160px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 102, 255, 0.06), transparent 80%)`
          }}
        />
      )}

      <div>
        {/* Monospace tags enlarged to 10px */}
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent block mb-2">
          {label}
        </span>
        {/* Titles enlarged to base/lg */}
        <h3 className="mb-3 text-base md:text-lg font-display font-bold uppercase tracking-wider text-white">
          {title}
        </h3>
      </div>
      
      {/* Descriptions enlarged to sm (14px) and white/75 contrast */}
      <p className="text-sm leading-relaxed text-white/75 mt-auto">
        {children}
      </p>
    </motion.article>
  )
}
