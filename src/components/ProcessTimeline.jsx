import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const passes = [
  {
    id: '01',
    title: 'Define & Architect',
    body: 'Relational Database Design, Schema Mapping, System Architecture, and UML planning.',
    side: 'left',
  },
  {
    id: '02',
    title: 'Design & Preprocess',
    body: 'Core UI/UX wireframing, feature extraction, data cleansing, and scaling.',
    side: 'right',
  },
  {
    id: '03',
    title: 'Build & Integrate',
    body: 'Full-Stack business layers, structured REST APIs, and core ML training frameworks.',
    side: 'left',
  },
  {
    id: '04',
    title: 'Launch & Deploy',
    body: 'Complete frontend hosting, cloud database syncing, and live ecosystem rollout.',
    side: 'right',
  },
]

const CURVE_PATH =
  'M 420 40 C 420 180, 180 220, 180 380 C 180 540, 420 580, 420 720 C 420 860, 180 900, 180 1040'

export default function ProcessTimeline() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.2', 'end 0.85'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden bg-canvas px-6 pt-4 pb-4 text-white lg:px-10 lg:pt-6 lg:pb-6 border-t border-white/5"
    >
      <div className="pointer-events-none absolute inset-0 grid-architectural opacity-70" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="mb-20 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            How I Build
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Driving complex engineering pipelines from database design to deployment.
          </h2>
        </motion.div>

        <div className="relative min-h-[1100px]">
          <svg
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-full max-w-2xl -translate-x-1/2 lg:block"
            viewBox="0 0 600 1100"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d={CURVE_PATH}
              stroke="var(--color-accent)"
              strokeOpacity="0.3"
              strokeWidth="2"
              strokeDasharray="8 10"
              fill="none"
              style={{ pathLength }}
            />
          </svg>

          <div className="relative space-y-24 lg:space-y-32">
            {passes.map((pass, index) => (
              <PassCard
                key={pass.id}
                pass={pass}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PassCard({ pass, index, scrollYProgress }) {
  const start = index * 0.18
  const end = start + 0.22
  const cardProgress = useTransform(scrollYProgress, [start, end], [0, 1])
  const backgroundColor = useTransform(cardProgress, (v) => (v > 0.45 ? '#0066ff' : 'rgba(255, 255, 255, 0.03)'))
  const borderColor = useTransform(cardProgress, (v) =>
    v > 0.45 ? '#0066ff' : 'rgba(255, 255, 255, 0.1)',
  )
  const color = useTransform(cardProgress, (v) => (v > 0.45 ? '#FFFFFF' : 'rgba(255, 255, 255, 0.85)'))
  const boxShadow = useTransform(cardProgress, (v) =>
    v > 0.45
      ? '0 24px 60px rgba(0, 102, 255, 0.35)'
      : '0 20px 50px rgba(0,0,0,0)',
  )

  return (
    <motion.div
      className={`relative flex ${pass.side === 'left' ? 'lg:justify-start' : 'lg:justify-end'}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
    >
      <motion.article
        className="relative w-full max-w-md rounded-2xl border p-8 lg:w-[46%] backdrop-blur-sm shadow-md"
        style={{ backgroundColor, borderColor, color, boxShadow }}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] opacity-60">
          Pass {pass.id}
        </p>
        <h3 className="mb-3 text-2xl font-bold tracking-[-0.02em]">{pass.title}</h3>
        <p className="text-sm leading-relaxed opacity-80">{pass.body}</p>
      </motion.article>
    </motion.div>
  )
}
