import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

export default function ProjectModal({ project, onClose }) {
  const shouldReduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const images = useMemo(() => project ? [...new Set([project.image, ...(project.gallery || [])].filter(Boolean))] : [], [project])
  const activeImage = images[activeIndex]

  useEffect(() => {
    if (!project) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (lightboxOpen) setLightboxOpen(false)
        else onClose()
      }
      if (!lightboxOpen || images.length < 2) return
      if (event.key === 'ArrowRight') setActiveIndex((current) => (current + 1) % images.length)
      if (event.key === 'ArrowLeft') setActiveIndex((current) => (current - 1 + images.length) % images.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleKeyDown) }
  }, [project, onClose, lightboxOpen, images.length])

  const move = (direction) => setActiveIndex((current) => (current + direction + images.length) % images.length)
  const handleTouchEnd = (event) => {
    if (touchStart === null || images.length < 2) return
    const distance = event.changedTouches[0].clientX - touchStart
    if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1)
    setTouchStart(null)
  }

  return <AnimatePresence>
    {project && <motion.div className="project-viewer fixed inset-0 z-[99999] overflow-y-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button type="button" className="absolute inset-0 project-viewer__backdrop" aria-label="Close project details" onClick={onClose} />
      <motion.div className="project-viewer__panel relative z-10 mx-auto my-4 flex min-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-[1500px] flex-col overflow-hidden md:my-8 md:min-h-[calc(100vh-4rem)] md:w-[calc(100%-4rem)]" initial={{ y: shouldReduceMotion ? 0 : 28 }} animate={{ y: 0 }} exit={{ y: 18 }}>
        <header className="project-viewer__topbar"><span>PROJECT {String(project.id).toUpperCase()}</span><button type="button" onClick={onClose}>Back to Projects ×</button></header>
        <div className="grid flex-1 lg:grid-cols-[1.45fr_.75fr]">
          <div className="project-viewer__gallery" onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={handleTouchEnd}>
            <div className="project-viewer__main-image">
              {activeImage ? <button type="button" className="project-viewer__image-button" onClick={() => setLightboxOpen(true)} aria-label="Open image fullscreen">
                <img src={activeImage} alt={`${project.title} screenshot ${activeIndex + 1}`} />
                <span>Open full size ↗</span>
              </button> : <div className="project-viewer__empty"><strong>Screenshot needed</strong><span>No application screenshot is currently available for this project.</span></div>}
              {images.length > 1 && <><button type="button" className="project-viewer__control project-viewer__control--prev" onClick={() => move(-1)} aria-label="Previous screenshot">←</button><button type="button" className="project-viewer__control project-viewer__control--next" onClick={() => move(1)} aria-label="Next screenshot">→</button></>}
            </div>
            {images.length > 0 && <div className="project-viewer__thumbs" aria-label="Project screenshots">{images.map((image, index) => <button key={image} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => setActiveIndex(index)} aria-label={`Show screenshot ${index + 1}`}><img src={image} alt="" /></button>)}</div>}
            {images.length > 0 && <p className="project-viewer__caption">Screenshot {activeIndex + 1} of {images.length} · Select an image to inspect it at full size.</p>}
          </div>
          <div className="project-viewer__details">
            <p className="eyebrow">{project.category === 'ai' ? 'AI / MACHINE LEARNING' : 'SOFTWARE ENGINEERING'}</p>
            <h2 id="project-modal-title">{project.title}</h2>
            <p className="project-viewer__meta">{project.metadata}</p>
            <div className="project-viewer__tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <p className="project-viewer__summary">{project.summary}</p>
            {project.contributions?.length > 0 && <div className="project-viewer__contributions"><h3>Contributions</h3><ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul></div>}
            <div className="project-viewer__actions">{project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo ↗</a>}{project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">View Repository ↗</a>}</div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>{lightboxOpen && activeImage && <motion.div className="project-lightbox fixed inset-0 z-[100000]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <button type="button" className="project-lightbox__close" onClick={() => setLightboxOpen(false)} aria-label="Close fullscreen image">Close ×</button>
        <button type="button" className="project-lightbox__dismiss" onClick={() => setLightboxOpen(false)} aria-label="Close image viewer" />
        <img src={activeImage} alt={`${project.title} screenshot ${activeIndex + 1}`} />
        {images.length > 1 && <><button type="button" className="project-lightbox__arrow project-lightbox__arrow--prev" onClick={() => move(-1)} aria-label="Previous screenshot">←</button><button type="button" className="project-lightbox__arrow project-lightbox__arrow--next" onClick={() => move(1)} aria-label="Next screenshot">→</button></>}
      </motion.div>}</AnimatePresence>
    </motion.div>}
  </AnimatePresence>
}
