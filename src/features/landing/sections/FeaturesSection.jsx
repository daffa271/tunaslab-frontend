import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import Icon from '../../../components/ui/Icon.jsx'
import { featureData } from '../data/featureData.js'

export default function FeaturesSection() {
  return (
    <section id="technology" className="section features-section" aria-labelledby="technology-heading" tabIndex={-1}>
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading id="technology-heading" label="02 / Teknologi yang mendampingi">Teknologi sederhana,<br />perawatan lebih terarah.</SectionHeading>
          <p className="section-description">Kamu tetap merawat dan mengamati tanaman. TunasLab membantu menjaga langkah-langkahnya tetap terarah.</p>
        </div>
        <div className="features-grid">
          {featureData.map((feature, index) => (
            <article key={feature.id} id={feature.id} className={`feature feature-${index + 1}`}>
              <div className="feature-top"><span className="feature-number">0{index + 1}</span><Icon name={feature.icon} /></div>
              {index === 0 && <div className="feature-photo" aria-hidden="true" />}
              <h3>{feature.name}</h3>
              <p>{feature.description}</p>
              {feature.detail && <p className="feature-detail">{feature.detail}</p>}
              {index === 3 && <div className="connection-line" aria-hidden="true"><span>Perangkat</span><span />Wi-Fi<span /><span>Web</span></div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
