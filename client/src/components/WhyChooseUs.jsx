const reasons = [
  { icon: '🛡️', title: '15+ Years of Proven Trust', desc: 'Thousands of families from Peshawar and across Pakistan have trusted us with their most important journeys.', stat: '10,000+', statLabel: 'Happy Customers', accent: '#E8622A' },
  { icon: '🕋', title: 'Hajj & Umrah Specialists', desc: 'We specialize in sacred travel — every detail handled with the reverence and care it deserves.', stat: '500+', statLabel: 'Umrah Completed', accent: '#8B5CF6' },
  { icon: '💬', title: '24/7 WhatsApp Support', desc: 'Reach our team at any hour — before departure, during travel and after return.', stat: '24/7', statLabel: 'Available', accent: '#10B981' },
  { icon: '💰', title: 'No Hidden Charges', desc: 'Transparent pricing always. What we quote is exactly what you pay.', stat: '100%', statLabel: 'Transparent', accent: '#F59E0B' },
  { icon: '🌍', title: '50+ Destinations', desc: 'From Kumrat to Europe, we cover every destination with personalized packages built around your budget.', stat: '50+', statLabel: 'Destinations', accent: '#0EA5E9' },
  { icon: '📋', title: 'High Visa Success Rate', desc: "Expert visa consultancy for all major countries with one of Pakistan's highest approval rates.", stat: '95%', statLabel: 'Success Rate', accent: '#EC4899' },
]

export default function WhyChooseUs() {
  return (
    <section className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="why-head reveal">
          <div>
            <span className="eyebrow">Why choose us</span>
            <h2 className="h-section">
              Why thousands trust<br />Discover Travel.
            </h2>
          </div>
          <p className="why-head-copy">
            We are not just a travel agency. We are your journey partner — from the first enquiry to safe return home. Every package is built around your needs, your budget and your peace of mind.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div
              key={r.title}
              className="why-card reveal"
              style={{ transitionDelay: `${i * 40}ms`, '--accent': r.accent }}
            >
              <div className="why-card-top">
                <div className="why-icon">{r.icon}</div>
                <div className="why-stat">
                  <div className="why-stat-num">{r.stat}</div>
                  <div className="why-stat-label">{r.statLabel}</div>
                </div>
              </div>
              <div className="why-divider" />
              <h3 className="why-title">{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-head {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 32px;
        }
        .why-head-copy {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.8;
          max-width: 440px;
          margin: 0;
        }

        .why-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .why-card {
          position: relative;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px 20px;
          overflow: hidden;
          transition:
            transform .25s var(--ease),
            border-color .25s var(--ease),
            box-shadow .25s var(--ease);
        }
        .why-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .35s var(--ease);
        }
        .why-card:hover {
          border-color: color-mix(in srgb, var(--accent) 40%, transparent);
          transform: translateY(-3px);
          box-shadow: 0 14px 34px color-mix(in srgb, var(--accent) 12%, transparent);
        }
        .why-card:hover::before {
          transform: scaleX(1);
        }

        .why-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 16px;
        }
        .why-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          transition: background .25s var(--ease), transform .25s var(--ease);
        }
        .why-card:hover .why-icon {
          background: var(--accent);
          transform: scale(1.06);
        }
        .why-stat { text-align: right; }
        .why-stat-num {
          font-family: var(--font-serif);
          font-size: 24px;
          font-weight: 600;
          color: var(--accent);
          line-height: 1;
        }
        .why-stat-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.4px;
          color: var(--muted);
          margin-top: 4px;
        }
        .why-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 16px;
        }
        .why-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin: 0 0 8px;
          line-height: 1.3;
        }
        .why-desc {
          font-size: 12.5px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0;
        }

        @media (min-width: 640px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (min-width: 960px) {
          .why-head {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 52px;
            gap: 48px;
          }
          .why-grid { grid-template-columns: repeat(3, 1fr); }
          .why-card { padding: 28px 24px; }
          .why-stat-num { font-size: 28px; }
        }
      `}</style>
    </section>
  )
}