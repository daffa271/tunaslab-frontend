import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { productData } from '../data/storyData.js'

export default function ProductSection() {
  return (
    <section id="product" className="section product-section" aria-labelledby="product-heading" tabIndex={-1}>
      <div className="container">
        <SectionHeading id="product-heading" label="03 / Kenali perangkatnya">Dirancang untuk budidaya<br />di ruang terbatas.</SectionHeading>
        <div className="product-layout">
          <figure className="product-study">
            <div className="product-study-circle" aria-hidden="true" />
            <img src="/images/product/tunaslab-device.png" alt="Render asli TunasLab Smart Tray, memperlihatkan tray tanam, lampu, display depan, dan tombol fisik" width="500" height="500" loading="lazy" />
            <figcaption><span>TunasLab Smart Tray</span><span>Perangkat + sistem digital</span></figcaption>
          </figure>
          <ol className="product-components">
            {productData.map((part, index) => <li key={part.name}><span>0{index + 1}</span><div><h3>{part.name}</h3><p>{part.description}</p></div></li>)}
          </ol>
        </div>
      </div>
    </section>
  )
}
