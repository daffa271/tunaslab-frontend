import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../features/landing/pages/HomePage.jsx'
import RegisterPage from '../features/auth/pages/RegisterPage.jsx'
import DashboardPage from '../features/dashboard/pages/DashboardPage.jsx'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function NotFoundPage() {
  return <main className="standalone-message"><p className="section-label">Halaman tidak ditemukan</p><h1>Ruang ini belum ditanami.</h1><a className="button button-primary" href="/">Kembali ke beranda</a></main>
}
