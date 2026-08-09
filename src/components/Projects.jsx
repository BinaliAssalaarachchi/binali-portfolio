import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="projects" className="relative overflow-hidden bg-canvas px-6 py-20 lg:px-10 lg:py-28 border-t border-white/5">
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
            SELECTED WORK
          </p>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-display font-bold leading-[1.08] tracking-[-0.03em] text-white">
            Engineering projects across AI, full-stack, and systems design.
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

function ProjectCard({ project, index, shouldReduceMotion, onSelect }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // 3D desktop tilt math (max 3 degrees)
  const handleMouseMove = (e) => {
    if (shouldReduceMotion || window.innerWidth < 1024 || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    
    const rotateX = -(mouseY / (height / 2)) * 3
    const rotateY = (mouseX / (width / 2)) * 3
    
    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setTilt({ x: 0, y: 0 })
  }

  const isMobile = project.stack.some(tech => 
    tech.toLowerCase().includes('flutter') || 
    tech.toLowerCase().includes('react native')
  )

  const isContainOnly = project.id === 'heart-disease'

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="group relative overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-sm flex flex-col justify-between cursor-pointer h-full transition-all duration-300"
      style={{
        transform: isHovered && !shouldReduceMotion ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` : 'none',
        transition: isHovered ? 'none' : 'transform 0.4s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        borderColor: isHovered ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered ? '0 10px 30px rgba(0, 102, 255, 0.06)' : 'none'
      }}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: shouldReduceMotion ? 0.25 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.04 }}
    >
      {/* Corner crosshairs node indicators */}
      <span className="absolute top-2 left-2 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
      <span className="absolute top-2 right-2 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
      <span className="absolute bottom-2 left-2 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>
      <span className="absolute bottom-2 right-2 font-mono text-[8px] text-white/20 select-none pointer-events-none">+</span>

      {/* Mockup Frame Wrapper */}
      {isMobile ? (
        <div className="aspect-[16/10] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c1328] to-[#121c3b] p-4 border-b border-white/5 relative select-none">
          {/* Subtle blueprint grid */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Phone Shell */}
          <div className="relative aspect-[9/16] h-[92%] rounded-[20px] border-[3px] border-white/20 bg-black shadow-[0_12px_24px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col justify-start">
            {/* Notch */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-full z-20 flex items-center justify-center">
              <div className="w-4 h-0.5 bg-white/20 rounded-full" />
            </div>

            {/* Subtle Scanning laser inside phone screen */}
            {isHovered && !shouldReduceMotion && (
              <div className="pointer-events-none absolute inset-x-0 h-[2.5px] bg-accent opacity-80 scan-line animate-scan z-20 shadow-[0_0_8px_var(--color-accent)]" />
            )}
            
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full object-cover pt-3.5 transition-transform duration-500 ${
                isHovered && !shouldReduceMotion ? 'scale-[1.04]' : 'scale-100'
              }`}
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
      ) : (
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

              {/* Subtle Scanning laser inside viewport */}
              {isHovered && !shouldReduceMotion && (
                <div className="pointer-events-none absolute inset-x-0 h-[2.5px] bg-accent opacity-80 scan-line animate-scan z-20 shadow-[0_0_8px_var(--color-accent)]" />
              )}

              <img
                src={project.image}
                alt={project.title}
                className={isContainOnly 
                  ? `relative z-10 max-h-full max-w-full object-contain rounded shadow-md transition-transform duration-500 ${
                      isHovered && !shouldReduceMotion ? 'scale-[1.04]' : 'scale-100'
                    }`
                  : `w-full h-full object-cover object-top transition-transform duration-500 ${
                      isHovered && !shouldReduceMotion ? 'scale-[1.04]' : 'scale-100'
                    }`
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
      )}

      {/* Info Card Content */}
      <div className="p-6 flex flex-col flex-grow justify-between relative z-10 bg-canvas/30">
        <div>
          {/* Subtle Technical Metadata */}
          <div className="mb-4 flex items-center justify-between font-mono text-[8.5px] text-white/35 tracking-widest select-none border-b border-white/5 pb-2">
            <span>PROJECT_{String(index + 1).padStart(2, '0')}</span>
            <span>STATUS // {project.repo ? 'STABLE' : 'INTERNAL'}</span>
          </div>

          <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-accent">
            {project.metadata}
          </p>
          <h3 className="mb-3 text-xl font-display font-bold leading-snug tracking-[-0.02em] text-white">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-white/55">
            {project.summary}
          </p>
          
          {/* Staggered Tag highlights */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition-all duration-300 ${
                  isHovered 
                    ? 'border-accent/30 text-white/95 bg-accent/5' 
                    : 'border-white/10 text-white/50 bg-transparent'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-[9px] uppercase tracking-widest text-white/50 hover:text-white transition duration-200"
            >
              GitHub Repo
            </a>
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/25">
              Private Source
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent group-hover:text-white transition duration-250 font-bold cursor-pointer"
          >
            <span>View Project</span>
            <span className={`inline-block transition-transform duration-250 ${
              isHovered && !shouldReduceMotion ? 'translate-x-1.5' : 'translate-x-0'
            }`}>
              &rarr;
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
