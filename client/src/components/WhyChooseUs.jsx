import { useState } from 'react'

const reasons = [
  { icon: '🛡️', title: '15+ Years of Proven Trust', desc: 'Thousands of families from Peshawar and across Pakistan have trusted us with their most important journeys.', stat: '10,000+', statLabel: 'Happy Customers', accent: '#E8622A' },
  { icon: '🕋', title: 'Hajj & Umrah Specialists', desc: 'We specialize in sacred travel — every detail handled with the reverence and care it deserves.', stat: '500+', statLabel: 'Umrah Completed', accent: '#8b5cf6' },
  { icon: '💬', title: '24/7 WhatsApp Support', desc: 'Reach our team at any hour — before departure, during travel and after return.', stat: '24/7', statLabel: 'Available', accent: '#10b981' },
  { icon: '💰', title: 'No Hidden Charges', desc: 'Transparent pricing always. What we quote is exactly what you pay.', stat: '100%', statLabel: 'Transparent', accent: '#f59e0b' },
  { icon: '🌍', title: '50+ Destinations', desc: 'From Kumrat to Europe, we cover every destination with personalized packages built around your budget.', stat: '50+', statLabel: 'Destinations', accent: '#0ea5e9' },
  { icon: '📋', title: 'High Visa Success Rate', desc: "Expert visa consultancy for all major countries with one of Pakistan's highest approval rates.", stat: '95%', statLabel: 'Success Rate', accent: '#ec4899' },
]

export default function WhyChooseUs() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: 'var(--bg2)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 56, alignItems: 'end' }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Why choose us</span>
            <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.15 }}>
              Why thousands trust<br />Discover Travel.
            </h2>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85, alignSelf: 'end' }}>
            We are not just a travel agency. We are your journey partner — from the first enquiry to safe return home. Every package is built around your needs, your budget and your peace of mind.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {reasons.map((r, i) => (
            <div
              key={r.title}
              style={{
                background: 'var(--card-bg)',
                border: `1px solid ${hovered === i ? r.accent + '50' : 'var(--border)'}`,
                borderRadius: 16,
                padding: '32px 28px',
                transition: 'all 0.3s',
                cursor: 'default',
                transform: hovered === i ? 'translateY(-5px)' : 'translateY(0)',
                boxShadow: hovered === i ? `0 16px 40px ${r.accent}18` : '0 1px 3px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Top accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: r.accent,
                transform: hovered === i ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.35s ease',
                borderRadius: '16px 16px 0 0',
              }} />

              {/* Top row — icon + stat */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div style={{
                  width: 50, height: 50,
                  background: `${r.accent}15`,
                  border: `1px solid ${r.accent}25`,
                  borderRadius: 13,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                  transition: 'all 0.3s',
                  ...(hovered === i ? { background: r.accent, border: `1px solid ${r.accent}` } : {}),
                }}>
                  {r.icon}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Lora,serif', fontSize: 26, fontWeight: 600, color: r.accent, lineHeight: 1 }}>{r.stat}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600, marginTop: 3, letterSpacing: 0.5 }}>{r.statLabel}</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />

              {/* Title */}
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 10, lineHeight: 1.3 }}>
                {r.title}
              </h3>

              {/* Desc */}
              <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75 }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

