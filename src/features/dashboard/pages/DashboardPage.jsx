import { Link } from 'react-router-dom'
import SeedSelector from '../components/SeedSelector.jsx'
import HarvestCountdown from '../components/HarvestCountdown.jsx'
import LEDControl from '../components/LEDControl.jsx'
import NotificationStatus from '../components/NotificationStatus.jsx'
import HarvestNotification from '../components/HarvestNotification.jsx'
import useHarvestCountdown from '../hooks/useHarvestCountdown.js'

export default function DashboardPage() {
  const demo = useHarvestCountdown()
  return (
    <div className="prototype-page">
      <header className="prototype-header"><Link to="/" aria-label="TunasLab — kembali ke beranda"><img src="/images/brand/tunaslab-logo.png" alt="TunasLab" width="866" height="288" /></Link><Link className="prototype-back" to="/">Kembali ke beranda <span aria-hidden="true">↗</span></Link></header>
      <main className="dashboard-main">
        <div className="demo-banner"><strong>Mode Demo — Data Simulasi</strong><span>Tidak terhubung ke perangkat ESP32, Firebase, atau Telegram.</span></div>
        {demo.storageUnavailable && <p className="storage-warning" role="alert">Penyimpanan lokal tidak tersedia. Siklus hanya tersimpan selama halaman ini terbuka.</p>}
        <div className="dashboard-heading"><div><p className="section-label">My Growing System</p><h1>Ruang tumbuh digitalmu.</h1><p>Pantau contoh siklus budidaya microgreens secara sederhana.</p></div><span className="demo-status">Simulasi</span></div>
        <div className="dashboard-grid"><HarvestCountdown cycle={demo.cycle} selectedSeed={demo.selectedSeed} remaining={demo.remaining} onReset={demo.clearCycle} onFinish={demo.finishCycle} onSimulateCompletion={demo.simulateCompletion} /><LEDControl /></div>
        <SeedSelector selectedSeed={demo.selectedSeed} cycle={demo.cycle} onSelect={demo.selectSeed} onStart={demo.startCycle} onNewCycle={demo.clearCycle} />
        <NotificationStatus />
        <HarvestNotification notifications={demo.notifications} />
      </main>
    </div>
  )
}
