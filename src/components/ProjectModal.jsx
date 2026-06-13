import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ProjectModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(project?.image)

  useEffect(() => {
    if (project) setActiveImage(project.image)
  }, [project])

  useEffect(() => {
    if (!project) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-shutter/75 backdrop-blur-md"
            aria-label="Close project details"
            onClick={onClose}
          />

          <motion.dialog
            open
            className="glass-panel relative z-10 m-0 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-canvas/90 text-surface shadow-2xl"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            aria-labelledby="project-modal-title"
          >
            <div className="grid max-h-[92vh] overflow-y-auto lg:grid-cols-2">
              <div className="border-b border-white/10 p-6 lg:border-b-0 lg:border-r">
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-white/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt={`${project.title} preview`}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      onError={(e) => {
                        e.currentTarget.src =
                          'data:image/svg+xml,' +
                          encodeURIComponent(
                            `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect fill="#2a2a2a" width="800" height="450"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#888" font-family="sans-serif" font-size="18">Project asset</text></svg>`,
                          )
                      }}
                    />
                  </AnimatePresence>
                </div>

                {project.gallery?.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {project.gallery.map((image) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className={`h-14 w-20 overflow-hidden rounded-lg border transition ${
                          activeImage === image
                            ? 'border-accent ring-2 ring-accent/40'
                            : 'border-white/10 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt=""
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              'data:image/svg+xml,' +
                              encodeURIComponent(
                                `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="56" viewBox="0 0 80 56"><rect fill="#2a2a2a" width="80" height="56"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#555" font-family="sans-serif" font-size="8">Asset</text></svg>`,
                              )
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col p-6 md:p-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-5 top-5 rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/60 transition hover:border-white/40 hover:text-white"
                >
                  Close
                </button>

                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">
                  {project.metadata}
                </p>
                <h2
                  id="project-modal-title"
                  className="mb-4 pr-16 text-2xl font-bold leading-tight tracking-[-0.02em] md:text-3xl"
                >
                  {project.title}
                </h2>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mb-6 text-sm leading-relaxed text-white/65 md:text-base">
                  {project.summary}
                </p>

                {project.contributions?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                      Contributions
                    </h3>
                    <ul className="space-y-2 text-sm leading-relaxed text-white/70">
                      {project.contributions.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.repo ? (
                  <motion.a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  >
                    View Repository
                  </motion.a>
                ) : (
                  <p className="mt-auto font-mono text-xs uppercase tracking-[0.2em] text-white/35">
                    Repository unavailable
                  </p>
                )}
              </div>
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
