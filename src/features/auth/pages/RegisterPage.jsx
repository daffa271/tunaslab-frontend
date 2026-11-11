import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="prototype-page">
      <header className="prototype-header"><Link to="/" aria-label="TunasLab — kembali ke beranda"><img src="/images/brand/tunaslab-logo.png" alt="TunasLab" width="866" height="288" /></Link><Link className="prototype-back" to="/">Kembali ke beranda <span aria-hidden="true">↗</span></Link></header>
      <main className="register-layout">
        <div className="register-visual"><div className="register-visual-copy"><p>RUANG KECIL, LANGKAH BESAR</p><h1>Mulai perjalanan<br />tumbuhmu.</h1><span>Small Greens, Bigger Tomorrow.</span></div></div>
        <div className="register-content"><p className="section-label">PROTOTIPE PENDAFTARAN</p><h2>Senang bertemu denganmu.</h2><p>Ini adalah contoh tampilan pendaftaran. Akun belum dibuat dan informasi tidak akan disimpan atau dikirim.</p><form onSubmit={handleSubmit}><label htmlFor="register-name">Nama lengkap</label><input id="register-name" name="name" type="text" autoComplete="name" placeholder="Nama lengkap" required /><label htmlFor="register-email">Alamat email</label><input id="register-email" name="email" type="email" autoComplete="email" placeholder="Alamat email" required /><button type="submit" className="button button-primary register-submit">Lihat contoh pendaftaran <span aria-hidden="true">↗</span></button>{submitted && <p className="form-feedback" role="status">Ini hanya prototipe. Pendaftaran belum tersedia dan tidak ada data yang disimpan atau dikirim.</p>}</form><p className="register-demo-link">Ingin melihat sistemnya? <Link to="/dashboard">Jelajahi dashboard demo</Link></p></div>
      </main>
    </div>
  )
}
