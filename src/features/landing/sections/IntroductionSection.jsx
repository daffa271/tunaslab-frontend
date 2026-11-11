import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { landingImages } from '../data/imageData.js'

export default function IntroductionSection() {
  return (
    <section id="about" className="section introduction-section" aria-labelledby="about-heading" tabIndex={-1}>
      <div className="container introduction-layout">
        <figure className="introduction-image">
          <img src={landingImages.introduction} alt="Daun-daun microgreens segar dilihat dari dekat" loading="lazy" />
          <figcaption><span>DARI HAL KECIL</span><strong>Tumbuh menjadi<br />bagian keseharian.</strong></figcaption>
        </figure>
        <div className="introduction-copy">
          <SectionHeading id="about-heading" label="Mengenal TunasLab">Berawal dari Bibit. Bertumbuh Bersama Teknologi.</SectionHeading>
          <p className="body-large">Setiap pertumbuhan dimulai dari sebuah bibit. Melalui TunasLab, proses budidaya microgreens didukung perangkat ringkas dan teknologi digital yang membantu pengguna memantau estimasi panen serta mengatur pencahayaan tanaman.</p>
          <div className="introduction-note"><span className="small-rule" /><p>Microgreens adalah tanaman muda yang dipanen pada tahap awal pertumbuhannya. Dengan TunasLab, kegiatan menanam dapat dimulai dari ruang yang kamu miliki.</p></div>
          <a className="text-link" href="#product">Kenali perangkatnya <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  )
}
