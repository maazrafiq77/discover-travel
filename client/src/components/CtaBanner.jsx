export default function CtaBanner() {
  return (
    <section style={{ background: '#E8622A', padding: '72px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(26px,3vw,40px)', fontWeight: 600, color: '#fff', marginBottom: 8 }}>Ready to go?</h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}>Talk to a consultant — we'll build the right package for you.</p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="https://wa.me/923439343482" target="_blank" rel="noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#E8622A',
            textDecoration: 'none', padding: '13px 24px',
            borderRadius: 8, fontSize: 13, fontWeight: 700,
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0ede8'}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            💬 Chat on WhatsApp
          </a>
          <a href="tel:+923439343482" style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: '#fff',
            textDecoration: 'none', padding: '11px 22px',
            borderRadius: 8, fontSize: 13, fontWeight: 600,
            border: '2px solid rgba(255,255,255,0.4)',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'}
          >
            📞 Call Us Now
          </a>
        </div>
      </div>
    </section>
  )
}

