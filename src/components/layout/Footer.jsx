import { navigationData, technologyLinks } from '../../features/landing/data/navigationData.js'
import { contactData, contactHref } from '../../features/landing/data/contactData.js'
import Icon from '../ui/Icon.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand"><a className="footer-logo" href="#home" aria-label="TunasLab — Beranda"><img src="/images/brand/tunaslab-logo.png" alt="TunasLab" width="866" height="288" /></a><p className="footer-tagline">Small Greens, Bigger Tomorrow.</p><p>TunasLab menghadirkan sistem budidaya microgreens ringkas yang mengintegrasikan perangkat dan teknologi digital untuk mendukung budidaya di lingkungan perkotaan.</p></div>
          <nav aria-label="Navigasi footer"><h2>Navigasi</h2>{navigationData.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
          <nav aria-label="Produk dan teknologi"><h2>Produk &amp; Teknologi</h2>{technologyLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}<a href="#how-it-works">Cara Kerja</a><a href="#faq">Pertanyaan Umum</a></nav>
          <div className="footer-contact"><h2>Mari Terhubung</h2><p>Untuk percakapan tentang produk dan kolaborasi.</p>{contactHref ? <a href={contactHref}>{contactData.email || 'WhatsApp TunasLab'}</a> : <div className="footer-contact-status"><p>{contactData.emailPlaceholder}</p><p>{contactData.whatsappPlaceholder}</p><p>Kontak resmi sedang disiapkan.</p></div>}<a className="footer-collaboration" href="#contact">Jelajahi peluang bersama <Icon name="arrow_outward" /></a></div>
        </div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} TunasLab. Semua hak dilindungi.</p><p>Dikembangkan dengan dukungan PMW PENS.</p><a href="#home">Kembali ke atas <Icon name="arrow_upward" /></a></div>
      </div>
    </footer>
  )
}
