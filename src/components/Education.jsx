import { motion } from 'framer-motion'

const educationData = [
  {
    degree: 'BSc (Hons) Information Technology specializing in Artificial Intelligence',
    institution: 'Sri Lanka Institute of Information Technology (SLIIT)',
    period: '2024 – Present',
    details: 'CGPA: 3.52 | Currently in Year 3',
  },
  {
    degree: 'BCS Level 6 Professional Graduate Diploma in IT',
    institution: 'Live College',
    period: '2025 – Present',
    details: 'Modules: Advanced Database Management, Programming Paradigms, MIS, System Design',
  },
  {
    degree: 'BCS Level 5 Diploma in IT',
    institution: 'BCS, The Chartered Institute for IT',
    period: '2023 – 2024',
    details: 'Modules: Database Systems, OOP, System Analysis & Design | Result: Pass',
  },
  {
    degree: 'BCS Level 4 Certificate in IT',
    institution: 'BCS, The Chartered Institute for IT',
    period: '2023',
    details: 'Modules: Networking, Software Development, Information Systems | Result: Pass',
  },
  {
    degree: 'Certificate in Computer Science',
    institution: 'National Institute of Business Management (NIBM)',
    period: '2021 – 2022',
  },
  {
    degree: 'GCE Advanced Level — Commerce Stream',
    institution: "St. Paul's Girls' School",
    period: '2021 – 2023',
    details: 'Accounting (A), Economics (A), ICT (A), General English (A)',
  },
]

export default function Education() {
  return (
    <section id="education" className="bg-canvas px-6 pt-4 pb-4 lg:px-10 lg:pt-6 lg:pb-6 border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            Education
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Academic Background
          </h2>
        </motion.div>

        {/* Timeline Layout */}
        <div className="relative pl-8 md:pl-12 ml-2 md:ml-4">
          {/* Vertical blue line */}
          <div 
            className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#2E75B6]" 
            style={{ boxShadow: '0 0 10px rgba(46, 117, 182, 0.4)' }}
          />

          <div className="space-y-12">
            {educationData.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                {/* Timeline Dot Marker */}
                <div 
                  className="absolute -left-[39px] md:-left-[55px] top-6 h-4 w-4 rounded-full bg-[#2E75B6] border-[3px] border-[#060b1e] z-10" 
                  style={{ boxShadow: '0 0 8px rgba(46, 117, 182, 0.6)' }}
                />

                {/* Glassmorphic Card */}
                <motion.div
                  className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 relative overflow-hidden"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-white">
                        {item.degree}
                      </h3>
                      {item.institution && (
                        <p className="text-[#2E75B6] font-semibold text-sm md:text-base">
                          {item.institution}
                        </p>
                      )}
                      {item.details && (
                        <p className="text-white/60 text-sm leading-relaxed mt-4 border-t border-white/5 pt-3">
                          {item.details}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 sm:text-right">
                      <span className="font-mono text-xs md:text-sm text-white/50 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg inline-block">
                        {item.period}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
