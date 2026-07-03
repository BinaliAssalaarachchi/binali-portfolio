import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const achievementsData = [
  {
    emoji: '📊',
    title: 'Deloitte Australia Data Analytics Job Simulation (Forage)',
    period: 'Jul 2026',
    description: 'Completed a job simulation involving data analysis, forensic technology, Tableau dashboard creation, and Excel-based data classification and business insights generation.',
    credentialUrl: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_6a45d9aa396e836fd6859389_1782965760707_completion_certificate.pdf',
    image: '/certificates/deloitte.png',
  },
  {
    emoji: '🤖',
    title: 'AI Skills Fest 2026 — Microsoft',
    period: 'Jun 2026',
    description: 'Credential verified on Credly',
    credentialUrl: 'https://www.credly.com/badges/b244660b-8616-403e-adde-b3c330fbbb3c/public_url',
    image: '/certificates/microsoft.png',
  },
  {
    emoji: '🏆',
    title: "SLIIT Faculty of Computing Dean's List",
    period: 'Year 1 Semester 2',
    description: 'Academic recognition for outstanding performance.',
    image: '/certificates/sliit_deans_list.jpg',
  },
  {
    emoji: '🎯',
    title: 'ACCA Escape the Challenge',
    period: '2022',
    description: 'Special Recognition & Participation Award.',
  },
  {
    emoji: '🥉',
    title: 'Advertisement Competition — Commerce Day',
    period: 'Royal College',
    description: 'Awarded 3rd Place.',
  },
  {
    emoji: '📣',
    title: 'Emerging Marketer — Legacy 2025 (AIESEC in SLIIT)',
    period: 'Nominee',
    description: 'Recognized for marketing contribution and campaign excellence.',
  },
  {
    emoji: '🇬🇧',
    title: 'British Council Key English Test (KET)',
    period: '2016',
    description: 'Pass with Merit',
  },
  {
    emoji: '🎤',
    title: 'English & Communication Certifications (CALSDA)',
    period: 'Speech, Drama & Communication Skills',
    description: 'Certified in public speaking, dramatic performances, and interpersonal communications.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <section id="achievements" className="bg-canvas px-6 pt-4 pb-4 lg:px-10 lg:pt-6 lg:pb-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            Achievements
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Certifications &amp; Achievements
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 md:grid-cols-2"
        >
          {achievementsData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex items-start gap-4"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Emoji/Icon container */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2E75B6]/10 border border-[#2E75B6]/20 text-2xl">
                {item.emoji}
              </div>

              {/* Title & description */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <h3 className="text-lg font-bold leading-snug text-white group-hover:text-[#2E75B6] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-white/40 sm:text-right mt-0.5">
                    {item.period}
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  {item.credentialUrl && (
                    <div className="pt-1">
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E75B6] hover:text-[#2E75B6]/80 hover:underline transition-colors"
                      >
                        <span>Verify Credential</span>
                        <span>&rarr;</span>
                      </a>
                    </div>
                  )}
                </div>

                {item.image && (
                  <div 
                    className="mt-3 relative overflow-hidden rounded-xl border border-white/10 bg-black/30 aspect-[16/10] max-w-[260px] cursor-zoom-in group/img transition-all hover:border-[#2E75B6]/50" 
                    onClick={() => setSelectedCert(item)}
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
                    <div className="absolute inset-0 hidden flex-col items-center justify-center p-3 text-center bg-white/5 font-mono text-[10px] text-white/40">
                      <span>Preview Certificate</span>
                      <span className="text-[8px] mt-1 text-white/20">(Add to public{item.image})</span>
                    </div>
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition duration-300">
                      <span className="text-white text-[10px] font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                        View Image
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
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
