import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const menuItems = [
  { id: 'about', name: 'About' }, { id: 'projects', name: 'Projects' }, { id: 'experience', name: 'Experience' },
  { id: 'skills', name: 'Skills' }, { id: 'contact', name: 'Contact' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-35% 0px -55% 0px' })
    menuItems.forEach(({ id }) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [])

  const goTo = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return <>
    <header className="site-nav">
      <button type="button" className="site-nav__mark" onClick={() => goTo('hero')} aria-label="Back to home"><span>BA</span><i /></button>
      <nav className="site-nav__links" aria-label="Main navigation">{menuItems.map((item) => <button key={item.id} type="button" onClick={() => goTo(item.id)} className={active === item.id ? 'is-active' : ''}>{item.name}</button>)}</nav>
      <a className="site-nav__cv" href="/Binali_Assalaarachchi_CV.pdf" download="Binali_Assalaarachchi_CV.pdf">Résumé <span>↗</span></a>
      <button type="button" className="site-nav__menu" onClick={() => setOpen(true)} aria-label="Open navigation">Menu <span>+</span></button>
    </header>
    <AnimatePresence>{open && <motion.div className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button className="mobile-nav__close" onClick={() => setOpen(false)} type="button">Close ×</button><div>{menuItems.map((item, index) => <motion.button key={item.id} type="button" onClick={() => goTo(item.id)} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>{item.name}<span>0{index + 1}</span></motion.button>)}</div></motion.div>}</AnimatePresence>
  </>
}
