const stats = [
  { number: '15+', label: 'Years Experience', ur: 'سال کا تجربہ' },
  { number: '10,000+', label: 'Happy Travellers', ur: 'خوش مسافر' },
  { number: '50+', label: 'Destinations', ur: 'منازل' },
  { number: '500+', label: 'Tours Completed', ur: 'مکمل سفر' },
]

export default function TrustBar() {
  return (
    <section style={{
      background: 'var(--bg3)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center',
              padding: '36px 16px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'Lora,serif', fontSize: 44, fontWeight: 600, color: '#E8622A', lineHeight: 1 }}>{s.number}</div>
              <div style={{ color: 'var(--text2)', fontSize: 12, fontWeight: 600, marginTop: 6 }}>{s.label}</div>
              <div style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'rgba(232,98,42,0.5)', fontSize: 11, marginTop: 3 }}>{s.ur}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

