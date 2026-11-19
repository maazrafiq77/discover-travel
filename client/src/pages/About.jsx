export default function About() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,1) 0%, rgba(10,10,8,0.5) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 24px 40px', width: '100%' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Our Story</span>
          <h1 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#fff' }}>About Us</h1>
          <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'rgba(232,98,42,0.8)', fontSize: 20, marginTop: 8 }}>ہمارے بارے میں</p>
        </div>
      </div>

      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', marginBottom: 72 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Who we are</span>
              <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: 'var(--text)', marginBottom: 20 }}>Discover Travel & Tours</h2>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 16 }}>
                Discover Travel & Tours is a Peshawar-based travel agency with over 15 years of experience providing premium travel services. We specialize in Hajj and Umrah packages, domestic tours across Pakistan, and international tours worldwide.
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.85, marginBottom: 20 }}>
                Our team of experienced travel consultants is dedicated to making your journey smooth, comfortable and memorable. From the mountains of northern Pakistan to the deserts of Dubai, we cover every destination with personalized care.
              </p>
              <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'var(--muted)', fontSize: 14, lineHeight: 2 }}>
                ہم پشاور سے آپ کے سفر کو یادگار بنانے کے لیے پرعزم ہیں۔ حج، عمرہ، ملکی اور بین الاقوامی سفر میں ہم آپ کے بھروسہ مند ساتھی ہیں۔
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { number: '15+', label: 'Years Experience', ur: 'سال کا تجربہ' },
                { number: '10,000+', label: 'Happy Customers', ur: 'خوش مسافر' },
                { number: '50+', label: 'Destinations', ur: 'منازل' },
                { number: '500+', label: 'Tours Completed', ur: 'مکمل سفر' },
              ].map(s => (
                <div key={s.label} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, textAlign: 'center' }}>
                  <p style={{ fontFamily: 'Lora,serif', fontSize: 36, fontWeight: 600, color: '#E8622A', lineHeight: 1 }}>{s.number}</p>
                  <p style={{ color: 'var(--text2)', fontSize: 12, fontWeight: 600, marginTop: 6 }}>{s.label}</p>
                  <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'rgba(232,98,42,0.5)', fontSize: 11, marginTop: 3 }}>{s.ur}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Our Values</span>
          <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(24px,3vw,36px)', fontWeight: 600, color: 'var(--text)', marginBottom: 32 }}>What we stand for</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[
              { icon: '🤝', title: 'Trust', desc: 'Long-term relationships built on honesty, transparency and results.' },
              { icon: '⭐', title: 'Quality', desc: 'We never compromise on the quality of our services and packages.' },
              { icon: '❤️', title: 'Care', desc: 'We treat every traveller like family and go the extra mile.' },
            ].map(v => (
              <div key={v.title} style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#E8622A', marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

