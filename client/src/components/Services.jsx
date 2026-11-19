import { Link } from 'react-router-dom'
import { useState } from 'react'

const services = [
  {
    title: 'Hajj & Umrah',
    ur: 'حج و عمرہ',
    desc: 'Complete sacred packages with visa, flights, hotels & Ziyarat.',
    tag: 'Sacred Travel',
    path: '/hajj-umrah',
    icon: '🕋',
    accent: '#E8622A',
    bg: 'rgba(232,98,42,0.08)',
  },
  {
    title: 'Domestic Tours',
    ur: 'ملکی سیاحت',
    desc: 'Kumrat, Swat, Naran, Gilgit, Chitral — the best of Pakistan.',
    tag: 'Northern Pakistan',
    path: '/domestic',
    icon: '🏔️',
    accent: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
  },
  {
    title: 'International',
    ur: 'بین الاقوامی سفر',
    desc: 'Dubai, Turkey, Malaysia, Europe and beyond.',
    tag: 'Worldwide',
    path: '/international',
    icon: '✈️',
    accent: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
  {
    title: 'Visa Consultancy',
    ur: 'ویزا مشاورت',
    desc: 'Expert visa processing for all major countries.',
    tag: 'All Countries',
    path: '/visa',
    icon: '📋',
    accent: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
  },
  {
    title: 'Flight Tickets',
    ur: 'فلائٹ ٹکٹ',
    desc: 'Best fares on all airlines — economy to first class.',
    tag: 'All Airlines',
    path: '/contact',
    icon: '🎫',
    accent: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
  },
  {
    title: 'Hotel Booking',
    ur: 'ہوٹل بکنگ',
    desc: 'Worldwide hotel reservations from 3★ to 5★.',
    tag: 'Worldwide',
    path: '/contact',
    icon: '🏨',
    accent: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
  },
]

export default function Services() {
  const [hovered, setHovered] = useState(null)

  return (
    <section style={{ background: 'var(--bg)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              What we offer
            </span>
            <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, color: 'var(--text)', lineHeight: 1.15 }}>
              Everything for your<br />perfect journey.
            </h2>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', maxWidth: 300, lineHeight: 1.75 }}>
            From sacred Hajj & Umrah to the peaks of northern Pakistan and international destinations — we handle every detail.
          </p>
        </div>

        {/* 6 cards in one row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6,1fr)',
          gap: 12,
        }}>
          {services.map((s, i) => (
            <Link
              key={s.title}
              to={s.path}
              style={{
                background: hovered === i ? s.bg : 'var(--card-bg)',
                border: `1px solid ${hovered === i ? s.accent + '55' : 'var(--border)'}`,
                borderRadius: 16,
                padding: '24px 18px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 0,
                transition: 'all 0.3s',
                transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hovered === i ? `0 12px 32px ${s.accent}22` : '0 1px 3px rgba(0,0,0,0.04)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: 220,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: s.accent,
                transform: hovered === i ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.3s ease',
                borderRadius: '16px 16px 0 0',
              }} />

              {/* Icon */}
              <div style={{
                width: 48, height: 48,
                background: hovered === i ? s.accent : s.bg,
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 16,
                transition: 'all 0.3s',
                flexShrink: 0,
              }}>
                {s.icon}
              </div>

              {/* Tag */}
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: s.accent,
                background: s.bg,
                padding: '3px 8px', borderRadius: 20,
                marginBottom: 10, display: 'inline-block',
                border: `1px solid ${s.accent}30`,
              }}>
                {s.tag}
              </span>

              {/* Title */}
              <h3 style={{
                fontSize: 14, fontWeight: 700,
                color: 'var(--text)', marginBottom: 4,
                lineHeight: 1.2,
              }}>
                {s.title}
              </h3>

              {/* Urdu */}
              <span style={{
                fontFamily: 'Noto Nastaliq Urdu,serif',
                direction: 'rtl', fontSize: 10,
                color: s.accent + 'aa',
                display: 'block', marginBottom: 10,
              }}>
                {s.ur}
              </span>

              {/* Desc */}
              <p style={{
                fontSize: 11, color: 'var(--muted)',
                lineHeight: 1.65, flex: 1,
              }}>
                {s.desc}
              </p>

              {/* Arrow */}
              <div style={{
                marginTop: 16, display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: s.accent,
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  Explore
                  <span style={{
                    display: 'inline-block',
                    transform: hovered === i ? 'translateX(3px)' : 'translateX(0)',
                    transition: 'transform 0.3s',
                    fontSize: 13,
                  }}>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust row */}
        <div style={{
          marginTop: 20, padding: '16px 20px',
          background: 'var(--bg2)', border: '1px solid var(--border)',
          borderRadius: 12, display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-around', gap: 8,
        }}>
          {[
            { icon: '✅', text: 'Licensed Travel Agency' },
            { icon: '🔒', text: 'Secure Bookings' },
            { icon: '💬', text: '24/7 WhatsApp Support' },
            { icon: '🏆', text: '15+ Years Experience' },
            { icon: '📋', text: 'Visa Experts' },
          ].map(t => (
            <div key={t.text} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '6px 12px' }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span>
              <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500 }}>{t.text}</span>
            </div>
          ))}
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 1024px) {
            .svc-row { grid-template-columns: repeat(3,1fr) !important; }
          }
          @media (max-width: 640px) {
            .svc-row { grid-template-columns: repeat(2,1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

