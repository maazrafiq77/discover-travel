import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const steps = [
  { step: '01', title: 'Intention & Ihram', desc: 'Make your intention at Miqat and enter the state of Ihram correctly with our guide.' },
  { step: '02', title: 'Tawaf', desc: 'Perform 7 circuits around the Kaabah in an anticlockwise direction.' },
  { step: '03', title: "Sa'i", desc: 'Walk 7 times between the hills of Safa and Marwah.' },
  { step: '04', title: 'Ziyarat', desc: 'Visit all significant historical sites in Makkah and Madinah with our experienced guide.' },
  { step: '05', title: 'Halq or Taqsir', desc: 'Shave or trim the hair to complete your Umrah.' },
]

const WaIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

export default function HajjUmrah() {
  const [packages, setPackages] = useState([])
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/api/hajj`).then(r => setPackages(r.data)).catch(() => {})
  }, [])

  const handleEnquire = (pkg) => {
    const msg = `Assalam o Alaikum!\nEnquiry: ${pkg.title}\nPrice: ${pkg.price}\nDuration: ${pkg.days}\nPlease share details.`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,1) 0%, rgba(10,10,8,0.5) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 24px 40px', width: '100%' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Sacred Journeys</span>
          <h1 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#fff' }}>Hajj & Umrah Packages</h1>
          <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'rgba(232,98,42,0.8)', fontSize: 20, marginTop: 8 }}>حج و عمرہ پیکجز</p>
        </div>
      </div>

      {/* Packages */}
      <section style={{ padding: '72px 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Choose Your Package</span>
          <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: 'var(--text)', marginBottom: 40 }}>Packages for every need & budget</h2>

          {packages.length === 0 && (
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
              <p style={{ color: 'var(--muted)', fontSize: 14 }}>No packages added yet. Please contact us on WhatsApp for current packages.</p>
              <a href="https://wa.me/923439343482" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#E8622A', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', marginTop: 16 }}>
                <WaIcon /> WhatsApp Us
              </a>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {packages.map((pkg, i) => (
              <div
                key={pkg._id}
                style={{
                  background: pkg.isPopular ? '#E8622A' : 'var(--card-bg)',
                  border: `1px solid ${pkg.isPopular ? '#E8622A' : hovered === i ? 'rgba(232,98,42,0.4)' : 'var(--border)'}`,
                  borderRadius: 16, padding: 28,
                  transition: 'all 0.3s',
                  transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered === i ? '0 16px 40px rgba(232,98,42,0.15)' : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {pkg.isPopular && (
                  <span style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, letterSpacing: 1 }}>
                    MOST POPULAR
                  </span>
                )}
                <h3 style={{ fontSize: 16, fontWeight: 700, color: pkg.isPopular ? '#fff' : 'var(--text)', marginBottom: 8 }}>{pkg.title}</h3>
                <p style={{ fontFamily: 'Lora,serif', fontSize: 32, fontWeight: 600, color: pkg.isPopular ? '#fff' : '#E8622A', marginBottom: 4 }}>{pkg.price}</p>
                <p style={{ fontSize: 12, color: pkg.isPopular ? 'rgba(255,255,255,0.65)' : 'var(--muted)', marginBottom: 24 }}>{pkg.days} · per person</p>

                <div style={{ height: 1, background: pkg.isPopular ? 'rgba(255,255,255,0.2)' : 'var(--border)', marginBottom: 20 }} />

                <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 24 }}>
                  {pkg.includes.map(item => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12, color: pkg.isPopular ? 'rgba(255,255,255,0.8)' : 'var(--text2)' }}>
                      <span style={{ width: 18, height: 18, background: pkg.isPopular ? 'rgba(255,255,255,0.2)' : 'rgba(232,98,42,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: pkg.isPopular ? '#fff' : '#E8622A', flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleEnquire(pkg)}
                  style={{
                    width: '100%', border: 'none', borderRadius: 10, padding: '13px',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: pkg.isPopular ? '#fff' : '#E8622A',
                    color: pkg.isPopular ? '#E8622A' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s',
                  }}
                >
                  <WaIcon /> Enquire on WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to perform Umrah */}
      <section style={{ padding: '72px 0', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Step by Step</span>
          <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>How to Perform Umrah</h2>
          <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'var(--muted)', fontSize: 16, marginBottom: 40 }}>عمرہ کیسے ادا کریں</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {steps.map((s, i) => (
              <div key={s.step} style={{
                display: 'flex', gap: 24, alignItems: 'flex-start',
                background: 'var(--card-bg)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '24px 28px',
                transition: 'all 0.2s',
              }}>
                <span style={{ fontFamily: 'Lora,serif', fontSize: 36, fontWeight: 600, color: 'rgba(232,98,42,0.25)', lineHeight: 1, minWidth: 48, flexShrink: 0 }}>{s.step}</span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


