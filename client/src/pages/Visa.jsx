import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const WaIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

export default function Visa() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    axios
      .get(`${API_URL}/api/visa`)
      .then(r => {
        if (!cancelled) {
          setCountries(Array.isArray(r.data) ? r.data : [])
          setError(null)
        }
      })
      .catch(() => { if (!cancelled) setError('Could not load visa information.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const enquire = (c) => {
    const msg = `Assalam o Alaikum!\nVisa Enquiry: ${c.country}\nType: ${c.type}\nPlease guide me.`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      <header className="page-hero">
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&q=80&auto=format&fit=crop')",
          }}
        />
        <div className="page-hero-shade" />
        <div className="page-hero-inner">
          <span className="eyebrow" style={{ color: '#fff' }}>
            <span style={{ background: '#fff' }} /> Expert processing
          </span>
          <h1 className="page-hero-title">Visa Consultancy</h1>
          <p className="page-hero-urdu" lang="ur" dir="rtl">ویزا مشاورت</p>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="visa-head reveal">
            <div>
              <span className="eyebrow">All countries</span>
              <h2 className="h-section" style={{ marginBottom: 0 }}>
                We process visas for all major countries
              </h2>
            </div>
            <p className="visa-head-copy">
              High approval rate, fast processing, complete documentation support. WhatsApp us for any country not listed.
            </p>
          </div>

          {loading && (
            <div className="visa-grid">
              {[1, 2, 3, 4, 5, 6].map(k => (
                <div key={k} className="skeleton" style={{ height: 240, borderRadius: 16 }} />
              ))}
            </div>
          )}

          {!loading && (error || countries.length === 0) && (
            <div className="visa-empty">
              <p>
                {error
                  ? error
                  : 'No visa information added yet. Contact us for any country.'}
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

          {!loading && countries.length > 0 && (
            <div className="visa-grid">
              {countries.map((c, i) => (
                  <article key={c._id} className="visa-card">
                  <div className="visa-head-row">
                    <span className="visa-flag" aria-hidden="true">{c.flag}</span>
                    <div>
                      <h3 className="visa-country">{c.country}</h3>
                      <span className="visa-type">{c.type}</span>
                    </div>
                  </div>
                  <div className="visa-divider" />
                  <div className="visa-meta">
                    <div>
                      <p className="visa-meta-label">Processing</p>
                      <p className="visa-meta-val">{c.processing}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="visa-meta-label">Service fee</p>
                      <p className="visa-meta-price">{c.fee}</p>
                    </div>
                  </div>
                  <button onClick={() => enquire(c)} className="visa-cta">
                    <WaIcon /> Enquire now
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .visa-head {
          display: flex; flex-direction: column; gap: 14px;
          margin-bottom: 28px;
        }
        .visa-head-copy {
          font-size: 13.5px; color: var(--muted);
          line-height: 1.7; margin: 0; max-width: 420px;
        }
        .visa-grid { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .visa-card {
          background: var(--card-bg); border: 1px solid var(--border);
          border-radius: 16px; padding: 20px;
          display: flex; flex-direction: column;
          transition: transform .25s var(--ease), border-color .25s var(--ease), box-shadow .25s var(--ease);
        }
        .visa-card:hover {
          border-color: var(--brand-ring);
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        .visa-head-row { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .visa-flag { font-size: 34px; line-height: 1; }
        .visa-country { font-size: 15px; font-weight: 700; color: var(--text); margin: 0 0 4px; }
        .visa-type {
          font-size: 10px; font-weight: 700; letter-spacing: .5px;
          background: var(--brand-soft); color: var(--brand);
          padding: 3px 8px; border-radius: 999px; display: inline-block;
        }
        .visa-divider { height: 1px; background: var(--border); margin-bottom: 14px; }
        .visa-meta { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
        .visa-meta-label {
          font-size: 10px; color: var(--muted); font-weight: 700;
          letter-spacing: .8px; text-transform: uppercase; margin: 0 0 4px;
        }
        .visa-meta-val { font-size: 14px; font-weight: 700; color: var(--text); margin: 0; }
        .visa-meta-price { font-size: 15px; font-weight: 800; color: var(--brand); margin: 0; }
        .visa-cta {
          margin-top: auto;
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 6px;
          min-height: 44px; padding: 10px;
          border: 1px solid var(--border); border-radius: 10px;
          background: var(--bg3); color: var(--text2);
          font-size: 12.5px; font-weight: 700; font-family: var(--font-sans);
          cursor: pointer; transition: all .2s;
        }
        .visa-cta:hover { background: var(--brand); color: #fff; border-color: var(--brand); }
        .visa-cta:active { transform: scale(.98); }

        .visa-empty {
          background: var(--card-bg); border: 1px solid var(--border);
          border-radius: 16px; padding: 40px 20px; text-align: center;
          color: var(--muted); font-size: 14px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }

        @media (min-width: 640px) {
          .visa-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (min-width: 960px) {
          .visa-grid { grid-template-columns: repeat(3, 1fr); gap: 18px; }
          .visa-head {
            flex-direction: row; justify-content: space-between;
            align-items: flex-end; gap: 32px; margin-bottom: 44px;
          }
          .visa-head-copy { text-align: right; }
        }
      `}</style>
    </>
  )
}