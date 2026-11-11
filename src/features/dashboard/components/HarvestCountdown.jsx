import { useState } from 'react'

const dateFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' })

export default function HarvestCountdown({ cycle, selectedSeed, remaining, onReset, onFinish, onSimulateCompletion }) {
  const [confirmReset, setConfirmReset] = useState(false)
  const growing = cycle?.status === 'growing'
  const completed = cycle?.status === 'completed'
  const finished = cycle?.status === 'finished'
  const units = remaining ? [['Hari', remaining.days], ['Jam', remaining.hours], ['Menit', remaining.minutes], ['Detik', remaining.seconds]] : []

  return (
    <section className="dashboard-panel dashboard-harvest countdown-panel" aria-labelledby="demo-harvest-heading">
      <div className="countdown-heading"><div><p className="dashboard-kicker">HARVEST COUNTDOWN</p><h2 id="demo-harvest-heading">Setiap pertumbuhan<br />punya waktunya.</h2></div><span className="countdown-status">{growing ? 'Sedang tumbuh' : completed ? 'Siap Dipanen' : finished ? 'Siklus selesai' : 'Belum dimulai'}</span></div>
      {!cycle && <p className="countdown-empty">Belum ada siklus penanaman. Pilih bibit dan mulai siklus untuk melihat estimasi panen.</p>}
      {cycle && <div className="cycle-summary"><p>Bibit <strong>{selectedSeed?.name}</strong></p><p>Estimasi <strong>{cycle.harvestDays} hari</strong></p><p>Mulai <strong>{dateFormatter.format(cycle.startedAt)}</strong></p><p>Target estimasi <strong>{dateFormatter.format(cycle.harvestAt)}</strong></p></div>}
      {growing && <><p className="countdown-label">SISA WAKTU ESTIMASI</p><div className="countdown-units" aria-label="Sisa waktu estimasi panen" aria-live="off">{units.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}</div><p className="countdown-help">Waktu dihitung dari target panen dan dapat berubah mengikuti jam perangkat Anda.</p></>}
      {(completed || finished) && <div className="harvest-ready" role="status"><strong>Estimasi Waktu Panen Tercapai</strong><p>Tanaman Anda telah mencapai estimasi waktu panen. Periksa kondisi tanaman sebelum melakukan pemanenan.</p></div>}
      {completed && <button type="button" className="button button-light" onClick={onFinish}>Selesaikan Siklus</button>}
      {growing && <div className="cycle-controls">{!confirmReset ? <button type="button" className="countdown-text-button" onClick={() => setConfirmReset(true)}>Reset siklus</button> : <div className="reset-confirmation" role="group" aria-label="Konfirmasi reset siklus"><p>Reset akan menghapus siklus yang sedang berjalan. Lanjutkan?</p><div><button type="button" className="button button-light" onClick={() => { onReset(); setConfirmReset(false) }}>Ya, reset siklus</button><button type="button" className="countdown-text-button" onClick={() => setConfirmReset(false)}>Batal</button></div></div>}{onSimulateCompletion && <button type="button" className="countdown-text-button dev-test-button" onClick={() => { setConfirmReset(false); onSimulateCompletion() }}>Uji panen sekarang (khusus development)</button>}</div>}
    </section>
  )
}
