export default function CtaBanner() {
  return (
    <section className="cta reveal">
      <div className="container cta-inner">
        <div className="cta-copy">
          <h2 className="cta-title">Ready to go?</h2>
          <p className="cta-sub">Talk to a consultant — we'll build the right package for you.</p>
        </div>
        <div className="cta-actions">
          <a
            href="https://wa.me/923439343482"
            target="_blank"
            rel="noreferrer"
            className="cta-btn cta-primary"
          >
            💬 Chat on WhatsApp
          </a>
          <a href="tel:+923439343482" className="cta-btn cta-ghost">
            📞 Call Us Now
          </a>
        </div>
      </div>

      <style>{`
        .cta{ background:var(--brand); padding:56px 0; }
        .cta-inner{ display:flex; flex-direction:column; gap:22px; }
        .cta-title{
          font-family:var(--font-serif); font-weight:600;
          font-size:clamp(24px, 5vw, 38px); color:#fff;
          margin:0 0 8px; line-height:1.15;
        }
        .cta-sub{ font-size:13.5px; color:rgba(255,255,255,.78); margin:0; }
        .cta-actions{ display:flex; flex-direction:column; gap:10px; }
        .cta-btn{
          display:flex; align-items:center; justify-content:center; gap:8px;
          min-height:50px; padding:12px 22px;
          border-radius:12px;
          font-size:13px; font-weight:700;
          text-decoration:none;
          transition:transform .2s var(--ease), background .2s, border-color .2s;
          -webkit-tap-highlight-color:transparent;
        }
        .cta-btn:active{ transform:scale(.97); }
        .cta-primary{ background:#fff; color:var(--brand); }
        .cta-primary:hover{ background:#F4F1EC; }
        .cta-ghost{
          background:transparent; color:#fff;
          border:2px solid rgba(255,255,255,.45);
        }
        .cta-ghost:hover{ border-color:#fff; }

        @media (min-width:640px){
          .cta{ padding:68px 0; }
          .cta-actions{ flex-direction:row; flex-wrap:wrap; }
          .cta-btn{ width:auto; }
        }
        @media (min-width:960px){
          .cta{ padding:80px 0; }
          .cta-inner{ flex-direction:row; align-items:center; justify-content:space-between; gap:32px; }
        }
      `}</style>
    </section>
  )
}