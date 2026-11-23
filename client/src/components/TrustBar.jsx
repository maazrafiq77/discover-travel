const stats = [
  { number: '15+', label: 'Years Experience', ur: 'سال کا تجربہ' },
  { number: '10,000+', label: 'Happy Travellers', ur: 'خوش مسافر' },
  { number: '50+', label: 'Destinations', ur: 'منازل' },
  { number: '500+', label: 'Tours Completed', ur: 'مکمل سفر' },
]

export default function TrustBar() {
  return (
    <section className="trustbar">
      <div className="container">
        <div className="trust-grid reveal">
          {stats.map((s) => (
            <div key={s.label} className="trust-cell">
              <div className="trust-num">{s.number}</div>
              <div className="trust-label">{s.label}</div>
              <div className="trust-urdu" lang="ur" dir="rtl">{s.ur}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trustbar{
          background:var(--bg3);
          border-top:1px solid var(--border);
          border-bottom:1px solid var(--border);
        }
        .trust-grid{
          display:grid;
          grid-template-columns:repeat(2, 1fr);
          gap:0;
        }
        .trust-cell{
          text-align:center;
          padding:26px 10px;
          border-right:1px solid var(--border);
          border-bottom:1px solid var(--border);
        }
        .trust-cell:nth-child(2n){ border-right:none; }
        .trust-cell:nth-child(n+3){ border-bottom:none; }
        .trust-num{
          font-family:var(--font-serif);
          font-size:32px; font-weight:600;
          color:var(--brand); line-height:1;
        }
        .trust-label{
          color:var(--text2); font-size:11px; font-weight:700;
          margin-top:6px; letter-spacing:0.2px;
        }
        .trust-urdu{
          font-family:var(--font-urdu); font-size:10.5px;
          color:color-mix(in srgb, var(--brand) 55%, transparent);
          margin-top:4px;
        }
        @media (min-width:640px){
          .trust-num{ font-size:40px; }
          .trust-label{ font-size:12px; }
          .trust-urdu{ font-size:11px; }
        }
        @media (min-width:960px){
          .trust-grid{ grid-template-columns:repeat(4, 1fr); }
          .trust-cell{
            padding:38px 16px;
            border-bottom:none;
            border-right:1px solid var(--border);
          }
          .trust-cell:last-child{ border-right:none; }
          .trust-num{ font-size:48px; }
          .trust-label{ font-size:12.5px; margin-top:8px; }
        }
      `}</style>
    </section>
  )
}