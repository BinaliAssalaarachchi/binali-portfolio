import { motion } from 'framer-motion'
import { certificates, skillColumns } from '../data/skills'

export default function Skills() {
  return (
    <section id="skills" className="bg-canvas px-6 pt-4 pb-4 text-white lg:px-10 lg:pt-6 lg:pb-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            Credentials &amp; Strengths
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Technical depth backed by academic recognition and leadership.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="grid gap-6 sm:grid-cols-2">
            {skillColumns.map((column, index) => (
              <motion.article
                key={column.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm shadow-md transition duration-300 hover:border-white/20"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white">
                  {column.title}
                </h3>
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-white/70"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="space-y-6">
            {certificates.map((group, index) => (
              <motion.article
                key={group.category}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm shadow-md transition duration-300 hover:border-white/20"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-l-2 border-white/10 pl-4 text-sm leading-relaxed text-white/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
