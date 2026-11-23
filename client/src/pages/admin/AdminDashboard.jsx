import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CARDS = [
  { key: 'tours', label: 'Total Tours', icon: '✈️', color: '#0EA5E9', path: '/admin/tours' },
  { key: 'hajj', label: 'Hajj & Umrah Packages', icon: '🕋', color: '#E8622A', path: '/admin/hajj' },
  { key: 'visa', label: 'Visa Countries', icon: '📋', color: '#10B981', path: '/admin/visa' },
  { key: 'enquiries', label: 'Enquiries', icon: '📩', color: '#8B5CF6', path: '/admin/enquiries' },
  { key: 'testimonials', label: 'Testimonials', icon: '⭐', color: '#F59E0B', path: '/admin/testimonials' },
  { key: 'chats', label: 'Chat Sessions', icon: '💬', color: '#EC4899', path: '/admin/chats' },
]

const QUICK = [
  { label: '+ Add Tour', path: '/admin/tours', color: '#0EA5E9' },
  { label: '+ Add Hajj Package', path: '/admin/hajj', color: '#E8622A' },
  { label: '+ Add Visa Country', path: '/admin/visa', color: '#10B981' },
  { label: '+ Add Testimonial', path: '/admin/testimonials', color: '#F59E0B' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, hajj: 0, visa: 0, enquiries: 0, testimonials: 0, chats: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const h = { Authorization: `Bearer ${token}` }

    const safe = (url, withAuth = false) =>
      axios.get(url, withAuth ? { headers: h } : {})
        .then(r => Array.isArray(r.data) ? r.data.length : 0)
        .catch(() => 0)

    Promise.all([
      safe(`${API_URL}/api/tours`),
      safe(`${API_URL}/api/hajj`),
      safe(`${API_URL}/api/visa`),
      safe(`${API_URL}/api/testimonials`),
      safe(`${API_URL}/api/enquiries`, true),
      safe(`${API_URL}/api/chat`, true),
    ])
      .then(([tours, hajj, visa, testimonials, enquiries, chats]) => {
        setStats({ tours, hajj, visa, testimonials, enquiries, chats })
      })
      .catch(() => setError('Could not load dashboard stats.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="dash">
      <header className="dash-head">
        <h1 className="dash-title">Dashboard</h1>
        <p className="dash-sub">Welcome back! Here's what's happening.</p>
      </header>

      {loading && (
        <div className="dash-grid">
          {CARDS.map(c => (
            <div key={c.key} className="skeleton" style={{ height: 140, borderRadius: 16 }} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="dash-empty">{error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="dash-grid">
            {CARDS.map(card => (
              <Link
                key={card.key}
                to={card.path}
                className="dash-card"
                style={{ '--card-color': card.color }}
              >
                <div className="dash-card-top">
                  <div className="dash-card-icon">{card.icon}</div>
                  <span className="dash-card-cta">View all →</span>
                </div>
                <div className="dash-card-value">{stats[card.key] ?? 0}</div>
                <div className="dash-card-label">{card.label}</div>
              </Link>
            ))}
          </div>

          <section className="dash-quick">
            <h2 className="dash-quick-title">Quick actions</h2>
            <div className="dash-quick-row">
              {QUICK.map(a => (
                <Link
                  key={a.label}
                  to={a.path}
                  className="dash-quick-btn"
                  style={{ '--qc': a.color }}
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}

      <style>{`
        .dash { max-width: 1200px; margin: 0 auto; }
        .dash-head { margin-bottom: 22px; }
        .dash-title {
          font-size: 22px; font-weight: 800;
          color: var(--admin-text); margin: 0 0 4px;
        }
        .dash-sub { font-size: 13px; color: var(--admin-muted); margin: 0; }

        .dash-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        .dash-card {
          display: block;
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          padding: 20px;
          text-decoration: none;
          transition: border-color .2s, transform .2s, box-shadow .2s;
        }
        .dash-card:hover {
          border-color: var(--card-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        .dash-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }
        .dash-card-icon {
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          border-radius: 12px;
          background: color-mix(in srgb, var(--card-color) 15%, transparent);
        }
        .dash-card-cta {
          font-size: 11px; font-weight: 700;
          color: var(--card-color);
          background: color-mix(in srgb, var(--card-color) 12%, transparent);
          padding: 4px 10px; border-radius: 999px;
        }
        .dash-card-value {
          font-size: 32px; font-weight: 800;
          color: var(--admin-text); line-height: 1; margin-bottom: 6px;
        }
        .dash-card-label {
          font-size: 12.5px; font-weight: 500; color: var(--admin-muted);
        }

        .dash-quick {
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          padding: 20px;
        }
        .dash-quick-title {
          font-size: 14px; font-weight: 700;
          color: var(--admin-text); margin: 0 0 14px;
        }
        .dash-quick-row {
          display: flex; flex-wrap: wrap; gap: 10px;
        }
        .dash-quick-btn {
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 12.5px; font-weight: 700;
          text-decoration: none;
          color: var(--qc);
          background: color-mix(in srgb, var(--qc) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--qc) 30%, transparent);
          transition: all .2s;
        }
        .dash-quick-btn:hover {
          background: var(--qc); color: #fff;
        }

        .dash-empty {
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          padding: 40px 20px;
          text-align: center;
          color: var(--admin-muted);
          font-size: 13px;
        }

        @media (min-width: 640px) {
          .dash-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .dash-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
          .dash-title { font-size: 24px; }
        }
      `}</style>
    </div>
  )
}