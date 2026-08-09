import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const leadershipData = [
  {
    role: 'Organizing Committee Vice President (Marketing)',
    organisation: "AIESEC in SLIIT — Kokila Rawaya'25",
    period: '2025',
    description: "Led the marketing committee for a major AIESEC national event; managed the team, coordinated campaigns, and drove stakeholder engagement.",
  },
  {
    role: 'MXP Marketing Team Leader',
    organisation: 'AIESEC in SLIIT',
    period: 'Jul 2025 – Jan 2026',
    description: 'Led the Marketing Experience Programme team, managing marketing strategy and execution for exchange programs.',
  },
  {
    role: 'Campaign Coordinator — Outgoing Global Teacher (OGTe)',
    organisation: 'AIESEC in SLIIT',
    period: 'Jul 2025 – Jan 2026',
    description: 'Coordinated outbound teacher exchange campaigns, managing outreach and participant communications.',
  },
  {
    role: 'Member (Volunteer)',
    organisation: 'Leo Club of SLIIT',
    period: '2025 – Present',
    description: 'Active volunteer contributing to community service initiatives.',
  },
  {
    role: 'Founder & Designer',
    organisation: 'Graphic Gurus',
    period: 'FOUNDER',
    description: 'Founded and runs a graphic design brand.',
    website: 'https://graphicgurus.mystrikingly.com',
  },
]

export default function Leadership() {
  const shouldReduceMotion = useReducedMotion()
  const [hoveredIdx, setHoveredIdx] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 35 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="experience" className="relative overflow-hidden bg-canvas px-6 py-20 lg:px-10 lg:py-28 text-white border-t border-white/5">
      {/* Blueprint Grid Background */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255, 255, 255, 0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255, 255, 255, 0.7)_1px,transparent_1px)] [background-size:60px_60px]" />
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
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            EXPERIENCE
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-display font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Leadership &amp; Involvement
          </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative pl-8 md:pl-12 ml-2 md:ml-4 select-none">
          
          {/* Vertical timeline line */}
          <div className="absolute left-[7px] top-6 bottom-6 w-[1.5px] bg-white/10" />

          <motion.div 
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
          >
            {leadershipData.map((item, index) => {
              const isHovered = hoveredIdx === index

              return (
                <motion.div
                  key={index}
                  className="relative"
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Timeline Dot Node */}
                  <div 
                    className={`absolute -left-[32px] md:-left-[48px] top-7 w-3 h-3 rounded-full border transition-all duration-300 z-10 ${
                      isHovered
                        ? 'bg-accent border-accent shadow-[0_0_10px_var(--color-accent)] scale-125'
                        : 'bg-canvas border-white/35 scale-100'
                    }`}
                  />
                  {/* Pulsing Node Halo on Hover */}
                  {isHovered && !shouldReduceMotion && (
                    <span className="absolute -left-[36px] md:-left-[52px] top-[24px] w-5 h-5 rounded-full bg-accent/20 animate-ping z-0 pointer-events-none" />
                  )}

                  {/* Glassmorphic Milestone Card */}
                  <motion.div
                    className={`rounded-2xl border bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 relative overflow-hidden transition-all duration-300 ${
                      isHovered ? 'border-accent/40 bg-white/[0.04]' : 'border-white/10'
                    }`}
                    animate={isHovered && !shouldReduceMotion ? { x: 4, y: -2 } : { x: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Corner Crosshairs node decorations */}
                    <span className="absolute top-2 left-2 font-mono text-[8px] text-white/15 pointer-events-none select-none">+</span>
                    <span className="absolute top-2 right-2 font-mono text-[8px] text-white/15 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-2 left-2 font-mono text-[8px] text-white/15 pointer-events-none select-none">+</span>
                    <span className="absolute bottom-2 right-2 font-mono text-[8px] text-white/15 pointer-events-none select-none">+</span>

                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 relative z-10">
                      <div className="space-y-2">
                        <h3 className={`text-lg md:text-xl font-display font-bold leading-snug tracking-tight transition-colors duration-300 ${
                          isHovered ? 'text-accent' : 'text-white'
                        }`}>
                          {item.role}
                        </h3>
                        {item.organisation && (
                          <p className="text-white/60 font-mono text-xs tracking-wider">
                            {item.organisation}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-white/50 text-sm leading-relaxed mt-4 border-t border-white/5 pt-3">
                            {item.description}
                          </p>
                        )}

                        {/* Optional Website Link */}
                        {item.website && (
                          <div className="pt-3">
                            <a
                              href={item.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 hover:underline transition-colors"
                            >
                              <span>Visit Website</span>
                              <span className="font-mono text-[10px] text-white/40">({item.website.replace('https://', '')})</span>
                              <span>&rarr;</span>
                            </a>
                          </div>
                        )}
                      </div>
                      
                      {/* Technical Date Label */}
                      <div className="shrink-0 sm:text-right">
                        <span className={`font-mono text-[9.5px] uppercase tracking-widest border px-3 py-1.5 rounded-lg inline-block transition-colors duration-300 ${
                          isHovered 
                            ? 'text-accent border-accent/25 bg-accent/5' 
                            : 'text-white/40 border-white/10 bg-white/5'
                        }`}>
                          [ {item.period} ]
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
