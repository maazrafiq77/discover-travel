import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Home',          path: '/' },
  { label: 'Hajj & Umrah',  path: '/hajj-umrah' },
  { label: 'Domestic',      path: '/domestic',
    sub: ['Kumrat Valley', 'Swat Valley', 'Naran Kaghan', 'Kashmir', 'Gilgit Baltistan', 'Chitral'] },
  { label: 'International', path: '/international',
    sub: ['Asia', 'Europe', 'Africa', 'Americas'] },
  { label: 'Visa',          path: '/visa' },
  { label: 'About',         path: '/about' },
  { label: 'Contact',       path: '/contact' },
]

const WaIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [drop, setDrop] = useState(null)
  const { dark, setDark } = useTheme()
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`site-navbar${scrolled ? ' is-scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="brand" onClick={close} aria-label="Discover Travel home">
            <span className="brand-logo">
              <img src="/logo.webp" alt="" />
            </span>
            <span className="brand-text">
              Discover <span>Travel</span><small> &amp; Tours</small>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="desktop-links" aria-label="Primary">
            <ul>
              {links.map((link) => (
                <li
                  key={link.label}
                  onMouseEnter={() => setDrop(link.label)}
                  onMouseLeave={() => setDrop(null)}
                >
                  <Link
                    to={link.path}
                    className={`d-link${loc.pathname === link.path ? ' active' : ''}`}
                    aria-haspopup={link.sub ? 'true' : undefined}
                    aria-expanded={link.sub ? drop === link.label : undefined}
                  >
                    {link.label}
                    {link.sub && <span className="chev">⌄</span>}
                  </Link>
                  {link.sub && drop === link.label && (
                    <ul className="d-drop">
                      {link.sub.map((item) => (
                        <li key={item}><Link to={link.path}>{item}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="desktop-actions">
            <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? '☀' : '☾'}
            </button>
            <a className="phone-link" href="tel:+923119288821">+92 343 934 3482</a>
            <a className="wa-btn" href="https://wa.me/923119288821" target="_blank" rel="noreferrer">
              <WaIcon /> <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile actions — minimal: logo + theme + hamburger */}
          <div className="mobile-actions">
            <button className="icon-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
              {dark ? '☀' : '☾'}
            </button>
            <button
              className="hamburger"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mob-drawer"
            >
              <span className={`ham-icon${open ? ' is-open' : ''}`}><i /><i /><i /></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — DIFFERENT pattern from desktop */}
      {open && (
        <div className="mob-drawer-root" id="mob-drawer" role="dialog" aria-modal="true">
          <button className="mob-backdrop" onClick={close} aria-label="Close menu" />
          <div className="mob-sheet">
            <div className="mob-sheet-head">
              <span className="mob-sheet-title">Where to next?</span>
              <span className="mob-sheet-sub">Explore Discover Travel</span>
            </div>
            <ul className="mob-links">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    onClick={close}
                    className={`mob-link${loc.pathname === link.path ? ' active' : ''}`}
                  >
                    <span>{link.label}</span>
                    <span className="mob-chev">→</span>
                  </Link>
                  {link.sub && (
                    <ul className="mob-sub">
                      {link.sub.map(item => (
                        <li key={item}>
                          <Link to={link.path} onClick={close}>{item}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div className="mob-sheet-foot">
              <a className="mob-btn mob-btn-primary" href="https://wa.me/+923119288821" target="_blank" rel="noreferrer">
                <WaIcon /> Chat on WhatsApp
              </a>
              <a className="mob-btn mob-btn-ghost" href="tel:+923439343482">📞 Call Now</a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .site-navbar{
          position:fixed; top:0; left:0; right:0; z-index:210;
          height:var(--nav-h-mobile);
          background:color-mix(in srgb, var(--bg) 78%, transparent);
          -webkit-backdrop-filter:saturate(180%) blur(14px);
          backdrop-filter:saturate(180%) blur(14px);
          border-bottom:1px solid transparent;
          transition:background .25s ease, border-color .25s ease, height .25s ease;
        }
        .site-navbar.is-scrolled{
          background:color-mix(in srgb, var(--bg) 94%, transparent);
          border-bottom-color:var(--border);
        }
        .navbar-inner{
          height:100%;
          max-width:var(--container);
          margin:0 auto;
          padding:0 16px;
          display:flex; align-items:center; justify-content:space-between; gap:16px;
        }
        .brand{
          display:flex; align-items:center; gap:10px;
          text-decoration:none; color:var(--text);
          min-width:0;
        }
        .brand-logo{
          width:40px; height:40px; flex:0 0 40px;
          border-radius:50%;
          background:#fff; border:2px solid var(--brand);
          padding:3px; overflow:hidden;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 3px 12px rgba(232,98,42,.20);
        }
        .brand-logo img{ width:100%; height:100%; object-fit:contain; border-radius:50%; }
        .brand-text{
          font-size:14px; font-weight:800; letter-spacing:-0.3px;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
        }
        .brand-text > span{ color:var(--brand); }
        .brand-text small{ font-weight:500; color:var(--muted); font-size:inherit; }

        /* Desktop */
        .desktop-links{ display:none; }
        .desktop-actions{ display:none; }
        .mobile-actions{ display:flex; align-items:center; gap:8px; }

        .icon-btn{
          width:40px; height:40px;
          border-radius:10px;
          background:var(--bg3); border:1px solid var(--border);
          color:var(--text); font-size:17px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
        }
        .hamburger{
          width:44px; height:44px; border-radius:12px;
          background:var(--bg3); border:1px solid var(--border);
          display:flex; align-items:center; justify-content:center; cursor:pointer;
        }
        .ham-icon{ width:20px; height:14px; display:flex; flex-direction:column; justify-content:space-between; }
        .ham-icon i{ height:2px; width:100%; border-radius:2px; background:var(--text); transition:transform .25s var(--ease), opacity .25s; }
        .ham-icon.is-open i:first-child{ transform:translateY(6px) rotate(45deg); }
        .ham-icon.is-open i:nth-child(2){ opacity:0; }
        .ham-icon.is-open i:last-child{ transform:translateY(-6px) rotate(-45deg); }

        /* Mobile drawer */
        .mob-drawer-root{ position:fixed; inset:var(--nav-h-mobile) 0 0; z-index:205; }
        .mob-backdrop{ position:absolute; inset:0; background:rgba(0,0,0,.5); border:0; width:100%; }
        .mob-sheet{
          position:absolute; top:0; right:0; bottom:0;
          width:min(400px, 92vw);
          background:var(--bg2);
          border-left:1px solid var(--border);
          display:flex; flex-direction:column;
          padding:22px 20px calc(20px + env(safe-area-inset-bottom,0px));
          overflow-y:auto;
          animation:sheetIn .28s var(--ease);
        }
        @keyframes sheetIn{ from{ transform:translateX(20px); opacity:0; } to{ transform:none; opacity:1; } }
        .mob-sheet-head{ padding-bottom:18px; border-bottom:1px solid var(--border); margin-bottom:8px; }
        .mob-sheet-title{ display:block; font-family:var(--font-serif); font-size:22px; font-weight:600; color:var(--text); }
        .mob-sheet-sub{ display:block; margin-top:4px; font-size:12px; color:var(--muted); }
        .mob-links{ list-style:none; margin:8px 0 0; padding:0; }
        .mob-links > li{ border-bottom:1px solid var(--border); }
        .mob-link{
          display:flex; align-items:center; justify-content:space-between;
          min-height:56px; padding:14px 4px;
          color:var(--text); text-decoration:none;
          font-size:15px; font-weight:600;
        }
        .mob-link.active{ color:var(--brand); }
        .mob-chev{ color:var(--brand); font-size:16px; }
        .mob-sub{ list-style:none; margin:0 0 12px 12px; padding:2px 0 2px 12px; border-left:1px solid var(--brand-ring); }
        .mob-sub a{ display:block; padding:9px 4px; color:var(--muted); font-size:13px; text-decoration:none; }
        .mob-sub a:hover{ color:var(--brand); }
        .mob-sheet-foot{ margin-top:auto; padding-top:16px; display:grid; gap:10px; }
        .mob-btn{
          display:flex; align-items:center; justify-content:center; gap:8px;
          min-height:50px; border-radius:12px; font-weight:700; font-size:14px;
          text-decoration:none;
        }
        .mob-btn-primary{ background:var(--brand); color:#fff; }
        .mob-btn-ghost{ background:var(--bg3); color:var(--text); border:1px solid var(--border); }

        /* Desktop */
        @media (min-width:960px){
          .site-navbar{ height:72px; }
          .navbar-inner{ padding:0 24px; gap:24px; }
          .brand-logo{ width:44px; height:44px; flex-basis:44px; }
          .brand-text{ font-size:15px; }
          .mobile-actions{ display:none; }
          .desktop-links{ display:block; }
          .desktop-actions{ display:flex; align-items:center; gap:10px; }
          .desktop-links ul{ display:flex; align-items:center; gap:2px; list-style:none; margin:0; padding:0; }
          .desktop-links li{ position:relative; }
          .d-link{
            display:flex; align-items:center; gap:5px;
            padding:9px 11px; border-radius:9px;
            color:var(--text2); text-decoration:none;
            font-size:13px; font-weight:600; white-space:nowrap;
            transition:color .2s, background .2s;
          }
          .d-link:hover, .d-link.active{ color:var(--brand); background:var(--brand-soft); }
          .chev{ font-size:12px; opacity:.7; }
          .d-drop{
            position:absolute; top:calc(100% + 10px); left:0;
            min-width:190px; padding:8px; list-style:none; margin:0;
            background:var(--bg2); border:1px solid var(--border);
            border-radius:12px; box-shadow:var(--shadow-lg);
          }
          .d-drop a{ display:block; padding:10px 12px; border-radius:8px; color:var(--text2); font-size:13px; text-decoration:none; }
          .d-drop a:hover{ background:var(--brand-soft); color:var(--brand); }
          .phone-link{
            font-size:12px; font-weight:600; color:var(--text2);
            text-decoration:none; padding:9px 12px;
            border:1px solid var(--border); border-radius:9px;
          }
          .phone-link:hover{ color:var(--brand); border-color:var(--brand-ring); }
          .wa-btn{
            display:flex; align-items:center; gap:7px;
            background:var(--brand); color:#fff; text-decoration:none;
            font-size:12.5px; font-weight:700;
            padding:11px 16px; border-radius:9px;
            transition:background .2s, transform .15s, box-shadow .2s;
          }
          .wa-btn:hover{ background:var(--brand-2); box-shadow:var(--shadow-brand); }
          .wa-btn:active{ transform:scale(.97); }
          .mob-drawer-root{ display:none; }
        }
        @media (max-width:380px){
          .brand-text{ font-size:12.5px; }
          .brand-logo{ width:36px; height:36px; flex-basis:36px; }
        }
      `}</style>
    </>
  )
}