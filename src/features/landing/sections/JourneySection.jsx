import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { journeyData } from '../data/storyData.js'

export default function JourneySection() {
  return (
    <section className="section journey-section" aria-labelledby="journey-heading">
      <div className="container">
        <div className="journey-top"><SectionHeading id="journey-heading" label="05 / Perjalanan TunasLab">Dari gagasan<br />menuju inovasi.</SectionHeading><p className="section-description">Dikembangkan oleh tim Program Mahasiswa Wirausaha kategori perguruan tinggi. Sebuah langkah untuk mendekatkan budidaya dengan kehidupan perkotaan.</p></div>
        <ol className="journey-list">{journeyData.map((item, index) => <li key={item.name}><span className="journey-index">0{index + 1}</span><h3>{item.name}</h3><p>{item.description}</p></li>)}</ol>
        <div className="credibility-strip">
          <div className="funding-amount"><span>DUKUNGAN PMW PENS</span><strong>Rp4.800.000</strong><p>TunasLab memperoleh dukungan pendanaan Program Mahasiswa Wirausaha PENS sebesar Rp4.800.000.</p></div>
          <div className="showcase-note"><span>INOVBOYO SHOWCASE 2026</span><h3>Memperkenalkan gagasan,<br />membuka percakapan.</h3><p>TunasLab tercatat dalam Inovboyo Showcase 2026 bersama BRIDA Kota Surabaya pada tahap inisiatif, perancangan konsep, dan persiapan inovasi.</p></div>
        </div>
      </div>
    </section>
  )
}
