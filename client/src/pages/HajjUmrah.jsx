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
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

export default function HajjUmrah() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    axios
      .get(`${API_URL}/api/hajj`)
      .then(r => {
        if (!cancelled) {
          setPackages(Array.isArray(r.data) ? r.data : [])
          setError(null)
        }
      })
      .catch(() => { if (!cancelled) setError('Could not load packages right now.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const handleEnquire = (pkg) => {
    const msg = `Assalam o Alaikum!\nEnquiry: ${pkg.title}\nPrice: ${pkg.price}\nDuration: ${pkg.days}\nPlease share details.`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      <header className="page-hero">
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=80&auto=format&fit=crop')",
          }}
        />
        <div className="page-hero-shade" />
        <div className="page-hero-inner">
          <span className="eyebrow" style={{ color: '#fff' }}>
            <span style={{ background: '#fff' }} /> Sacred journeys
          </span>
          <h1 className="page-hero-title">Hajj &amp; Umrah Packages</h1>
          <p className="page-hero-urdu" lang="ur" dir="rtl">حج و عمرہ پیکجز</p>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="reveal">
            <span className="eyebrow">Choose your package</span>
            <h2 className="h-section" style={{ marginBottom: 28 }}>
              Packages for every need &amp; budget
            </h2>
          </div>

          {loading && (
            <div className="pkg-grid">
              {[1, 2, 3].map(k => (
                <div key={k} className="skeleton" style={{ height: 420, borderRadius: 16 }} />
              ))}
            </div>
          )}

          {!loading && (error || packages.length === 0) && (
            <div className="pkg-empty">
              <p>
                {error
                  ? error
                  : 'No packages added yet. Please contact us on WhatsApp for current packages.'}
              </p>
              <a
                href="https://wa.me/923439343482"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                <WaIcon /> WhatsApp Us
              </a>
            </div>
          )}

          {!loading && packages.length > 0 && (
            <div className="pkg-grid">
              {packages.map((pkg, i) => (
                <article
                  key={pkg._id}
                  className={`pkg-card reveal${pkg.isPopular ? ' is-popular' : ''}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {pkg.isPopular && (
                    <span className="pkg-badge">MOST POPULAR</span>
                  )}
                  <h3 className="pkg-title">{pkg.title}</h3>
                  <p className="pkg-price">{pkg.price}</p>
                  <p className="pkg-meta">{pkg.days} · per person</p>
                  <div className="pkg-divider" />
                  <ul className="pkg-includes">
                    {(pkg.includes || []).map(item => (
                      <li key={item}>
                        <span className="pkg-tick">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleEnquire(pkg)} className="pkg-cta">
                    <WaIcon /> Enquire on WhatsApp
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="reveal" style={{ maxWidth: 720 }}>
            <span className="eyebrow">Step by step</span>
            <h2 className="h-section" style={{ marginBottom: 6 }}>How to perform Umrah</h2>
            <p className="steps-urdu" lang="ur" dir="rtl" style={{ marginBottom: 24 }}>
              عمرہ کیسے ادا کریں
            </p>
          </div>

          <div className="steps-list">
            {steps.map((s) => (
              <div key={s.step} className="step-row reveal">
                <span className="step-num">{s.step}</span>
                <div>
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .pkg-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .pkg-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 22px;
          position: relative;
          overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform .25s var(--ease), border-color .25s var(--ease), box-shadow .25s var(--ease);
        }
        .pkg-card:hover {
          border-color: var(--brand-ring);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .pkg-card.is-popular { background: var(--brand); border-color: var(--brand); }
        .pkg-card.is-popular:hover { transform: translateY(-3px); }
        .pkg-badge {
          position: absolute; top: 14px; right: 14px;
          background: rgba(255,255,255,.2); color: #fff;
          font-size: 10px; font-weight: 700; letter-spacing: 1px;
          padding: 4px 10px; border-radius: 999px;
        }
        .pkg-title { font-size: 16px; font-weight: 700; color: var(--text); margin: 0 0 6px; }
        .pkg-card.is-popular .pkg-title { color: #fff; }
        .pkg-price {
          font-family: var(--font-serif); font-size: 30px; font-weight: 600;
          color: var(--brand); margin: 0 0 4px; line-height: 1;
        }
        .pkg-card.is-popular .pkg-price { color: #fff; }
        .pkg-meta { font-size: 12px; color: var(--muted); margin: 0 0 18px; }
        .pkg-card.is-popular .pkg-meta { color: rgba(255,255,255,.7); }
        .pkg-divider { height: 1px; background: var(--border); margin-bottom: 16px; }
        .pkg-card.is-popular .pkg-divider { background: rgba(255,255,255,.2); }
        .pkg-includes { list-style: none; padding: 0; margin: 0 0 20px; flex: 1; }
        .pkg-includes li {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 10px; font-size: 12.5px;
          color: var(--text2); line-height: 1.5;
        }
        .pkg-card.is-popular .pkg-includes li { color: rgba(255,255,255,.85); }
        .pkg-tick {
          width: 18px; height: 18px; flex-shrink: 0;
          background: var(--brand-soft); color: var(--brand);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 10px;
        }
        .pkg-card.is-popular .pkg-tick { background: rgba(255,255,255,.2); color: #fff; }
        .pkg-cta {
          width: 100%; border: 0; border-radius: 10px;
          padding: 13px; font-size: 12.5px; font-weight: 700;
          background: var(--brand); color: #fff;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-family: var(--font-sans); cursor: pointer;
          transition: all .2s;
        }
        .pkg-card.is-popular .pkg-cta { background: #fff; color: var(--brand); }
        .pkg-cta:hover { filter: brightness(.95); }
        .pkg-cta:active { transform: scale(.98); }

        .pkg-empty {
          background: var(--card-bg); border: 1px solid var(--border);
          border-radius: 16px; padding: 40px 20px; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          color: var(--muted); font-size: 14px;
        }

        .steps-urdu {
          font-family: var(--font-urdu); color: var(--muted); font-size: 14px; margin: 0;
        }
        .steps-list { display: flex; flex-direction: column; gap: 12px; max-width: 720px; }
        .step-row {
          display: flex; gap: 16px; align-items: flex-start;
          background: var(--card-bg); border: 1px solid var(--border);
          border-radius: 14px; padding: 18px 20px;
          transition: border-color .2s var(--ease);
        }
        .step-row:hover { border-color: var(--brand-ring); }
        .step-num {
          font-family: var(--font-serif); font-size: 26px; font-weight: 600;
          color: color-mix(in srgb, var(--brand) 35%, transparent);
          line-height: 1; min-width: 40px; flex-shrink: 0;
        }
        .step-title { font-size: 14.5px; font-weight: 700; color: var(--text); margin: 0 0 4px; }
        .step-desc { font-size: 13px; color: var(--muted); line-height: 1.7; margin: 0; }

        @media (min-width: 640px) {
          .pkg-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (min-width: 960px) {
          .pkg-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
          .pkg-card { padding: 26px; }
          .pkg-price { font-size: 34px; }
          .step-num { font-size: 32px; }
        }
      `}</style>
    </>
  )
}