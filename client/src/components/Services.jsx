import { Link } from 'react-router-dom'

const services = [
  { title: 'Hajj & Umrah', ur: 'حج و عمرہ', desc: 'Complete sacred packages with visa, flights, hotels & Ziyarat.', tag: 'Sacred Travel', path: '/hajj-umrah', icon: '🕋', accent: '#E8622A', bg: 'rgba(232,98,42,0.10)' },
  { title: 'Domestic Tours', ur: 'ملکی سیاحت', desc: 'Kumrat, Swat, Naran, Gilgit, Chitral — the best of Pakistan.', tag: 'Northern Pakistan', path: '/domestic', icon: '🏔️', accent: '#0EA5E9', bg: 'rgba(14,165,233,0.10)' },
  { title: 'International', ur: 'بین الاقوامی سفر', desc: 'Dubai, Turkey, Malaysia, Europe and beyond.', tag: 'Worldwide', path: '/international', icon: '✈️', accent: '#8B5CF6', bg: 'rgba(139,92,246,0.10)' },
  { title: 'Visa Consultancy', ur: 'ویزا مشاورت', desc: 'Expert visa processing for all major countries.', tag: 'All Countries', path: '/visa', icon: '📋', accent: '#10B981', bg: 'rgba(16,185,129,0.10)' },
  { title: 'Flight Tickets', ur: 'فلائٹ ٹکٹ', desc: 'Best fares on all airlines — economy to first class.', tag: 'All Airlines', path: '/contact', icon: '🎫', accent: '#F59E0B', bg: 'rgba(245,158,11,0.10)' },
  { title: 'Hotel Booking', ur: 'ہوٹل بکنگ', desc: 'Worldwide hotel reservations from 3★ to 5★.', tag: 'Worldwide', path: '/contact', icon: '🏨', accent: '#EC4899', bg: 'rgba(236,72,153,0.10)' },
]

export default function Services() {
  return (
    <section className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="svc-head reveal">
          <div>
            <span className="eyebrow">What we offer</span>
            <h2 className="h-section">Everything for your<br />perfect journey.</h2>
          </div>
          <p className="svc-head-copy">
            From sacred Hajj &amp; Umrah to the peaks of northern Pakistan and international destinations — we handle every detail.
          </p>
        </div>

        <div className="svc-grid">
          {services.map((s, i) => (
            <Link
              key={s.title}
              to={s.path}
              className="svc-card reveal"
              style={{ transitionDelay: `${i * 40}ms`, '--accent': s.accent, '--accent-bg': s.bg }}
            >
              <div className="svc-icon">{s.icon}</div>
              <span className="svc-tag">{s.tag}</span>
              <h3 className="svc-title">{s.title}</h3>
              <span className="svc-urdu" lang="ur" dir="rtl">{s.ur}</span>
              <p className="svc-desc">{s.desc}</p>
              <span className="svc-arrow">Explore →</span>
            </Link>
          ))}
        </div>

        <div className="svc-trust reveal">
          {[
            { i: '✅', t: 'Licensed Travel Agency' },
            { i: '🔒', t: 'Secure Bookings' },
            { i: '💬', t: '24/7 WhatsApp Support' },
            { i: '🏆', t: '15+ Years Experience' },
            { i: '📋', t: 'Visa Experts' },
          ].map(x => (
            <div key={x.t} className="svc-trust-item">
              <span>{x.i}</span>
              <span>{x.t}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .svc-head{
          display:flex; flex-direction:column; gap:18px; margin-bottom:32px;
        }
        .svc-head-copy{ font-size:14px; color:var(--muted); line-height:1.75; max-width:420px; margin:0; }

        .svc-grid{ display:grid; gap:12px; grid-template-columns:repeat(2, 1fr); }
        .svc-card{
          position:relative;
          display:flex; flex-direction:column;
          background:var(--card-bg);
          border:1px solid var(--border);
          border-radius:16px;
          padding:18px 14px;
          text-decoration:none;
          color:inherit;
          overflow:hidden;
          transition:transform .25s var(--ease), border-color .25s var(--ease), box-shadow .25s var(--ease), background .25s var(--ease);
          min-height:200px;
          -webkit-tap-highlight-color:transparent;
        }
        .svc-card::before{
          content:"";
          position:absolute; top:0; left:0; right:0; height:3px;
          background:var(--accent);
          transform:scaleX(0);
          transform-origin:left;
          transition:transform .3s var(--ease);
        }
        .svc-card:hover{
          border-color:color-mix(in srgb, var(--accent) 55%, transparent);
          background:var(--accent-bg);
          transform:translateY(-4px);
          box-shadow:0 12px 32px color-mix(in srgb, var(--accent) 18%, transparent);
        }
        .svc-card:hover::before{ transform:scaleX(1); }
        .svc-card:active{ transform:scale(.98); }

        .svc-icon{
          width:44px; height:44px;
          border-radius:12px;
          background:var(--accent-bg);
          display:flex; align-items:center; justify-content:center;
          font-size:22px; margin-bottom:14px;
          transition:background .25s, transform .25s;
        }
        .svc-card:hover .svc-icon{ background:var(--accent); transform:scale(1.06); }
        .svc-tag{
          font-size:9px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase;
          color:var(--accent); background:var(--accent-bg);
          padding:3px 8px; border-radius:999px;
          border:1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          align-self:flex-start; margin-bottom:10px;
        }
        .svc-title{ font-size:14px; font-weight:700; color:var(--text); margin:0 0 4px; line-height:1.25; }
        .svc-urdu{ font-family:var(--font-urdu); font-size:11px; color:color-mix(in srgb, var(--accent) 65%, transparent); margin-bottom:8px; }
        .svc-desc{ font-size:11.5px; color:var(--muted); line-height:1.6; margin:0; flex:1; }
        .svc-arrow{ display:inline-flex; align-items:center; font-size:11px; font-weight:700; color:var(--accent); margin-top:12px; }

        .svc-trust{
          margin-top:20px;
          padding:14px 16px;
          background:var(--bg2);
          border:1px solid var(--border);
          border-radius:14px;
          display:grid;
          grid-template-columns:1fr;
          gap:6px;
        }
        .svc-trust-item{
          display:flex; align-items:center; gap:8px;
          font-size:12px; color:var(--muted); font-weight:500;
          padding:6px 4px;
        }
        .svc-trust-item > span:first-child{ font-size:14px; }

        @media (min-width:640px){
          .svc-grid{ grid-template-columns:repeat(3, 1fr); gap:14px; }
          .svc-trust{ grid-template-columns:repeat(2, 1fr); }
          .svc-head{ flex-direction:row; justify-content:space-between; align-items:flex-end; }
          .svc-head-copy{ text-align:right; }
        }
        @media (min-width:960px){
          .svc-grid{ grid-template-columns:repeat(6, 1fr); gap:12px; }
          .svc-card{ padding:22px 16px; min-height:220px; }
          .svc-trust{ grid-template-columns:repeat(5, 1fr); justify-items:center; padding:16px 20px; }
          .svc-head{ margin-bottom:56px; }
        }
      `}</style>
    </section>
  )
}