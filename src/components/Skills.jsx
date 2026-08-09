import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const SKILL_CATEGORIES = [
  {
    title: 'Programming',
    items: ['Python', 'Java', 'JavaScript', 'C', 'Node.js'],
  },
  {
    title: 'Frontend',
    items: ['React.js', 'React Native', 'HTML5', 'CSS3'],
  },
  {
    title: 'AI / Machine Learning',
    items: ['Neural Networks', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib & Seaborn'],
  },
  {
    title: 'Databases',
    items: ['MySQL', 'MongoDB', 'SQL Queries', 'Database Design'],
  },
  {
    title: 'Tools & Practices',
    items: ['Git & GitHub', 'OOP Principles', 'REST APIs', 'Agile / Scrum'],
  },
]

const RELATIONSHIPS = {
  'Python': ['Scikit-learn', 'Pandas', 'NumPy', 'Neural Networks', 'Matplotlib & Seaborn'],
  'Java': ['OOP Principles', 'MySQL', 'Database Design'],
  'JavaScript': ['React.js', 'React Native', 'Node.js', 'REST APIs'],
  'C': ['OOP Principles'],
  'Node.js': ['JavaScript', 'REST APIs', 'MongoDB'],
  'React.js': ['JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
  'React Native': ['JavaScript', 'REST APIs'],
  'HTML5': ['React.js', 'CSS3'],
  'CSS3': ['React.js', 'HTML5'],
  'Neural Networks': ['Python', 'Scikit-learn', 'NumPy'],
  'Scikit-learn': ['Python', 'Pandas', 'NumPy', 'Neural Networks'],
  'Pandas': ['Python', 'Scikit-learn', 'NumPy', 'Matplotlib & Seaborn'],
  'NumPy': ['Python', 'Scikit-learn', 'Pandas', 'Neural Networks'],
  'Matplotlib & Seaborn': ['Python', 'Pandas'],
  'MySQL': ['SQL Queries', 'Database Design', 'Java'],
  'MongoDB': ['Node.js', 'REST APIs'],
  'SQL Queries': ['MySQL', 'Database Design'],
  'Database Design': ['MySQL', 'SQL Queries'],
  'Git & GitHub': ['Python', 'Java', 'JavaScript', 'C'],
  'OOP Principles': ['Java', 'C'],
  'REST APIs': ['Node.js', 'React.js', 'React Native', 'MongoDB'],
  'Agile / Scrum': ['Git & GitHub']
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion()
  const [hoveredSkill, setHoveredSkill] = useState(null)

  // Connection checking logic
  const isSkillRelated = (source, target) => {
    if (!source || source === target) return false
    return RELATIONSHIPS[source]?.includes(target) || RELATIONSHIPS[target]?.includes(source)
  }

  return (
    <section id="skills" className="relative overflow-hidden bg-canvas px-6 py-20 lg:px-10 lg:py-28 text-white border-t border-white/5">
      {/* Background blueprint grid */}
      {!shouldReduceMotion && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:60px_60px]" />
      )}

      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            TECHNICAL STRENGTHS
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-display font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Knowledge Network
          </h2>
        </motion.div>

        {/* Network Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch select-none">
          {SKILL_CATEGORIES.map((column, colIndex) => (
            <motion.article
              key={column.title}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition duration-300 hover:border-accent/30 flex flex-col h-full"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.25 : 0.6, delay: shouldReduceMotion ? 0 : colIndex * 0.05 }}
            >
              {/* Corner markings */}
              <span className="absolute top-2 left-2 font-mono text-[8px] text-white/20 pointer-events-none">+</span>
              <span className="absolute top-2 right-2 font-mono text-[8px] text-white/20 pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 font-mono text-[8px] text-white/20 pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 font-mono text-[8px] text-white/20 pointer-events-none">+</span>

              {/* Category Header */}
              <h3 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-white/45 border-b border-white/5 pb-3">
                {column.title}
              </h3>

              {/* Connection Column Container */}
              <div className="relative pl-6 flex-grow flex flex-col justify-center">
                
                {/* Vertical connection line running behind nodes */}
                {!shouldReduceMotion && (
                  <div className={`absolute left-2 top-4 bottom-4 w-[1.5px] transition-colors duration-300 ${
                    hoveredSkill && column.items.includes(hoveredSkill)
                      ? 'bg-accent/40 shadow-[0_0_4px_rgba(0,102,255,0.2)]'
                      : 'bg-white/10'
                  }`} />
                )}

                <ul className="space-y-4 py-2">
                  {column.items.map((item) => {
                    const isDirectHovered = hoveredSkill === item
                    const isRelated = isSkillRelated(hoveredSkill, item)
                    const isInactive = hoveredSkill !== null && !isDirectHovered && !isRelated

                    return (
                      <li
                        key={item}
                        className={`relative flex items-center gap-4 transition-all duration-300 ${
                          isInactive ? 'opacity-30 scale-[0.98]' : 'opacity-100'
                        }`}
                        onMouseEnter={() => setHoveredSkill(item)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Interactive Node Dot */}
                        <div className="relative flex items-center justify-center w-4 h-4 shrink-0 z-10">
                          <div 
                            className={`w-2.5 h-2.5 rounded-full border transition-all duration-250 ${
                              isDirectHovered 
                                ? 'bg-accent border-accent shadow-[0_0_10px_var(--color-accent)] scale-125' 
                                : isRelated 
                                  ? 'bg-accent/60 border-accent/50 scale-110 shadow-[0_0_6px_rgba(0,102,255,0.3)]' 
                                  : 'bg-canvas border-white/30 group-hover:border-white/50'
                            }`} 
                          />
                        </div>

                        {/* Skill Name */}
                        <span className={`font-mono text-[11.5px] uppercase tracking-wider transition-colors duration-250 ${
                          isDirectHovered 
                            ? 'text-accent font-bold' 
                            : isRelated 
                              ? 'text-white font-semibold' 
                              : 'text-white/60'
                        }`}>
                          {item}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
