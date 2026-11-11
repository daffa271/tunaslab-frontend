import Button from '../../../components/ui/Button.jsx'
import { landingImages } from '../data/imageData.js'

export default function HeroSection() {
  return (
    <section id="home" className="hero-section" aria-labelledby="hero-heading" tabIndex={-1}>
      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-intro"><span />Menanam segar, dimulai dari ruang kecil.</p>
          <h1 id="hero-heading" className="hero-title"><span>Small Greens,</span><span className="hero-title-accent">Bigger Tomorrow.</span></h1>
          <p className="hero-description">TunasLab menghadirkan perangkat budidaya microgreens yang ringkas dengan dukungan sistem digital untuk membantu pengguna memilih bibit, memantau estimasi waktu panen, dan mengatur pencahayaan tanaman melalui web.</p>
          <div className="hero-actions">
            <Button href="#about">Kenali TunasLab</Button>
            <Button href="#how-it-works" variant="secondary" icon="arrow_downward">Lihat Cara Kerja</Button>
          </div>
          <p className="hero-note">Berawal dari bibit. Bertumbuh bersama teknologi.</p>
        </div>
        <figure className="hero-visual">
          <div className="hero-photo" aria-hidden="true"><img src={landingImages.hero} alt="" /></div>
          <img src="/images/product/tunaslab-device.png" alt="Perangkat asli TunasLab dengan growing tray, LED di atas tanaman, display depan, dan tombol power" className="hero-product-image" width="508" height="492" fetchPriority="high" />
          <figcaption className="hero-product-caption"><span className="caption-line" /><div>TunasLab Smart Tray<small>Perangkat budidaya ringkas</small></div></figcaption>
        </figure>
      </div>
      <div className="container hero-bottom">
        <p>Dirancang untuk keseharian.<br /><strong>Dihubungkan oleh teknologi.</strong></p>
        <div>Budidaya ringkas</div>
        <div>Estimasi waktu panen</div>
        <div>Kontrol LED melalui web</div>
      </div>
    </section>
  )
}
