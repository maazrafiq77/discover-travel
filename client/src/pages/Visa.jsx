import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const WaIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

export default function Visa() {
  const [countries, setCountries] = useState([])
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/visa`).then(r => setCountries(r.data)).catch(() => {})
  }, [])

  const enquire = (c) => {
    const msg = `Assalam o Alaikum!\nVisa Enquiry: ${c.country}\nType: ${c.type}\nPlease guide me.`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,1) 0%, rgba(10,10,8,0.5) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 24px 40px', width: '100%' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Expert Processing</span>
          <h1 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#fff' }}>Visa Consultancy</h1>
          <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'rgba(232,98,42,0.8)', fontSize: 20, marginTop: 8 }}>ویزا مشاورت</p>
        </div>
      </div>

      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, marginBottom: 56, alignItems: 'end' }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>All Countries</span>
              <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: 'var(--text)' }}>We process visas for all major countries</h2>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75, alignSelf: 'end' }}>
              High approval rate, fast processing, complete documentation support. WhatsApp us for any country not listed.
            </p>
          </div>

          {countries.length === 0 && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 16 }}>No visa information added yet. Contact us for any country.</p>
              <a href="https://wa.me/923439343482" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E8622A', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
                <WaIcon /> WhatsApp Us
              </a>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {countries.map((c, i) => (
              <div key={c._id} style={{
                background: 'var(--card-bg)',
                border: `1px solid ${hovered === i ? 'rgba(232,98,42,0.4)' : 'var(--border)'}`,
                borderRadius: 16, padding: 24,
                transition: 'all 0.3s',
                transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hovered === i ? '0 12px 32px rgba(232,98,42,0.1)' : 'none',
              }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span style={{ fontSize: 40 }}>{c.flag}</span>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{c.country}</h3>
                    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, background: 'rgba(232,98,42,0.1)', color: '#E8622A', padding: '3px 8px', borderRadius: 20 }}>{c.type}</span>
                  </div>
                </div>
                <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <p style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Processing Time</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{c.processing}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Service Fee</p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: '#E8622A' }}>{c.fee}</p>
                  </div>
                </div>
                <button onClick={() => enquire(c)} style={{
                  width: '100%', background: 'var(--bg3)', border: `1px solid var(--border)`,
                  color: 'var(--text2)', borderRadius: 8, padding: '10px', fontSize: 12,
                  fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 6, fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text2)' }}
                >
                  <WaIcon /> Enquire Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


