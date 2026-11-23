import { Link, useLocation } from 'react-router-dom'

const items = [
  { label: 'Home',     path: '/',            icon: HomeIcon },
  { label: 'Tours',    path: '/domestic',    icon: MountainIcon },
  { label: 'Hajj',     path: '/hajj-umrah',  icon: KabahIcon },
  { label: 'Visa',     path: '/visa',        icon: PassportIcon },
  { label: 'Contact',  path: '/contact',     icon: ChatIcon },
]

function HomeIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>
}
function MountainIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m3 20 6-10 4 6 3-4 5 8z"/><circle cx="17" cy="6" r="2"/></svg>
}
function KabahIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8 12 4l8 4v10l-8 4-8-4z"/><path d="M4 8l8 4 8-4"/><path d="M12 12v10"/></svg>
}
function PassportIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8.5 17h7"/></svg>
}
function ChatIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 0 1 8-8h2a8 8 0 0 1 8 3z"/></svg>
}

export default function MobileBottomNav() {
  const loc = useLocation()
  return (
    <>
      <nav className="mob-bottom-nav" aria-label="Primary mobile navigation">
        {items.map(({ label, path, icon: Icon }) => {
          const active = path === '/' ? loc.pathname === '/' : loc.pathname.startsWith(path)
          return (
            <Link
              key={path}
              to={path}
              className={`mob-nav-item${active ? ' is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              <span className="mob-nav-icon"><Icon /></span>
              <span className="mob-nav-label">{label}</span>
            </Link>
          )
        })}
      </nav>
      <style>{`
        .mob-bottom-nav{
          display:none;
          position:fixed;
          left:0; right:0; bottom:0;
          z-index:200;
          height:calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px));
          padding:0 6px env(safe-area-inset-bottom, 0px);
          background:color-mix(in srgb, var(--bg2) 92%, transparent);
          -webkit-backdrop-filter:saturate(180%) blur(20px);
          backdrop-filter:saturate(180%) blur(20px);
          border-top:1px solid var(--border);
        }
        .mob-nav-item{
          flex:1;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          gap:4px;
          min-height:56px;
          padding:8px 4px;
          text-decoration:none;
          color:var(--muted);
          border-radius:12px;
          transition:color .2s ease, background .2s ease, transform .15s ease;
          -webkit-tap-highlight-color:transparent;
        }
        .mob-nav-item:active{ transform:scale(.94); }
        .mob-nav-item.is-active{ color:var(--brand); }
        .mob-nav-item.is-active .mob-nav-icon{
          background:var(--brand-soft);
        }
        .mob-nav-icon{
          display:flex;
          align-items:center;
          justify-content:center;
          width:40px;
          height:30px;
          border-radius:10px;
          transition:background .2s ease;
        }
        .mob-nav-label{
          font-size:10.5px;
          font-weight:600;
          letter-spacing:0.2px;
        }
        @media (max-width:959px){
          .mob-bottom-nav{ display:flex; }
        }
      `}</style>
    </>
  )
}