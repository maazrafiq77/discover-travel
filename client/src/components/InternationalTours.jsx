import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const placeholder = [
  { _id: '1', title: 'Dubai, UAE', continent: 'Asia', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop', days: '5 Days', price: 'PKR 120,000', description: 'Desert safari, Burj Khalifa, world-class shopping and UAE visa included.' },
  { _id: '2', title: 'Istanbul, Turkey', continent: 'Europe', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&auto=format&fit=crop', days: '7 Days', price: 'PKR 150,000', description: 'Blue Mosque, Cappadocia hot air balloons and Bosphorus cruises.' },
  { _id: '3', title: 'Europe Multi-City', continent: 'Europe', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80&auto=format&fit=crop', days: '10 Days', price: 'PKR 350,000', description: 'Paris, Rome, Amsterdam and the best of European cities in one curated tour.' },
]

const WaIcon = () => (
  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

export default function InternationalTours() {
  const [tours, setTours] = useState(placeholder)

  useEffect(() => {
    axios.get(`${API_URL}/api/tours?type=international`)
      .then(r => { if (Array.isArray(r.data) && r.data.length > 0) setTours(r.data) })
      .catch(() => {})
  }, [])

  const enquire = (t) => {
    const msg = `Assalam o Alaikum!\nTour: ${t.title}\nPrice: ${t.price}\nDuration: ${t.days}`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="tours-head reveal">
          <div>
            <span className="eyebrow">Go global</span>
            <h2 className="h-section">International tours,<br />expertly arranged.</h2>
            <span className="tours-urdu" lang="ur" dir="rtl">بین الاقوامی سیاحت</span>
          </div>
          <Link to="/international" className="tours-view">View all international tours →</Link>
        </div>

        <div className="tours-grid">
          {tours.slice(0, 3).map((t, i) => (
            <article key={t._id} className="tour-card">
              <div className="tour-media">
                <img src={t.image} alt={t.title} loading="lazy" />
                <div className="tour-shade" />
                {t.continent && <span className="tour-region">{t.continent}</span>}
                <span className="tour-name">{t.title}</span>
              </div>
              <div className="tour-body">
                <p className="tour-desc">{t.description}</p>
                <div className="tour-meta">
                  <div>
                    <span className="tour-meta-label">Duration</span>
                    <span className="tour-meta-val">{t.days}</span>
                  </div>
                  <div className="tour-meta-right">
                    <span className="tour-meta-label">Starting from</span>
                    <span className="tour-meta-price">{t.price}</span>
                  </div>
                </div>
                <button onClick={() => enquire(t)} className="tour-cta">
                  <WaIcon /> Enquire on WhatsApp
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .tours-head{ display:flex; flex-direction:column; gap:16px; margin-bottom:28px; }
        .tours-urdu{ display:block; font-family:var(--font-urdu); font-size:13.5px; color:var(--muted); margin-top:6px; }
        .tours-view{ color:var(--brand); font-size:13px; font-weight:700; text-decoration:none; align-self:flex-start; }
        .tours-view:hover{ text-decoration:underline; }
        .tours-grid{ display:grid; grid-template-columns:1fr; gap:16px; }
        .tour-card{
          background:var(--card-bg); border:1px solid var(--border); border-radius:16px;
          overflow:hidden; display:flex; flex-direction:column;
          transition:transform .25s var(--ease), border-color .25s var(--ease), box-shadow .25s var(--ease);
        }
        .tour-card:hover{ border-color:var(--brand-ring); transform:translateY(-3px); box-shadow:var(--shadow-md); }
        .tour-media{ position:relative; aspect-ratio:16/10; overflow:hidden; }
        .tour-media img{ width:100%; height:100%; object-fit:cover; transition:transform .5s var(--ease); }
        .tour-card:hover .tour-media img{ transform:scale(1.04); }
        .tour-shade{ position:absolute; inset:0; background:linear-gradient(to top, rgba(10,11,9,.9) 0%, rgba(10,11,9,0) 65%); }
        .tour-region{ position:absolute; top:12px; right:12px; background:var(--brand); color:#fff; font-size:10px; font-weight:800; letter-spacing:0.6px; padding:4px 9px; border-radius:6px; }
        .tour-name{ position:absolute; bottom:12px; left:14px; right:14px; color:#fff; font-weight:700; font-size:17px; text-shadow:0 1px 12px rgba(0,0,0,.5); }
        .tour-body{ padding:16px; display:flex; flex-direction:column; gap:14px; flex:1; }
        .tour-desc{ font-size:12.5px; line-height:1.6; color:var(--muted); margin:0; flex:1; }
        .tour-meta{ display:flex; justify-content:space-between; gap:12px; }
        .tour-meta-label{ display:block; font-size:10.5px; color:var(--muted); }
        .tour-meta-val{ display:block; font-size:13px; font-weight:700; color:var(--text2); margin-top:2px; }
        .tour-meta-right{ text-align:right; }
        .tour-meta-price{ display:block; font-size:14px; font-weight:800; color:var(--brand); margin-top:2px; }
        .tour-cta{
          display:flex; align-items:center; justify-content:center; gap:6px;
          min-height:46px; padding:10px 14px; border-radius:10px;
          background:var(--bg3); border:1px solid var(--border);
          color:var(--text2); font-size:12.5px; font-weight:700;
          font-family:var(--font-sans); cursor:pointer;
          transition:all .2s;
        }
        .tour-cta:hover{ background:var(--brand); border-color:var(--brand); color:#fff; }
        .tour-cta:active{ transform:scale(.98); }
        @media (min-width:640px){ .tours-grid{ grid-template-columns:repeat(2, 1fr); gap:18px; } }
        @media (min-width:960px){
          .tours-head{ flex-direction:row; justify-content:space-between; align-items:flex-end; margin-bottom:48px; }
          .tours-grid{ grid-template-columns:repeat(3, 1fr); gap:20px; }
          .tour-name{ font-size:18px; }
          .tour-body{ padding:20px; }
        }
      `}</style>
    </section>
  )
}