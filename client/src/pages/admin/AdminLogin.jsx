import API_URL from '../../config/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form)
      localStorage.setItem('adminToken', res.data.token)
      navigate('/admin')
    } catch {
      setError('Invalid email or password')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'var(--admin-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Montserrat,sans-serif', padding: 24,
    }}>
      <div style={{
        width: '100%', maxWidth: 420,
        background: 'var(--admin-bg2)', borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.08)',
        padding: 40,
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logo.webp" alt="Discover Travel" style={{ width: 72, height: 72, objectFit: 'contain', margin: '0 auto 16px', display: 'block' }} />
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Admin Panel</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Discover Travel & Tours</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(232,98,42,0.1)', border: '1px solid rgba(232,98,42,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#E8622A', fontWeight: 600 }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Email Address</label>
          <input
            type="email" placeholder="admin@email.com"
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#fff', fontFamily: 'Montserrat,sans-serif', outline: 'none' }}
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>Password</label>
          <input
            type="password" placeholder="••••••••"
            style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '12px 16px', fontSize: 13, color: '#fff', fontFamily: 'Montserrat,sans-serif', outline: 'none' }}
            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <button
          onClick={handleLogin} disabled={loading}
          style={{ width: '100%', background: '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '14px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Logging in...' : 'Login to Admin Panel'}
        </button>
      </div>
    </div>
  )
}


