import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const StatCard = ({ label, value, icon, color, path }) => (
  <Link to={path} style={{ textDecoration: 'none' }}>
    <div style={{
      background: 'var(--admin-bg2)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: 16, padding: 24, transition: 'all 0.2s', cursor: 'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = color + '50'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ width: 44, height: 44, background: color + '20', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{icon}</div>
        <span style={{ fontSize: 11, color: color, fontWeight: 700, background: color + '15', padding: '4px 10px', borderRadius: 20 }}>View all →</span>
      </div>
      <p style={{ fontSize: 32, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>{value}</p>
      <p style={{ fontSize: 12, color: 'var(--admin-muted)', fontWeight: 500 }}>{label}</p>
    </div>
  </Link>
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, enquiries: 0, chats: 0, hajj: 0, visa: 0, testimonials: 0 })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const h = { Authorization: `Bearer ${token}` }
    Promise.all([
      axios.get(`${API_URL}/api/tours`, { headers: h }),
      axios.get(`${API_URL}/api/enquiries`, { headers: h }),
      axios.get(`${API_URL}/api/chat`, { headers: h }),
      axios.get(`${API_URL}/api/hajj`),
      axios.get(`${API_URL}/api/visa`),
      axios.get(`${API_URL}/api/testimonials`),
    ]).then(([tours, enq, chats, hajj, visa, testi]) => {
      setStats({ tours: tours.data.length, enquiries: enq.data.length, chats: chats.data.length, hajj: hajj.data.length, visa: visa.data.length, testimonials: testi.data.length })
    }).catch(() => {})
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Welcome back! Here's what's happening.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Tours" value={stats.tours} icon="✈️" color="#0ea5e9" path="/admin/tours" />
        <StatCard label="Hajj & Umrah Packages" value={stats.hajj} icon="🕋" color="#E8622A" path="/admin/hajj" />
        <StatCard label="Visa Countries" value={stats.visa} icon="📋" color="#10b981" path="/admin/visa" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
        <StatCard label="Enquiries" value={stats.enquiries} icon="📩" color="#8b5cf6" path="/admin/enquiries" />
        <StatCard label="Testimonials" value={stats.testimonials} icon="⭐" color="#f59e0b" path="/admin/testimonials" />
        <StatCard label="Chat Sessions" value={stats.chats} icon="💬" color="#ec4899" path="/admin/chats" />
      </div>

      {/* Quick actions */}
      <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 24 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--admin-text)', marginBottom: 16 }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: '+ Add Tour', path: '/admin/tours', color: '#0ea5e9' },
            { label: '+ Add Hajj Package', path: '/admin/hajj', color: '#E8622A' },
            { label: '+ Add Visa Country', path: '/admin/visa', color: '#10b981' },
            { label: '+ Add Testimonial', path: '/admin/testimonials', color: '#f59e0b' },
          ].map(a => (
            <Link key={a.label} to={a.path} style={{
              textDecoration: 'none', background: a.color + '15',
              border: `1px solid ${a.color}30`, color: a.color,
              padding: '10px 18px', borderRadius: 10, fontSize: 12, fontWeight: 700,
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = a.color; e.currentTarget.style.color = '#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background = a.color + '15'; e.currentTarget.style.color = a.color }}
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


