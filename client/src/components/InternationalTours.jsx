import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const placeholder = [
  { _id: '1', title: 'Dubai, UAE', continent: 'Asia', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600', days: '5 Days', price: 'PKR 120,000', description: 'Desert safari, Burj Khalifa, world-class shopping and UAE visa included.' },
  { _id: '2', title: 'Istanbul, Turkey', continent: 'Europe', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600', days: '7 Days', price: 'PKR 150,000', description: 'Blue Mosque, Cappadocia hot air balloons and Bosphorus cruises.' },
  { _id: '3', title: 'Europe Multi-City', continent: 'Europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600', days: '10 Days', price: 'PKR 350,000', description: 'Paris, Rome, Amsterdam and the best of European cities in one curated tour.' },
]

const WaIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

export default function InternationalTours() {
  const [tours, setTours] = useState(placeholder)

  useEffect(() => {
    axios.get(`${API_URL}/api/tours?type=international`)
      .then(r => { if (r.data.length > 0) setTours(r.data) })
      .catch(() => {})
  }, [])

  const enquire = (t) => {
    const msg = `Assalam o Alaikum!\nTour: ${t.title}\nPrice: ${t.price}\nDuration: ${t.days}`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section style={{ background: 'var(--bg)', padding: '88px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Go Global</span>
            <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, color: 'var(--text)' }}>
              International tours,<br />expertly arranged.
            </h2>
            <span style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'var(--muted)', fontSize: 15, display: 'block', marginTop: 4 }}>بین الاقوامی سیاحت</span>
          </div>
          <Link to="/international" style={{ color: '#E8622A', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>View all international tours →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {tours.slice(0, 3).map(t => (
            <div key={t._id} style={{
              background: 'var(--card-bg)', border: '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,98,42,0.35)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img src={t.image} alt={t.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,0.85) 0%, transparent 60%)' }} />
                {t.continent && <span style={{ position: 'absolute', top: 12, right: 12, background: '#E8622A', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 9px', borderRadius: 4 }}>{t.continent}</span>}
                <span style={{ position: 'absolute', bottom: 12, left: 16, color: '#fff', fontWeight: 700, fontSize: 16 }}>{t.title}</span>
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ color: 'var(--muted)', fontSize: 12, lineHeight: 1.65, marginBottom: 16 }}>{t.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <p style={{ color: 'var(--muted)', fontSize: 11 }}>Duration</p>
                    <p style={{ color: 'var(--text2)', fontWeight: 600, fontSize: 13 }}>{t.days}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: 'var(--muted)', fontSize: 11 }}>Starting from</p>
                    <p style={{ color: '#E8622A', fontWeight: 700, fontSize: 14 }}>{t.price}</p>
                  </div>
                </div>
                <button onClick={() => enquire(t)} style={{
                  width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)',
                  color: 'var(--text2)', borderRadius: 8, padding: '10px', fontSize: 12,
                  fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 6, fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#E8622A' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  <WaIcon /> Enquire on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


