import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Home', path: '/' },
  { label: 'Hajj & Umrah', path: '/hajj-umrah' },
  {
    label: 'Domestic', path: '/domestic',
    sub: ['Kumrat Valley','Swat Valley','Naran Kaghan','Kashmir','Gilgit Baltistan','Chitral']
  },
  {
    label: 'International', path: '/international',
    sub: ['Asia','Europe','Africa','Americas']
  },
  { label: 'Visa', path: '/visa' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const WaIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(null)
  const { dark, setDark } = useTheme()
  const loc = useLocation()

  return (
    <>
      {/* DESKTOP NAV */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:200,
        height:68,
        background:'rgba(17,18,16,0.96)',
        backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(255,255,255,0.07)',
        display:'flex', alignItems:'center',
      }}>
        <div style={{
          maxWidth:1200,margin:'0 auto',padding:'0 24px',
          width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,
        }}>

          {/* Brand */}
          
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
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
                src="logo.webp"
                alt="Discover Travel"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '50%',
                }}
              />
            </div>

            <span
              style={{
                fontWeight: 800,
                fontSize: 15,
                color: '#fff',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.3px',
              }}
            >
              Discover <span style={{ color: '#E8622A' }}>Travel</span>
              <span style={{ fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>
                {' '} & Tours
              </span>
            </span>
          </Link>

          {/* Links — desktop only */}
          <ul style={{display:'flex',alignItems:'center',gap:0,listStyle:'none',margin:0,padding:0}} className="hidden lg:flex">
            {links.map(l => (
              <li key={l.label} style={{position:'relative'}}
                onMouseEnter={()=>setDrop(l.label)}
                onMouseLeave={()=>setDrop(null)}
              >
                <Link to={l.path} style={{
                  display:'flex',alignItems:'center',gap:3,
                  padding:'8px 10px',borderRadius:8,
                  fontSize:13,fontWeight:500,textDecoration:'none',
                  color: loc.pathname===l.path ? '#E8622A' : 'rgba(255,255,255,0.6)',
                  whiteSpace:'nowrap',
                }}>
                  {l.label}
                  {l.sub && <span style={{fontSize:9,opacity:0.5}}>▾</span>}
                </Link>
                {l.sub && drop===l.label && (
                  <ul style={{
                    position:'absolute',top:'100%',left:0,
                    background:'#1a1a17',border:'1px solid rgba(255,255,255,0.07)',
                    borderRadius:12,minWidth:180,padding:'8px 0',zIndex:999,
                    boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
                    listStyle:'none',margin:0,
                  }}>
                    {l.sub.map(s=>(
                      <li key={s}>
                        <Link to={l.path} style={{display:'block',padding:'10px 16px',fontSize:13,color:'rgba(255,255,255,0.5)',textDecoration:'none',transition:'all 0.2s'}}
                          onMouseEnter={e=>{e.currentTarget.style.color='#E8622A';e.currentTarget.style.paddingLeft='20px'}}
                          onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,0.5)';e.currentTarget.style.paddingLeft='16px'}}
                        >{s}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Right side — desktop only */}
          <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}} className="hidden lg:flex">
            <button onClick={()=>setDark(!dark)} style={{
              width:34,height:34,borderRadius:8,
              background:'rgba(255,255,255,0.07)',border:'none',
              cursor:'pointer',fontSize:15,
              display:'flex',alignItems:'center',justifyContent:'center',
            }}>
              {dark?'☀️':'🌙'}
            </button>
            <a href="tel:+923439343482" style={{
              fontSize:12,fontWeight:600,color:'rgba(255,255,255,0.6)',
              textDecoration:'none',padding:'8px 12px',
              border:'1px solid rgba(255,255,255,0.1)',borderRadius:8,
              whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:5,
            }}>
              📞 +92 343 934 3482
            </a>
            <a href="https://wa.me/923439343482" target="_blank" rel="noreferrer" style={{
              background:'#E8622A',color:'#fff',textDecoration:'none',
              padding:'9px 16px',borderRadius:8,fontSize:12,fontWeight:700,
              display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap',
            }}>
              <WaIcon/> WhatsApp
            </a>
          </div>

          {/* Mobile only — theme + hamburger */}
          {/* <div style={{display:'flex',gap:8,alignItems:'center',flexShrink:0}} className="flex lg:hidden">
            <button onClick={()=>setDark(!dark)} style={{
              width:34,height:34,borderRadius:8,
              background:'rgba(255,255,255,0.07)',border:'none',
              cursor:'pointer',fontSize:15,
              display:'flex',alignItems:'center',justifyContent:'center',
            }}>
              {dark?'☀️':'🌙'}
            </button>
            <button onClick={()=>setOpen(!open)} style={{
              width:34,height:34,borderRadius:8,
              background:'rgba(255,255,255,0.07)',border:'none',
              cursor:'pointer',color:'#fff',fontWeight:700,fontSize:18,
              display:'flex',alignItems:'center',justifyContent:'center',
            }}>
              {open?'✕':'☰'}
            </button>
          </div> */}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div style={{
          position:'fixed',top:68,left:0,right:0,zIndex:199,
          background:'#1a1a17',
          borderBottom:'1px solid rgba(255,255,255,0.07)',
          padding:'16px 24px',
          maxHeight:'calc(100vh - 68px)',overflowY:'auto',
        }} className="lg:hidden">
          {links.map(l=>(
            <div key={l.label}>
              <Link to={l.path} onClick={()=>setOpen(false)} style={{
                display:'flex',justifyContent:'space-between',alignItems:'center',
                padding:'13px 0',fontSize:14,fontWeight:600,
                color:'#fff',textDecoration:'none',
                borderBottom:'1px solid rgba(255,255,255,0.07)',
              }}>
                {l.label}
                {l.sub && <span style={{color:'#E8622A',fontSize:11}}>▾</span>}
              </Link>
              {l.sub && l.sub.map(s=>(
                <Link key={s} to={l.path} onClick={()=>setOpen(false)} style={{
                  display:'block',padding:'9px 0 9px 14px',
                  fontSize:12,color:'rgba(255,255,255,0.4)',textDecoration:'none',
                }}>
                  {s}
                </Link>
              ))}
            </div>
          ))}
          <a href="https://wa.me/923439343482" target="_blank" rel="noreferrer" style={{
            display:'flex',alignItems:'center',justifyContent:'center',gap:8,
            marginTop:16,background:'#E8622A',color:'#fff',
            padding:'13px',borderRadius:10,fontSize:13,fontWeight:700,textDecoration:'none',
          }}>
            <WaIcon/> WhatsApp Us
          </a>
        </div>
      )}
    </>
  )
}

