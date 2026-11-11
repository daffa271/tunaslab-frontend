import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import Icon from '../../../components/ui/Icon.jsx'
import { stepsData } from '../data/storyData.js'

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section how-section" aria-labelledby="how-heading" tabIndex={-1}>
      <div className="container">
        <SectionHeading id="how-heading" label="Dari menyalakan hingga memanen" className="heading-centered">Mulai menanam dalam beberapa langkah.</SectionHeading>
        <ol className="steps-list">
          {stepsData.map((step, index) => <li key={step.name}><div className="step-icon" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div><h3>{step.name}</h3><p>{step.description}</p></li>)}
        </ol>
        <p className="care-note"><Icon name="water_drop" />Di setiap siklus, penyiraman dan pemanenan tetap dilakukan secara manual.</p>
      </div>
    </section>
  )
}
