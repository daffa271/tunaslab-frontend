import { useState } from 'react'
import Button from '../../../components/ui/Button.jsx'
import { contactData, contactHref } from '../data/contactData.js'

export default function ContactSection() {
  const [showContact, setShowContact] = useState(false)
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading" tabIndex={-1}>
      <div className="container contact-layout">
        <div><p className="section-label">Mari tumbuh bersama</p><h2 id="contact-heading">Ruang kecil, peluang<br />tumbuh yang lebih besar.</h2><p>Kenali TunasLab lebih dekat. Kami terbuka untuk berdiskusi mengenai produk, pengembangan, dan peluang kolaborasi.</p></div>
        <div className="contact-action">
          {contactHref
            ? <Button href={contactHref} variant="light">Hubungi Tim TunasLab</Button>
            : <><Button variant="light" aria-expanded={showContact} aria-controls="contact-information" onClick={() => setShowContact(!showContact)}>Hubungi Tim TunasLab</Button><p className="contact-availability">Kanal kontak resmi segera tersedia.</p><div id="contact-information" className="contact-information" hidden={!showContact}><p>{contactData.unavailableMessage}</p></div></>}
        </div>
      </div>
    </section>
  )
}
