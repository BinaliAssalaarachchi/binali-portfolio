import { motion } from 'framer-motion'

const highlights = [
  {
    metric: '8+',
    title: 'Projects',
    body: 'AI pipelines, full-stack web platforms, and mobile apps.',
  },
  {
    metric: '3.5+',
    title: 'Current CGPA',
    body: "SLIIT Faculty of Computing Dean's List academic recognition.",
  },
  {
    metric: 'BCS',
    title: 'HEQ Level 4 & 5',
    body: 'British Computer Society Higher Education Qualifications completed and passed.',
  },
]



export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-canvas px-6 pt-12 pb-4 lg:px-10 lg:pt-16 lg:pb-6">
      <div className="mx-auto grid max-w-7xl items-start gap-16 lg:grid-cols-2 lg:gap-20">
        <motion.div
          className="flex flex-col items-center pt-2 origin-top rotate-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Lanyard Strap */}
          <div className="h-20 w-1 bg-accent/50 rounded-full" />
          {/* Metal Clip */}
          <div className="h-4 w-8 -mt-0.5 z-10 rounded-sm border border-neutral-500 bg-gradient-to-b from-neutral-300 to-neutral-600 shadow-md" />

          {/* ID Card */}
          <motion.div
            className="w-[min(100%,320px)] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] backdrop-blur-md p-5 shadow-[0_30px_60px_rgba(0,0,0,0.45)] -mt-1"
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <div className="mb-4 aspect-[4/5] overflow-hidden rounded-xl bg-accent/30">
              <img
                src="/me.jpg"
                alt="ID badge portrait"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
            <p className="text-lg font-bold text-white">Binali Assalaarachchi</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-sky-400">
              AI &amp; Software Engineering
            </p>
            <p className="mt-3 font-mono text-[10px] text-white/40">SLIIT • Undergraduate</p>
          </motion.div>
        </motion.div>

        <div>
          <motion.h2
            className="mb-8 text-[clamp(3rem,8vw,5rem)] font-bold leading-none tracking-[-0.04em] text-white"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Hello!
          </motion.h2>

          <motion.p
            className="mb-12 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            I&apos;m an IT undergraduate specializing in Artificial Intelligence, focused on
            engineering practical solutions from predictive models to full-stack applications.
            Alongside academics, I&apos;ve taken leadership roles in AIESEC and contributed to
            volunteering initiatives, strengthening my coordination, teamwork, and execution
            skills.
          </motion.p>

          <div className="mb-16 grid gap-4 sm:grid-cols-3">
            {highlights.map((card, index) => (
              <motion.article
                key={card.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm flex flex-col justify-between"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ y: -3 }}
              >
                <div>
                  <span className="font-mono text-lg sm:text-xl md:text-2xl font-black text-accent block mb-1 truncate">
                    {card.metric}
                  </span>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-white">
                    {card.title}
                  </h3>
                </div>
                <p className="text-[11px] leading-relaxed text-white/60">{card.body}</p>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
