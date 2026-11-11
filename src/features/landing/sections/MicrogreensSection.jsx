import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { microgreensData } from '../data/microgreensData.js'

export default function MicrogreensSection() {
  return (
    <section id="microgreens" className="section microgreens-section" aria-labelledby="microgreens-heading" tabIndex={-1}>
      <div className="container microgreens-layout">
        <div>
          <SectionHeading id="microgreens-heading" label="04 / Pilihan untuk tumbuh" description="Tiga pilihan bibit untuk memulai. Pilih melalui web, lalu ikuti estimasi siklus budidayanya.">Mulai dari<br />bibit pilihan.</SectionHeading>
          <ol className="variety-list">
            {microgreensData.map((variety, index) => <li key={variety.name}><span>0{index + 1}</span><div><h3>{variety.name}</h3><p>{variety.description}</p></div></li>)}
          </ol>
          <p className="microgreens-note">Estimasi panen mengikuti konfigurasi jenis bibit. Pertumbuhan tanaman tetap perlu diamati secara langsung.</p>
        </div>
        <figure className="microgreens-visual"><img src="/images/microgreens/microgreens-asset.jpg" alt="Foto jarak dekat hamparan microgreens hijau" width="2000" height="3000" loading="lazy" /><figcaption><span>KECIL BENTUKNYA.</span><strong>Besar kemungkinan<br />yang bisa tumbuh.</strong></figcaption></figure>
      </div>
    </section>
  )
}
