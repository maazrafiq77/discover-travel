export default function About() {
  return (
    <>
      <header className="page-hero">
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80&auto=format&fit=crop')",
          }}
        />
        <div className="page-hero-shade" />
        <div className="page-hero-inner">
          <span className="eyebrow" style={{ color: '#fff' }}>
            <span style={{ background: '#fff' }} /> Our story
          </span>
          <h1 className="page-hero-title">About Us</h1>
          <p className="page-hero-urdu" lang="ur" dir="rtl">ہمارے بارے میں</p>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <span className="eyebrow">Who we are</span>
              <h2 className="h-section" style={{ marginBottom: 20 }}>
                Discover Travel &amp; Tours
              </h2>
              <p className="about-copy">
                Discover Travel &amp; Tours is a Peshawar-based travel agency with over 15 years of experience providing premium travel services. We specialize in Hajj and Umrah packages, domestic tours across Pakistan, and international tours worldwide.
              </p>
              <p className="about-copy">
                Our team of experienced travel consultants is dedicated to making your journey smooth, comfortable and memorable. From the mountains of northern Pakistan to the deserts of Dubai, we cover every destination with personalized care.
              </p>
              <p className="about-urdu" lang="ur" dir="rtl">
                ہم پشاور سے آپ کے سفر کو یادگار بنانے کے لیے پرعزم ہیں۔ حج، عمرہ، ملکی اور بین الاقوامی سفر میں ہم آپ کے بھروسہ مند ساتھی ہیں۔
              </p>
            </div>

            <div className="about-stats reveal">
              {[
                { number: '15+', label: 'Years Experience', ur: 'سال کا تجربہ' },
                { number: '10,000+', label: 'Happy Customers', ur: 'خوش مسافر' },
                { number: '50+', label: 'Destinations', ur: 'منازل' },
                { number: '500+', label: 'Tours Completed', ur: 'مکمل سفر' },
              ].map((s) => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat-num">{s.number}</div>
                  <div className="about-stat-label">{s.label}</div>
                  <div className="about-stat-urdu" lang="ur" dir="rtl">{s.ur}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 64 }}>
            <div className="reveal">
              <span className="eyebrow">Our values</span>
              <h2 className="h-section" style={{ marginBottom: 24 }}>What we stand for</h2>
            </div>

            <div className="values-grid">
              {[
                { icon: '🤝', title: 'Trust', desc: 'Long-term relationships built on honesty, transparency and results.' },
                { icon: '⭐', title: 'Quality', desc: 'We never compromise on the quality of our services and packages.' },
                { icon: '❤️', title: 'Care', desc: 'We treat every traveller like family and go the extra mile.' },
              ].map((v, i) => (
                <div key={v.title} className="value-card reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="value-icon" aria-hidden="true">{v.icon}</div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-grid { display: grid; grid-template-columns: 1fr; gap: 28px; }
        .about-copy { font-size: 14px; color: var(--muted); line-height: 1.85; margin: 0 0 14px; }
        .about-urdu {
          font-family: var(--font-urdu); font-size: 15px;
          color: var(--muted); line-height: 2; margin: 6px 0 0;
        }
        .about-stats {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;
        }
        .about-stat {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px 12px;
          text-align: center;
        }
        .about-stat-num {
          font-family: var(--font-serif); font-size: 32px;
          font-weight: 600; color: var(--brand); line-height: 1;
        }
        .about-stat-label { color: var(--text2); font-size: 12px; font-weight: 700; margin-top: 6px; }
        .about-stat-urdu {
          font-family: var(--font-urdu); font-size: 11px;
          color: color-mix(in srgb, var(--brand) 55%, transparent); margin-top: 4px;
        }

        .values-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .value-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 26px 22px;
          text-align: center;
          transition: transform .25s var(--ease), border-color .25s var(--ease);
        }
        .value-card:hover { border-color: var(--brand-ring); transform: translateY(-3px); }
        .value-icon { font-size: 34px; margin-bottom: 12px; }
        .value-title { font-size: 16px; font-weight: 700; color: var(--brand); margin: 0 0 8px; }
        .value-desc { font-size: 13px; color: var(--muted); line-height: 1.7; margin: 0; }

        @media (min-width: 768px) {
          .values-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
          .about-stat-num { font-size: 38px; }
        }
        @media (min-width: 960px) {
          .about-grid { grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
        }
      `}</style>
    </>
  )
}