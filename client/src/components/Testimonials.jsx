import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const placeholder = [
  { _id: '1', name: 'Ahmed Khan', location: 'Peshawar', rating: 5, text: 'Our Umrah trip was perfectly organized. Every single detail was taken care of — we had complete peace of mind the entire journey.' },
  { _id: '2', name: 'Fatima Bibi', location: 'Nowshera', rating: 5, text: 'Kumrat Valley tour was breathtaking. The arrangements were flawless and the price was very reasonable. Highly recommend.' },
  { _id: '3', name: 'Tariq Mehmood', location: 'Peshawar', rating: 5, text: 'Dubai family package was excellent — visa processed quickly, hotel was fantastic, and the team was always reachable on WhatsApp.' },
]

export default function Testimonials() {
  const [reviews, setReviews] = useState(placeholder)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios.get(`${API_URL}/api/testimonials`)
      .then(r => { if (Array.isArray(r.data) && r.data.length > 0) setReviews(r.data) })
      .catch(() => { /* fallback keeps placeholders */ })
      .finally(() => setLoaded(true))
  }, [])

  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="reveal">
          <span className="eyebrow">Client stories</span>
          <h2 className="h-section" style={{ marginBottom: 32 }}>Real travellers.<br />Real journeys.</h2>
        </div>

        <div className="rev-grid">
          {!loaded && [1,2,3].map(k => (
            <div key={k} className="skeleton" style={{ height: 240, borderRadius: 16 }} />
          ))}

          {loaded && reviews.slice(0, 3).map((r, i) => (
            <article key={r._id || i} className="rev-card reveal" style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="rev-quote" aria-hidden="true">“</span>
              <div className="rev-stars" aria-label={`${r.rating} out of 5`}>
                {'★'.repeat(r.rating || 5)}
              </div>
              <p className="rev-text">"{r.text}"</p>
              {r.textUr && (
                <p className="rev-urdu" lang="ur" dir="rtl">{r.textUr}</p>
              )}
              <footer className="rev-foot">
                <div className="rev-avatar" aria-hidden="true">
                  {(r.name || '?').trim().charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="rev-name">{r.name}</div>
                  <div className="rev-loc">{r.location}</div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .rev-grid{ display:grid; grid-template-columns:1fr; gap:16px; }
        .rev-card{
          position:relative;
          background:var(--card-bg);
          border:1px solid var(--border);
          border-radius:16px;
          padding:26px 22px;
          overflow:hidden;
          display:flex; flex-direction:column;
        }
        .rev-quote{
          position:absolute; top:10px; right:16px;
          font-family:Georgia,serif; font-size:88px; line-height:1;
          color:color-mix(in srgb, var(--brand) 10%, transparent);
          pointer-events:none; user-select:none;
        }
        .rev-stars{ color:var(--brand); font-size:13px; letter-spacing:3px; margin-bottom:14px; }
        .rev-text{
          font-family:var(--font-serif); font-style:italic;
          font-size:14px; line-height:1.75;
          color:var(--text2); margin:0 0 18px; flex:1;
        }
        .rev-urdu{
          font-family:var(--font-urdu); font-size:12.5px;
          color:var(--muted); margin:0 0 16px;
        }
        .rev-foot{
          display:flex; align-items:center; gap:12px;
          padding-top:16px; border-top:1px solid var(--border);
          margin-top:auto;
        }
        .rev-avatar{
          width:40px; height:40px; border-radius:50%;
          background:var(--brand); color:#fff;
          display:flex; align-items:center; justify-content:center;
          font-weight:800; font-size:15px; flex-shrink:0;
        }
        .rev-name{ font-size:13.5px; font-weight:700; color:var(--text); }
        .rev-loc{ font-size:11.5px; color:var(--muted); margin-top:2px; }

        @media (min-width:640px){
          .rev-grid{ grid-template-columns:repeat(2, 1fr); gap:18px; }
        }
        @media (min-width:960px){
          .rev-grid{ grid-template-columns:repeat(3, 1fr); gap:20px; }
          .rev-card{ padding:32px 28px; }
          .rev-text{ font-size:14.5px; }
        }
      `}</style>
    </section>
  )
}