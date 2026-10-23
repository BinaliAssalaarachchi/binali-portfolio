import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const shouldReduceMotion = useReducedMotion()
  const aiProjects = projects.filter((project) => project.category === 'ai')
  const softwareProjects = projects.filter((project) => project.category === 'swe')

  return (
    <section id="projects" data-chapter="02 // WORK" className="editorial-projects relative overflow-hidden px-6 py-28 lg:px-10 lg:py-40">
      <div className="editorial-projects__wash" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[92rem]">
        <motion.header className="editorial-heading mb-24 grid gap-8 lg:grid-cols-[0.8fr_1.7fr] lg:items-end" initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}>
          <div><p className="eyebrow">SELECTED WORK</p><span className="editorial-index">02</span></div>
          <h2>Engineering projects across AI, full-stack, and systems design.</h2>
        </motion.header>
        <ProjectChapter label="AI / ML PROJECTS" projects={aiProjects} startIndex={0} onSelect={setSelectedProject} shouldReduceMotion={shouldReduceMotion} />
        <ProjectChapter label="SOFTWARE ENGINEERING PROJECTS" projects={softwareProjects} startIndex={aiProjects.length} onSelect={setSelectedProject} shouldReduceMotion={shouldReduceMotion} />
      </div>
      <ProjectModal key={selectedProject?.id ?? 'closed'} project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

function ProjectChapter({ label, projects: group, startIndex, onSelect, shouldReduceMotion }) {
  return <div className="editorial-chapter"><div className="editorial-chapter__label"><span>{label}</span><i /></div><div className="editorial-project-list">
    {group.map((project, index) => <EditorialProject key={project.id} project={project} index={startIndex + index} reverse={(startIndex + index) % 2 === 1} onSelect={() => onSelect(project)} shouldReduceMotion={shouldReduceMotion} />)}
  </div></div>
}

function EditorialProject({ project, index, reverse, onSelect, shouldReduceMotion }) {
  return <motion.article className={`editorial-project ${reverse ? 'editorial-project--reverse' : ''}`} initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: shouldReduceMotion ? 0.25 : 0.7, ease: [0.22, 1, 0.36, 1] }}>
    <button type="button" className="editorial-project__visual" onClick={onSelect} aria-label={`View ${project.title}`}>
      <span className="editorial-project__number">{String(index + 1).padStart(2, '0')}</span>
      {project.image ? <img src={project.image} alt={project.title} loading="lazy" /> : <div className="editorial-project__placeholder"><span>VISUAL STUDY</span><strong>{project.title}</strong></div>}
      <span className="editorial-project__open">View project ↗</span>
    </button>
    <div className="editorial-project__copy">
      <p className="eyebrow">{project.category === 'ai' ? 'AI / MACHINE LEARNING' : 'SOFTWARE ENGINEERING'}</p>
      <h3>{project.title}</h3><p className="editorial-project__meta">{project.metadata}</p>
      <p className="editorial-project__summary">{project.summary}</p>
      <div className="editorial-project__footer"><div className="editorial-tags">{project.stack.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div><button type="button" onClick={onSelect} className="editorial-arrow" aria-label={`Open details for ${project.title}`}>↗</button></div>
    </div>
  </motion.article>
}
