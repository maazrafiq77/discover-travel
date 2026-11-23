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
  const [open, setOpen] = useState(false)
  const { dark, setDark } = useTheme()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) navigate('/admin/login')
  }, [navigate])

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  // Lock scroll while drawer open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  const logout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }

  return (
    <div className="admin-shell">
      {/* Mobile top bar */}
      <header className="admin-topbar">
        <button
          className="admin-menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Open admin menu"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
        <Link to="/admin" className="admin-brand">
          <span className="admin-brand-logo">
            <img src="/logo.webp" alt="" />
          </span>
          <span className="admin-brand-text">
            Discover <strong>Admin</strong>
          </span>
        </Link>
        <button
          className="admin-icon-btn"
          onClick={() => setDark(!dark)}
          aria-label="Toggle theme"
        >
          {dark ? '☀' : '☾'}
        </button>
      </header>

      {/* Sidebar (mobile drawer + desktop rail) */}
      <aside className={`admin-side${open ? ' is-open' : ''}`}>
        <div className="admin-side-head">
          <Link to="/admin" className="admin-brand" onClick={() => setOpen(false)}>
            <span className="admin-brand-logo">
              <img src="/logo.webp" alt="" />
            </span>
            <span className="admin-brand-text">
              Discover <strong>Travel</strong>
              <small>Admin Panel</small>
            </span>
          </Link>
          <button
            className="admin-side-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="admin-nav" aria-label="Admin navigation">
          {links.map((l) => {
            const active = location.pathname === l.path
            return (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
                className={`admin-nav-item${active ? ' is-active' : ''}`}
              >
                <span className="admin-nav-icon">{l.icon}</span>
                <span className="admin-nav-label">{l.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="admin-side-foot">
          <button className="admin-foot-btn" onClick={() => setDark(!dark)}>
            <span>{dark ? '☀️' : '🌙'}</span>
            <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button className="admin-foot-btn admin-logout" onClick={logout}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {open && (
        <button
          className="admin-backdrop"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />
      )}

      <main className="admin-main">
        <Outlet />
      </main>

      <style>{`
        .admin-shell {
          min-height: 100vh;
          background: var(--admin-bg);
          color: var(--admin-text);
          font-family: var(--font-sans);
        }

        /* Topbar (mobile only) */
        .admin-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          height: 60px;
          padding: 0 14px;
          background: var(--admin-bg2);
          border-bottom: 1px solid var(--admin-border);
          position: sticky; top: 0; z-index: 40;
        }
        .admin-menu-btn {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid var(--admin-border);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          gap: 4px; cursor: pointer;
        }
        .admin-menu-btn span {
          display: block;
          width: 18px; height: 2px;
          background: var(--admin-text);
          border-radius: 2px;
        }
        .admin-icon-btn {
          width: 42px; height: 42px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid var(--admin-border);
          color: var(--admin-text);
          font-size: 17px;
          cursor: pointer;
        }

        /* Brand */
        .admin-brand {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; color: var(--admin-text);
          min-width: 0;
        }
        .admin-brand-logo {
          width: 38px; height: 38px; flex: 0 0 38px;
          border-radius: 50%; background: #fff;
          border: 2px solid var(--brand);
          padding: 3px; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .admin-brand-logo img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }
        .admin-brand-text {
          font-size: 13px; font-weight: 800;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .admin-brand-text strong { color: var(--brand); }
        .admin-brand-text small {
          display: block; font-size: 10px; font-weight: 500;
          color: var(--admin-muted); margin-top: 1px;
        }

        /* Sidebar */
        .admin-side {
          position: fixed;
          top: 0; left: 0; bottom: 0;
          width: 260px;
          background: var(--admin-bg2);
          border-right: 1px solid var(--admin-border);
          display: flex; flex-direction: column;
          transform: translateX(-100%);
          transition: transform .28s var(--ease);
          z-index: 60;
        }
        .admin-side.is-open { transform: translateX(0); }
        .admin-side-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 14px;
          border-bottom: 1px solid var(--admin-border);
        }
        .admin-side-close {
          width: 34px; height: 34px;
          background: transparent;
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          color: var(--admin-muted);
          font-size: 15px;
          cursor: pointer;
        }

        .admin-nav {
          flex: 1;
          overflow-y: auto;
          padding: 12px 10px;
        }
        .admin-nav-item {
          display: flex; align-items: center; gap: 12px;
          min-height: 46px;
          padding: 10px 14px;
          border-radius: 10px;
          margin-bottom: 2px;
          text-decoration: none;
          color: var(--admin-muted);
          font-size: 13.5px; font-weight: 600;
          transition: background .2s, color .2s;
        }
        .admin-nav-item:hover {
          background: rgba(232, 98, 42, 0.08);
          color: var(--admin-text);
        }
        .admin-nav-item.is-active {
          background: rgba(232, 98, 42, 0.14);
          color: var(--brand);
          border: 1px solid rgba(232, 98, 42, 0.28);
        }
        .admin-nav-icon { font-size: 17px; }

        .admin-side-foot {
          padding: 12px 10px;
          border-top: 1px solid var(--admin-border);
          display: flex; flex-direction: column; gap: 6px;
        }
        .admin-foot-btn {
          width: 100%;
          min-height: 42px;
          padding: 9px 14px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid var(--admin-border);
          color: var(--admin-text);
          font-size: 12.5px;
          font-weight: 600;
          display: flex; align-items: center; gap: 10px;
          cursor: pointer;
          transition: border-color .2s, background .2s;
          font-family: var(--font-sans);
          text-align: left;
        }
        .admin-foot-btn:hover { border-color: var(--brand); }
        .admin-foot-btn.admin-logout {
          color: var(--brand);
          background: rgba(232, 98, 42, 0.1);
          border-color: rgba(232, 98, 42, 0.28);
        }
        .admin-foot-btn.admin-logout:hover { background: var(--brand); color: #fff; }

        .admin-backdrop {
          position: fixed; inset: 0;
          background: rgba(0, 0, 0, 0.5);
          border: 0; width: 100%;
          z-index: 55;
          cursor: pointer;
        }

        /* Main */
        .admin-main {
          padding: 18px 14px 40px;
          min-height: calc(100vh - 60px);
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .admin-topbar { display: none; }
          .admin-side {
            transform: none;
            width: 240px;
            position: fixed;
          }
          .admin-side-close { display: none; }
          .admin-backdrop { display: none; }
          .admin-main {
            margin-left: 240px;
            padding: 32px;
            min-height: 100vh;
          }
        }
      `}</style>
    </div>
  )
}