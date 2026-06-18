import { motion } from 'framer-motion'

const achievementsData = [
  {
    emoji: '🤖',
    title: 'AI Skills Fest 2026 — Microsoft',
    period: 'Jun 2026',
    description: 'Credential verified on Credly',
    credentialUrl: 'https://www.credly.com/badges/b244660b-8616-403e-adde-b3c330fbbb3c/public_url',
  },
  {
    emoji: '🏆',
    title: "SLIIT Faculty of Computing Dean's List",
    period: 'Year 1 Semester 2',
    description: 'Academic recognition for outstanding performance.',
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
