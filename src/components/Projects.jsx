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
              {(() => {
                const isMobile = project.stack.some(tech => 
                  tech.toLowerCase().includes('flutter') || 
                  tech.toLowerCase().includes('react native')
                )

                if (isMobile) {
                  return (
                    <div className="aspect-[16/10] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c1328] to-[#121c3b] p-4 border-b border-white/5 relative select-none">
                      {/* Subtle blueprint grid */}
                      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:16px_16px]" />
                      
                      {/* Phone shell */}
                      <div className="relative aspect-[9/16] h-[92%] rounded-[20px] border-[3px] border-white/20 bg-black shadow-[0_12px_24px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-start">
                        {/* Notch */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full z-20 flex items-center justify-center">
                          <div className="w-4 h-0.5 bg-white/20 rounded-full" />
                        </div>
                        
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover pt-3.5 transition duration-700 group-hover:scale-[1.03]"
                          onError={(e) => {
                            e.currentTarget.src =
                              'data:image/svg+xml,' +
                              encodeURIComponent(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="600" viewBox="0 0 300 600"><rect fill="#1a1a1a" width="300" height="600"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="12">Mockup</text></svg>`,
                              )
                          }}
                        />
                      </div>
                    </div>
                  )
                }

                const isContainOnly = project.id === 'heart-disease'

                return (
                  <div className="aspect-[16/10] flex flex-col items-center justify-start overflow-hidden bg-gradient-to-br from-[#0c1328] to-[#121c3b] p-4 border-b border-white/5 relative select-none">
                    {/* Subtle blueprint grid */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:16px_16px]" />

                    {/* Browser Shell */}
                    <div className="w-[96%] h-[90%] mt-1 rounded-t-xl border-t border-x border-white/15 bg-[#060b1e]/90 shadow-[0_12px_24px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
                      {/* Browser Header Bar */}
                      <div className="h-6 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1 shrink-0 select-none">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
                        <div className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
                        <div className="h-3 w-1/2 bg-white/5 rounded border border-white/5 mx-auto flex items-center justify-center">
                          <span className="text-[6px] text-white/20 font-mono tracking-tight truncate">localhost:3000</span>
                        </div>
                      </div>
                      
                      {/* Viewport */}
                      <div className={`flex-grow bg-black/40 overflow-hidden relative ${isContainOnly ? 'flex items-center justify-center p-3' : ''}`}>
                        {/* Ambient Blurred Backdrop for contained preview */}
                        {isContainOnly && (
                          <img
                            src={project.image}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover opacity-20 blur-xl scale-110 pointer-events-none"
                            aria-hidden="true"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}

                        <img
                          src={project.image}
                          alt={project.title}
                          className={isContainOnly 
                            ? "relative z-10 max-h-full max-w-full object-contain rounded shadow-md transition duration-700 group-hover:scale-[1.03]"
                            : "w-full h-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
                          }
                          onError={(e) => {
                            e.currentTarget.src =
                              'data:image/svg+xml,' +
                              encodeURIComponent(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect fill="#1a1a1a" width="800" height="500"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="16">${project.title.slice(0, 30)}</text></svg>`,
                              )
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })()}

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
