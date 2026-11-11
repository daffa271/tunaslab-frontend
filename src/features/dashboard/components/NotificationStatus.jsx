import Icon from '../../../components/ui/Icon.jsx'

export default function NotificationStatus() {
  return <section className="reminder-panel" aria-labelledby="reminder-heading"><Icon name="water_drop" /><div><p className="dashboard-kicker">PENGINGAT PENYIRAMAN</p><h2 id="reminder-heading">Perawatan tetap di tanganmu.</h2><p>Pengingat harian melalui Telegram direncanakan untuk membantu rutinitas. Pada demo ini tidak ada pesan yang dikirim; penyiraman dilakukan secara manual.</p></div></section>
}
