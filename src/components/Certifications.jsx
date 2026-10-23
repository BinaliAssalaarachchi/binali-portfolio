import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

const achievementsData = [
  {
    emoji: '📊',
    title: 'Deloitte Australia Data Analytics Job Simulation',
    issuer: 'Deloitte Australia • Forage',
    period: 'Completed',
    description: 'Completed a job simulation involving data analysis, forensic technology, Tableau dashboard creation, and Excel-based data classification and business insights generation.',
    credentialUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a45d9aa396e836fd6859389_1782965760707_completion_certificate.pdf',
    image: '/certificates/deloitte.png',
  },
  {
    emoji: '🤖',
    title: 'AI Skills Fest 2026',
    issuer: 'Microsoft',
    period: 'Completed',
    description: 'Credential verified on Credly',
    credentialUrl: 'https://www.credly.com/badges/b244660b-8616-403e-adde-b3c330fbbb3c/public_url',
    image: '/certificates/microsoft.png',
  },
  {
    emoji: '🏆',
    title: "SLIIT Faculty of Computing Dean's List",
    issuer: 'Sri Lanka Institute of Information Technology',
    period: 'Year 1 Semester 2',
    description: 'Academic recognition for outstanding performance.',
    image: '/certificates/sliit_deans_list.jpg',
  },
  {
    emoji: '🚀',
    title: 'Ascentic AI Launch Pad — Top 50 Participant',
    issuer: 'Ascentic',
    period: 'Completed',
    description: 'Selected among the Top 50 participants in the eight-week AI Launch Pad program, where Lunelle was developed.',
  },
  {
    emoji: '🎯',
    title: 'ACCA Escape the Challenge',
    issuer: 'Association of Chartered Certified Accountants',
    period: '2022',
    description: 'Special Recognition & Participation Award.',
  },
  {
    emoji: '🥉',
    title: 'Advertisement Competition — Commerce Day',
    issuer: 'Royal College Commerce Day',
    period: '2021',
    description: 'Awarded 3rd Place.',
  },
  {
    emoji: '📣',
    title: 'Emerging Marketer — Legacy 2025',
    issuer: 'AIESEC in SLIIT',
    period: '2025',
    description: 'Nominee for marketing contribution and campaign excellence.',
  },
  {
    emoji: '🇬🇧',
    title: 'British Council Key English Test (KET)',
    issuer: 'British Council',
    period: '2016',
    description: 'Pass with Merit',
  },
  {
    emoji: '🎤',
    title: 'English & Communication Certifications',
    issuer: 'CALSDA',
    period: '2015',
    description: 'Certified in public speaking, dramatic performances, and interpersonal communications.',
  },
]

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const shouldReduceMotion = useReducedMotion()

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="achievements" data-chapter="06 // RECOGNITION" className="relative overflow-hidden bg-canvas px-6 py-20 lg:px-10 lg:py-28 text-white border-t border-white/5">
      {/* Background blueprint grid */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255, 255, 255, 0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255, 255, 255, 0.7)_1px,transparent_1px)] [background-size:60px_60px]" />
      )}

      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
            show: { opacity: 1, y: 0 }
          }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            ACHIEVEMENTS
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-display font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Certifications &amp; Achievements
          </h2>
        </motion.div>

        {/* Dashboard Grid of Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 md:grid-cols-2 items-stretch select-none"
        >
          {achievementsData.map((item, index) => {
            const isHovered = hoveredIdx === index

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 flex items-start gap-4 transition-all duration-300"
                style={{
                  borderColor: isHovered ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isHovered ? '0 8px 24px rgba(0, 102, 255, 0.05)' : 'none',
                  transform: isHovered && !shouldReduceMotion ? 'translateY(-4px)' : 'translateY(0px)'
                }}
              >
                {/* Corner Crosshairs node decorations */}
                <span className="absolute top-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
                <span className="absolute top-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2.5 left-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
                <span className="absolute bottom-2.5 right-2.5 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>

                {/* Emoji/Icon container */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 text-2xl transition duration-300 group-hover:bg-accent/10 group-hover:border-accent/40 z-10">
                  {item.emoji}
                </div>

                {/* Title & description */}
                <div className="flex-1 space-y-3 relative z-10">
                  
                  {/* Top verified system tag */}
                  <div className="flex items-center justify-between font-mono text-[10px] tracking-wider select-none border-b border-white/5 pb-2">
                    <div className="flex items-center gap-1.5 font-bold text-[#00e676]">
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        isHovered ? 'bg-[#00e676] animate-pulse shadow-[0_0_6px_#00e676]' : 'bg-[#00e676]/65'
                      } transition-all duration-300`} />
                      <span>VERIFIED_ACHIEVEMENT</span>
                    </div>
                    <span className="text-white/35 uppercase text-[10px]">[ID_ACH // 0{index + 1}]</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <h3 className={`text-[16px] md:text-lg font-display font-bold leading-snug transition-colors duration-300 ${
                      isHovered ? 'text-accent' : 'text-white'
                    }`}>
                      {item.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-0.5 font-mono text-[11.5px] text-white/45">
                    {item.issuer && (
                      <span className="font-semibold uppercase tracking-wider">
                        Issuer: {item.issuer}
                      </span>
                    )}
                    <span>
                      Date: {item.period}
                    </span>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Bottom Action Section */}
                  <div className="flex flex-wrap items-center justify-between pt-2">
                    {item.credentialUrl ? (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent group-hover:text-white transition duration-250 font-bold"
                      >
                        <span>View Credential</span>
                        <span className={`inline-block transition-transform duration-250 ${
                          isHovered && !shouldReduceMotion ? 'translate-x-1.5' : 'translate-x-0'
                        }`}>
                          &rarr;
                        </span>
                      </a>
                    ) : (
                      <span className="font-mono text-[11px] uppercase tracking-widest text-white/20">
                        Verification Only
                      </span>
                    )}
                  </div>

                  {item.image && (
                    <div 
                      className="mt-3 relative overflow-hidden rounded-xl border border-white/10 bg-black/30 aspect-[16/10] max-w-[260px] cursor-zoom-in group/img transition-all hover:border-accent/40" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(item);
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-1 transition duration-500 group-hover/img:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.nextElementSibling) {
                            e.currentTarget.nextElementSibling.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="absolute inset-0 hidden flex-col items-center justify-center p-3 text-center bg-white/5 font-mono text-[11.5px] text-white/40">
                        <span>Preview Certificate</span>
                        <span className="text-[9.5px] mt-1 text-white/20">(Add to public{item.image})</span>
                      </div>
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition duration-300">
                        <span className="text-white text-[11.5px] font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                          View Image
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <button
              type="button"
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-zoom-out"
              onClick={() => setSelectedCert(null)}
              aria-label="Close certificate preview"
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-10 max-h-[85vh] max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-canvas p-2 shadow-2xl flex flex-col items-center"
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0.2 } : { type: 'spring', damping: 25, stiffness: 350 }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                className="absolute right-4 top-4 z-20 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs uppercase tracking-widest text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Close
              </button>

              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-h-[70vh] max-w-full rounded-lg object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  if (e.currentTarget.nextElementSibling) {
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }
                }}
              />
              
              <div className="hidden w-full h-[50vh] flex-col items-center justify-center p-6 text-center bg-white/[0.02] text-white/40">
                <p className="text-sm font-semibold mb-2">Certificate Image Not Found</p>
                <p className="text-xs max-w-xs text-white/35">
                  Please ensure your certificate image is saved at:
                  <code className="bg-white/5 px-1.5 py-1 rounded text-accent font-mono text-[11px] block mt-2 break-all">
                    public{selectedCert.image}
                  </code>
                </p>
              </div>

              <div className="p-4 text-center w-full">
                <h3 className="text-white font-bold text-base leading-snug">{selectedCert.title}</h3>
                <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1">{selectedCert.period}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
