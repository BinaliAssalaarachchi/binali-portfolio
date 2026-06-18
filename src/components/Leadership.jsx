import { motion } from 'framer-motion'

const leadershipData = [
  {
    role: 'Organizing Committee Vice President (Marketing)',
    organisation: "AIESEC in SLIIT — Kokila Rawaya'25",
    period: null,
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
    period: null,
    description: 'Founded and runs a graphic design brand.',
    website: 'https://graphicgurus.mystrikingly.com',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Leadership() {
  return (
    <section id="experience" className="bg-canvas px-6 pt-4 pb-4 lg:px-10 lg:pt-6 lg:pb-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            Experience
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Leadership &amp; Involvement
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-40px' }}
          className="grid gap-6 md:grid-cols-2"
        >
          {leadershipData.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 flex flex-col justify-between"
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold leading-snug text-white">
                      {item.role}
                    </h3>
                    <p className="text-[#2E75B6] font-semibold text-sm md:text-base mt-1">
                      {item.organisation}
                    </p>
                  </div>
                  {item.period && (
                    <div className="shrink-0">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md inline-block">
                        {item.period}
                      </span>
                    </div>
                  )}
                </div>
                
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.website && (
                <div className="mt-6 border-t border-white/5 pt-4">
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E75B6] hover:text-[#2E75B6]/80 hover:underline transition-colors"
                  >
                    <span>Visit Website</span>
                    <span className="font-mono">graphicgurus.mystrikingly.com</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
