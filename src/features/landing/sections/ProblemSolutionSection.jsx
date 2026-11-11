import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import Icon from '../../../components/ui/Icon.jsx'
import { problemData } from '../data/storyData.js'

export default function ProblemSolutionSection() {
  return (
    <section className="section problem-section" aria-labelledby="problem-heading">
      <div className="container problem-layout">
        <div>
          <SectionHeading id="problem-heading" label="Dari tantangan, tumbuh solusi">Ruang terbatas bukan berarti sulit menanam.</SectionHeading>
          <p className="section-description">TunasLab membantu proses budidaya microgreens melalui perangkat ringkas, pemantauan digital, estimasi waktu panen, dan kontrol pencahayaan.</p>
        </div>
        <div className="problem-list">
          <div className="problem-list-label"><span>TANTANGAN SEHARI-HARI</span><span>PENDEKATAN TUNASLAB</span></div>
          {problemData.map((item, index) => (
            <article className="problem-row" key={item.problem}>
              <span className="row-number">0{index + 1}</span><h3>{item.problem}</h3><Icon name="arrow_forward" /><p>{item.solution}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
