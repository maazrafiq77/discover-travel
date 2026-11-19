import { useEffect, useState } from 'react'
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const links = [
  { label: 'Dashboard', path: '/admin', icon: '📊' },
  { label: 'Tours', path: '/admin/tours', icon: '✈️' },
  { label: 'Hajj & Umrah', path: '/admin/hajj', icon: '🕋' },
  { label: 'Visa', path: '/admin/visa', icon: '📋' },
  { label: 'Testimonials', path: '/admin/testimonials', icon: '⭐' },
  { label: 'Enquiries', path: '/admin/enquiries', icon: '📩' },
  { label: 'Chat Sessions', path: '/admin/chats', icon: '💬' },
  { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const { dark, setDark } = useTheme()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin/login')
  }, [navigate])

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--admin-bg)', fontFamily: 'Montserrat,sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 72 : 240,
        background: 'var(--admin-bg2)',
        borderRight: '1px solid var(--admin-border)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s',
        flexShrink: 0,
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{
          padding: collapsed ? '20px 16px' : '24px 20px',
          borderBottom: '1px solid var(--admin-border)',
          display: 'flex', alignItems: 'center', gap: 12, minHeight: 72,
        }}>
           <div
    style={{
      width: 49,
      height: 49,
      borderRadius: '50%',
      background: '#fff',
      border: '2px solid rgba(232, 98, 42, 0.85)',
      padding: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: '0 0 12px rgba(232, 98, 42, 0.18)',
    }}
  >
    <img
      src="/logo.webp"
      alt="Discover Travel"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '50%',
      }}
    />
  </div>
          {!collapsed && (
            <div>
              <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--admin-text)', lineHeight: 1.2 }}>
                Discover <span style={{ color: '#E8622A' }}>Travel</span>
              </p>
              <p style={{ fontSize: 10, color: 'var(--admin-muted)', marginTop: 2 }}>Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          {links.map(l => {
            const active = location.pathname === l.path
            return (
              <Link
                key={l.label}
                to={l.path}
                title={collapsed ? l.label : ''}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: collapsed ? '12px' : '11px 14px',
                  borderRadius: 10, textDecoration: 'none',
                  marginBottom: 2, transition: 'all 0.2s',
                  background: active ? 'rgba(232,98,42,0.15)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(232,98,42,0.3)' : 'transparent'}`,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{l.icon}</span>
                {!collapsed && (
                  <span style={{ fontSize: 13, fontWeight: 600, color: active ? '#E8622A' : 'var(--admin-muted)' }}>
                    {l.label}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

       <div style={{ padding: '12px 10px', borderTop: '1px solid var(--admin-border)', display: 'flex', flexDirection: 'column', gap: 6 }}>

  {/* Theme toggle */}
  <button
    onClick={() => setDark(!dark)}
    style={{
      width: '100%', background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      border: `1px solid var(--admin-border)`,
      borderRadius: 10, padding: '10px 14px',
      color: 'var(--admin-muted)',
      cursor: 'pointer', fontFamily: 'Montserrat,sans-serif',
      display: 'flex', alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
      gap: 10, transition: 'all 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = '#E8622A'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--admin-border)'}
  >
    <span style={{ fontSize: 16, flexShrink: 0 }}>{dark ? '☀️' : '🌙'}</span>
    {!collapsed && (
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-text)' }}>
        {dark ? 'Light Mode' : 'Dark Mode'}
      </span>
    )}
  </button>

  {/* Collapse */}
  <button
    onClick={() => setCollapsed(!collapsed)}
    style={{
      width: '100%',
      background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      border: `1px solid var(--admin-border)`,
      borderRadius: 10, padding: '10px 14px',
      color: 'var(--admin-muted)',
      cursor: 'pointer', fontFamily: 'Montserrat,sans-serif',
      display: 'flex', alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
      gap: 10, transition: 'all 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = '#E8622A'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--admin-border)'}
  >
    <span style={{ fontSize: 14, flexShrink: 0 }}>{collapsed ? '→' : '←'}</span>
    {!collapsed && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--admin-text)' }}>Collapse</span>}
  </button>

  {/* Logout */}
  <button
    onClick={logout}
    style={{
      width: '100%',
      background: 'rgba(232,98,42,0.1)',
      border: '1px solid rgba(232,98,42,0.25)',
      borderRadius: 10, padding: '11px 14px', color: '#E8622A',
      cursor: 'pointer', fontSize: 12, fontWeight: 700,
      fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s',
      display: 'flex', alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
      gap: 10,
    }}
    onMouseEnter={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.color = '#fff' }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,98,42,0.1)'; e.currentTarget.style.color = '#E8622A' }}
  >
    <span style={{ fontSize: 16, flexShrink: 0 }}>🚪</span>
    {!collapsed && <span>Logout</span>}
  </button>

</div>
      </aside>

      {/* Main content */}
      <main style={{
        flex: 1,
        marginLeft: collapsed ? 72 : 240,
        transition: 'margin-left 0.3s',
        padding: 32,
        minHeight: '100vh',
        background: 'var(--admin-bg)',
      }}>
        <Outlet />
      </main>
    </div>
  )
}

