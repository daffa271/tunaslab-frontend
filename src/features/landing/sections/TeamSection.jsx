import { useState } from 'react'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import { availablePortraits, teamData } from '../data/teamData.js'

function TeamPortrait({ member, index }) {
  const [failed, setFailed] = useState(false)
  const hasImage = availablePortraits.has(member.image) && !failed
  return (
    <div className={`team-portrait portrait-${index + 1}`}>
      {hasImage
        ? <img src={member.image} alt={`Foto ${member.name}`} width="400" height="500" loading="lazy" onError={() => setFailed(true)} />
        : <div className="portrait-placeholder" role="img" aria-label={`Foto ${member.name} belum tersedia, inisial ${member.initials}`}><span className="portrait-number" aria-hidden="true">0{index + 1}</span><span className="portrait-initials" aria-hidden="true">{member.initials}</span><span className="portrait-caption" aria-hidden="true">TUNASLAB TEAM</span></div>}
    </div>
  )
}

export default function TeamSection() {
  return (
    <section id="team" className="section team-section" aria-labelledby="team-heading" tabIndex={-1}>
      <div className="container">
        <div className="section-heading-row"><SectionHeading id="team-heading" label="Orang-orang di balik gagasan">Tim di balik TunasLab.</SectionHeading><p className="section-description">Lima anggota, satu semangat: membawa ide budidaya di ruang terbatas menjadi inovasi yang lebih dekat dengan keseharian.</p></div>
        <div className="team-grid">{teamData.map((member, index) => <article className="team-profile" key={member.name}><TeamPortrait member={member} index={index} /><h3>{member.name}</h3><p>{member.role}</p></article>)}</div>
      </div>
    </section>
  )
}
