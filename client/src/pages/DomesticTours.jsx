import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const regions = ['All', 'KPK', 'GB', 'AJK', 'Punjab']

const WaIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

export default function DomesticToursPage() {
  const [tours, setTours] = useState([])
  const [active, setActive] = useState('All')
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/tours?type=domestic`).then(r => setTours(r.data)).catch(() => {})
  }, [])

  const filtered = active === 'All' ? tours : tours.filter(t => t.region === active)

  const enquire = (t) => {
    const msg = `Assalam o Alaikum!\nTour: ${t.title}\nPrice: ${t.price}\nDuration: ${t.days}`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://realpakistan.com.pk/wp-content/uploads/2025/04/Mahodand-Lake.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,1) 0%, rgba(10,10,8,0.5) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 24px 40px', width: '100%' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Explore Pakistan</span>
          <h1 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#fff' }}>Domestic Tours</h1>
          <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'rgba(232,98,42,0.8)', fontSize: 20, marginTop: 8 }}>ملکی سیاحت</p>
        </div>
      </div>

      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setActive(r)}
                style={{
                  padding: '9px 20px', borderRadius: 50,
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  background: active === r ? '#E8622A' : 'var(--card-bg)',
                  color: active === r ? '#fff' : 'var(--muted)',
                  border: `1.5px solid ${active === r ? '#E8622A' : 'var(--border)'}`,
                  transition: 'all 0.2s', fontFamily: 'Montserrat,sans-serif',
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '48px 0', fontSize: 14 }}>No tours available in this region yet.</p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {filtered.map((t, i) => (
              <div
                key={t._id}
                style={{
                  background: 'var(--card-bg)', border: `1px solid ${hovered === i ? 'rgba(232,98,42,0.4)' : 'var(--border)'}`,
                  borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s',
                  transform: hovered === i ? 'translateY(-5px)' : 'translateY(0)',
                  boxShadow: hovered === i ? '0 16px 40px rgba(232,98,42,0.1)' : 'none',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                  <img src={t.image} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s', transform: hovered === i ? 'scale(1.05)' : 'scale(1)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,0.85) 0%, transparent 60%)' }} />
                  {t.region && <span style={{ position: 'absolute', top: 12, right: 12, background: '#E8622A', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>{t.region}</span>}
                  <span style={{ position: 'absolute', bottom: 14, left: 16, color: '#fff', fontWeight: 700, fontSize: 17 }}>{t.title}</span>
                </div>
                <div style={{ padding: 20 }}>
                  <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.65, marginBottom: 16 }}>{t.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '12px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                    <div>
                      <p style={{ color: 'var(--muted)', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Duration</p>
                      <p style={{ color: 'var(--text)', fontWeight: 700, fontSize: 14, marginTop: 2 }}>{t.days}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: 'var(--muted)', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Starting from</p>
                      <p style={{ color: '#E8622A', fontWeight: 700, fontSize: 16, marginTop: 2 }}>{t.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => enquire(t)}
                    style={{
                      width: '100%', background: '#E8622A', border: 'none',
                      color: '#fff', borderRadius: 8, padding: '11px', fontSize: 12,
                      fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center',
                      justifyContent: 'center', gap: 6, fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#d4571f'}
                    onMouseLeave={e => e.currentTarget.style.background = '#E8622A'}
                  >
                    <WaIcon /> Enquire on WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


