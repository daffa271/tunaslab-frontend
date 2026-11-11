import { useState } from 'react'

export default function LEDControl() {
  const [lightOn, setLightOn] = useState(false)
  return (
    <section className="dashboard-panel dashboard-device" aria-labelledby="demo-led-heading">
      <div className="device-heading"><p className="dashboard-kicker">PERANGKAT DEMO</p><span>Simulasi</span></div>
      <div className="dashboard-device-image"><img src="/images/product/tunaslab-device.png" alt="Render perangkat TunasLab" width="508" height="492" /></div>
      <div className="dashboard-device-row"><div><h2 id="demo-led-heading">LED grow light</h2><p>{lightOn ? 'Aktif dalam simulasi' : 'Nonaktif dalam simulasi'}</p></div><button type="button" className={`demo-switch ${lightOn ? 'is-on' : ''}`} role="switch" aria-checked={lightOn} aria-label="Simulasi kontrol LED grow light" onClick={() => setLightOn(!lightOn)}><span /></button></div>
      <p className="dashboard-disclaimer">Status perangkat dan kontrol LED hanya simulasi, tidak terhubung ke perangkat fisik.</p>
    </section>
  )
}
