import { seedCatalog } from '../data/seedCatalog.js'

export default function SeedSelector({ selectedSeed, cycle, onSelect, onStart, onNewCycle }) {
  const locked = Boolean(cycle)
  return (
    <section className="seed-section" aria-labelledby="seed-heading">
      <div className="dashboard-section-heading"><div><p className="dashboard-kicker">PILIHAN BUDIDAYA</p><h2 id="seed-heading">Pilih bibit untuk ditanam.</h2></div><p>Pilih salah satu bibit, lalu mulai siklus setelah kamu menanamnya.</p></div>
      <div className="seed-grid">
        {seedCatalog.map((seed, index) => {
          const selected = selectedSeed?.id === seed.id
          return <article key={seed.id} className={`seed-option ${selected ? 'is-selected' : ''}`}><div className="seed-option-top"><span>0{index + 1}</span>{selected && <span className="seed-selected-label">Dipilih</span>}</div><h3>{seed.name}</h3><p>{seed.description}</p><div className="seed-estimate"><strong>{seed.harvestDays} hari</strong><span>Acuan {seed.referenceRange}</span></div><button type="button" className="seed-select-button" aria-pressed={selected} disabled={locked} onClick={() => onSelect(seed.id)}>Pilih Bibit</button></article>
        })}
      </div>
      <p className="estimate-note">Estimasi merupakan acuan awal dan dapat berbeda berdasarkan varietas benih serta kondisi budidaya. Angka ini merupakan data demo sementara, belum dikalibrasi pada perangkat TunasLab.</p>
      {!cycle && <div className="seed-action"><div>{selectedSeed ? <><strong>{selectedSeed.name} dipilih</strong><p>Estimasi {selectedSeed.harvestDays} hari · rentang acuan {selectedSeed.referenceRange}</p></> : <p>Belum ada bibit yang dipilih.</p>}</div><button type="button" className="button button-primary" disabled={!selectedSeed} onClick={onStart}>Mulai Siklus Tanam</button></div>}
      {cycle?.status === 'growing' && <p className="seed-locked-note">Siklus sedang berjalan. Selesaikan atau reset siklus sebelum memilih bibit lain.</p>}
      {cycle?.status === 'completed' && <p className="seed-locked-note">Estimasi panen tercapai. Selesaikan siklus sebelum memilih bibit lain.</p>}
      {cycle?.status === 'finished' && <div className="seed-action"><div><strong>Siklus selesai</strong><p>Siap mencoba bibit lain dalam simulasi?</p></div><button type="button" className="button button-primary" onClick={onNewCycle}>Mulai Penanaman Baru</button></div>}
    </section>
  )
}
