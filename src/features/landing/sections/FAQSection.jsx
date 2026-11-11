import { useState } from 'react'
import SectionHeading from '../../../components/ui/SectionHeading.jsx'
import Icon from '../../../components/ui/Icon.jsx'
import { faqData } from '../data/faqData.js'

export default function FAQSection() {
  const [openId, setOpenId] = useState(faqData[0].id)
  return (
    <section id="faq" className="section faq-section" aria-labelledby="faq-heading">
      <div className="container faq-layout">
        <SectionHeading id="faq-heading" label="Tanya TunasLab" description="Beberapa hal sederhana sebelum kamu mulai mengenal sistem budidaya kami.">Hal yang perlu<br />kamu ketahui.</SectionHeading>
        <div className="faq-list">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id
            return <div key={item.id} className={`faq-item ${isOpen ? 'is-open' : ''}`}><h3><button type="button" id={`faq-button-${item.id}`} aria-expanded={isOpen} aria-controls={`faq-answer-${item.id}`} onClick={() => setOpenId(isOpen ? null : item.id)}><span className="faq-number">0{index + 1}</span><span>{item.question}</span><Icon name={isOpen ? 'remove' : 'add'} /></button></h3><div className="faq-answer" id={`faq-answer-${item.id}`} role="region" aria-labelledby={`faq-button-${item.id}`} hidden={!isOpen}><p>{item.answer}</p></div></div>
          })}
        </div>
      </div>
    </section>
  )
}
