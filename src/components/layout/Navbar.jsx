import { useEffect, useRef, useState } from 'react'
import { navigationData } from '../../features/landing/data/navigationData.js'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 20)
  const menuButton = useRef(null)
  const header = useRef(null)
  const pendingSection = useRef(null)
  const visibleSections = useRef(new Set())

  useEffect(() => {
    let previous = window.scrollY > 20
    function updateScrollState() {
      const scrolled = window.scrollY > 20
      if (scrolled !== previous) {
        previous = scrolled
        setIsScrolled(scrolled)
      }
    }
    window.addEventListener('scroll', updateScrollState, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  useEffect(() => {
    const visible = visibleSections.current
    const sectionIds = [...navigationData.map(({ href }) => href.slice(1)), 'contact']
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id)
        else visible.delete(entry.target.id)
      })

      // Keep the clicked item highlighted while smooth scrolling passes other sections.
      if (pendingSection.current) {
        if (!visible.has(pendingSection.current)) return
        pendingSection.current = null
      }

      const focusLine = window.innerHeight * 0.2
      const current = [...visible]
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .sort((a, b) => Math.abs(a.getBoundingClientRect().top - focusLine) - Math.abs(b.getBoundingClientRect().top - focusLine))[0]
      if (current) setActiveSection(current.id === 'contact' ? null : current.id)
    }, { rootMargin: '-20% 0px -70% 0px' })
    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    function cancelPendingNavigation() { pendingSection.current = null }
    function cancelOnScrollKey(event) {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancelPendingNavigation()
    }
    window.addEventListener('wheel', cancelPendingNavigation, { passive: true })
    window.addEventListener('touchstart', cancelPendingNavigation, { passive: true })
    window.addEventListener('pointerdown', cancelPendingNavigation, { passive: true })
    window.addEventListener('keydown', cancelOnScrollKey)
    return () => {
      observer.disconnect()
      visible.clear()
      window.removeEventListener('wheel', cancelPendingNavigation)
      window.removeEventListener('touchstart', cancelPendingNavigation)
      window.removeEventListener('pointerdown', cancelPendingNavigation)
      window.removeEventListener('keydown', cancelOnScrollKey)
    }
  }, [])

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    function closeOutside(event) {
      if (!header.current?.contains(event.target)) setIsMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1051px)')
    const closeOnDesktop = () => { if (desktop.matches) setIsMenuOpen(false) }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [isMenuOpen])

  function handleNavigation(event) {
    setIsMenuOpen(false)
    const sectionId = event.currentTarget.hash.slice(1)
    pendingSection.current = visibleSections.current.has(sectionId) ? null : sectionId
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.focus({ preventScroll: true })
  }

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`} ref={header}>
      <a className="skip-link" href="#main">Langsung ke konten</a>
      <nav className="container navbar" aria-label="Navigasi utama">
        <a href="#home" className="navbar-brand" aria-label="TunasLab — Beranda" onClick={handleNavigation}>
          <img src="/images/brand/tunaslab-logo.png" alt="TunasLab — Small Greens, Bigger Tomorrow" width="857" height="291" />
        </a>
        <button ref={menuButton} type="button" className="mobile-menu-button" aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={isMenuOpen} aria-controls="main-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Icon name={isMenuOpen ? 'close' : 'menu'} />
        </button>
        <div id="main-navigation" className={`navbar-menu ${isMenuOpen ? 'is-open' : ''}`}>
          <div className="navbar-links">
            {navigationData.map(({ label, href }) => (
              <a key={href} href={href} className={`navbar-link ${activeSection === href.slice(1) ? 'is-active' : ''}`} aria-current={activeSection === href.slice(1) ? 'location' : undefined} onClick={handleNavigation}>{label}</a>
            ))}
          </div>
          <div className="navbar-actions">
            <Link className="nav-register" to="/register" onClick={() => setIsMenuOpen(false)}>Daftar</Link>
            <Link className="button button-primary navbar-login" to="/dashboard" onClick={() => setIsMenuOpen(false)}>Masuk</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
