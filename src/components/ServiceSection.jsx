import { motion, useReducedMotion } from 'framer-motion'

const capabilities = [
  {
    emoji: '🤖',
    title: 'AI & ML Models',
    description:
      'End-to-end machine learning pipelines — from data preprocessing and feature selection to model training and evaluation.',
    projects: [
      'Heart Disease Prediction',
      'Student Performance Prediction & Study Schedule Generator',
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Django'],
  },
  {
    emoji: '🌐',
    title: 'Full-Stack Web Apps',
    description:
      'Production-ready web systems with React frontends, Spring Boot APIs, and relational database architecture.',
    projects: [
      'Laundry Management System',
      'Driver Dashboard — Travel Booking System',
    ],
    tech: ['React.js', 'Spring Boot', 'MySQL', 'Java', 'REST API'],
  },
  {
    emoji: '📱',
    title: 'Mobile Applications',
    description:
      'Cross-platform mobile apps with full backend integration and live deployment.',
    projects: ['Driver Dashboard — Travel Planning App'],
    tech: ['React Native', 'MongoDB', 'JavaScript'],
  },
  {
    emoji: '🔌',
    title: 'IoT & Hardware Systems',
    description:
      'Real-world hardware integration with threshold-based alert logic and sensor data handling.',
    projects: [
      'IoT Water Level Management System',
      'Network Setup using Cisco Packet Tracer',
    ],
    tech: ['Arduino', 'Sensors', 'Cisco Packet Tracer'],
  },
]

export default function ServiceSection() {
  const shouldReduceMotion = useReducedMotion()

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  }

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section
      id="process"
      className="bg-canvas px-6 py-20 lg:px-10 lg:py-28 text-white border-t border-white/5 relative overflow-hidden"
    >
      {/* Architectural Background Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Ambient Accent Background Glows */}
      <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/45">
            Capabilities
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-display font-bold leading-[1.08] tracking-[-0.03em] text-white">
            What I Actually Build
          </h2>
        </motion.div>

        {/* 2x2 Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((tile, index) => (
            <motion.article
              key={tile.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-accent/40 hover:bg-white/8 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex flex-col justify-between group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                {/* Emoji Icon Container */}
                <div className="rounded-xl bg-accent/10 border border-accent/20 p-4 w-fit flex items-center justify-center text-3xl transition duration-300 group-hover:bg-accent/20 group-hover:border-accent/40">
                  {tile.emoji}
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-display font-black text-white mt-5 tracking-tight group-hover:text-accent transition-colors duration-300">
                  {tile.title}
                </h3>
                <p className="text-sm text-white/70 mt-3 leading-relaxed">
                  {tile.description}
                </p>
              </div>

              {/* Divider and Details */}
              <div>
                <div className="border-t border-white/10 mt-6 pt-5" />

                {/* Shipped Projects */}
                <div className="mb-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-semibold">
                    Shipped Projects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tile.projects.map((proj) => (
                      <span
                        key={proj}
                        className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/80 font-medium"
                      >
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-semibold">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tile.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-accent/10 border border-accent/25 px-3 py-1 text-xs text-accent font-semibold font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Banner Card */}
        <motion.div
          className="rounded-2xl border border-accent/25 bg-accent/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, delay: shouldReduceMotion ? 0 : 0.3 }}
        >
          <span className="text-xl font-display font-black text-white text-center sm:text-left tracking-tight">
            10+ projects shipped across 4 engineering domains
          </span>
          <a
            href="#projects"
            className="rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition duration-300 shrink-0"
          >
            View All Projects &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  )
}
