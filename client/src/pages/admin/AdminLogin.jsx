import API_URL from '../../config/api'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (loading) return
    if (!form.email.trim() || !form.password) {
      setError('Please enter both email and password.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form)
      if (!res.data?.token) throw new Error('no token')
      localStorage.setItem('adminToken', res.data.token)
      navigate('/admin')
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid email or password'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-head">
          <img src="/logo.webp" alt="Discover Travel" className="login-logo" />
          <h1 className="login-title">Admin Panel</h1>
          <p className="login-sub">Discover Travel &amp; Tours</p>
        </div>

        {error && (
          <div className="login-error" role="alert">
            ⚠️ {error}
          </div>
        )}

        <div className="login-field">
          <label className="login-label" htmlFor="admin-email">Email address</label>
          <input
            id="admin-email"
            type="email"
            placeholder="admin@email.com"
            className="login-input"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoComplete="email"
            autoFocus
          />
        </div>

        <div className="login-field">
          <label className="login-label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            placeholder="••••••••"
            className="login-input"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoComplete="current-password"
          />
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in…' : 'Login to Admin Panel'}
        </button>

        <Link to="/" className="login-back">← Back to website</Link>
      </div>

      <style>{`
        .login-wrap {
          min-height: 100vh;
          background: var(--admin-bg);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          font-family: var(--font-sans);
        }
        .login-card {
          width: 100%; max-width: 420px;
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 20px;
          padding: 28px 22px;
          box-shadow: 0 32px 80px rgba(0, 0, 0, 0.4);
        }
        .login-head { text-align: center; margin-bottom: 24px; }
        .login-logo {
          width: 64px; height: 64px; object-fit: contain;
          margin: 0 auto 12px; display: block;
        }
        .login-title {
          font-size: 20px; font-weight: 800; color: var(--admin-text);
          margin: 0 0 4px;
        }
        .login-sub { font-size: 12.5px; color: var(--admin-muted); margin: 0; }
        .login-error {
          background: rgba(232, 98, 42, 0.1);
          border: 1px solid rgba(232, 98, 42, 0.3);
          border-radius: 10px;
          padding: 11px 14px;
          margin-bottom: 16px;
          font-size: 13px; color: var(--brand); font-weight: 600;
        }
        .login-field { margin-bottom: 14px; }
        .login-label {
          display: block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--admin-muted); margin-bottom: 6px;
        }
        .login-input {
          width: 100%;
          min-height: 46px;
          padding: 11px 14px;
          background: var(--admin-inp);
          border: 1.5px solid var(--admin-border);
          border-radius: 10px;
          font-size: 14px;
          color: var(--admin-inp-text);
          font-family: var(--font-sans);
          outline: none;
          transition: border-color .2s;
        }
        .login-input:focus { border-color: var(--brand); }
        .login-btn {
          width: 100%;
          min-height: 48px;
          margin-top: 8px;
          background: var(--brand);
          border: 0; border-radius: 10px;
          color: #fff; font-size: 13.5px; font-weight: 700;
          cursor: pointer;
          font-family: var(--font-sans);
          transition: background .2s, transform .15s;
        }
        .login-btn:hover:not(:disabled) { background: var(--brand-2); }
        .login-btn:active:not(:disabled) { transform: scale(0.98); }
        .login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .login-back {
          display: block; text-align: center;
          margin-top: 16px;
          font-size: 12px;
          color: var(--admin-muted);
          text-decoration: none;
        }
        .login-back:hover { color: var(--brand); }
        @media (min-width: 480px) {
          .login-card { padding: 36px 32px; }
        }
      `}</style>
    </div>
  )
}