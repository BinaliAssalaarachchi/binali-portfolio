import { motion } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="bg-canvas px-6 pt-4 pb-4 lg:px-10 lg:pt-6 lg:pb-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.4em] text-white/40">
            Selected Work
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Engineering projects across AI, full-stack, and systems design.
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col justify-between cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.04 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-[16/10] flex items-center justify-center overflow-hidden bg-black/40 p-6 border-b border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-lg transition duration-700 group-hover:scale-[1.03]"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml,' +
                      encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="#1a1a1a" width="800" height="500"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="16">${project.title.slice(0, 30)}</text></svg>`,
                      )
                  }}
                />
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {project.metadata}
                  </p>
                  <h3 className="mb-3 text-xl font-bold leading-snug tracking-[-0.02em] text-white">
                    {project.title}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/55">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-accent transition hover:text-accent/80 hover:underline flex items-center gap-1"
                    >
                      GitHub Repo &rarr;
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                      Private Repo
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition hover:bg-accent/80"
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
