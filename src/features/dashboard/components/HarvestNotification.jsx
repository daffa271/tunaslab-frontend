const dateFormatter = new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' })

export default function HarvestNotification({ notifications }) {
  return (
    <section className="notification-history" aria-labelledby="notification-heading">
      <div className="dashboard-section-heading"><div><p className="dashboard-kicker">RIWAYAT PENGINGAT</p><h2 id="notification-heading">Simulasi Notifikasi Telegram</h2></div><p>Pesan hanya ditampilkan di dashboard, tidak dikirim ke Telegram.</p></div>
      {notifications.length === 0 ? <p className="notification-empty">Belum ada notifikasi panen dalam simulasi ini.</p> : <ol className="notification-list">{notifications.map((notification) => <li key={notification.id} className="notification-item"><div className="notification-item-header"><strong>{notification.title}</strong><time dateTime={new Date(notification.triggeredAt).toISOString()}>{dateFormatter.format(notification.triggeredAt)}</time></div><p>{notification.message}</p><small>Small Greens, Bigger Tomorrow.</small></li>)}</ol>}
    </section>
  )
}
