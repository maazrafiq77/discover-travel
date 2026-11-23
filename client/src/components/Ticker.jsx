const items = [
  'Kumrat Valley', 'Swat', 'Naran Kaghan', 'Gilgit Baltistan',
  'Kashmir', 'Chitral', 'Dubai', 'Turkey', 'Malaysia',
  'Europe', 'Umrah & Hajj', 'Visa Consultancy', 'Baku', 'Thailand',
]

export default function Ticker() {
  return (
    <div className="ticker">
      <span className="ticker-label">We cover</span>
      <div className="ticker-viewport">
        <div className="ticker-track">
          {[...items, ...items].map((item, i) => (
            <span key={i} className="ticker-item">
              <i className="ticker-dot" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .ticker{
          display:flex; align-items:center; gap:16px;
          background:var(--brand); padding:11px 0;
          overflow:hidden;
        }
        .ticker-label{
          flex-shrink:0;
          padding:0 16px;
          border-right:1px solid rgba(255,255,255,.28);
          font-size:10px; font-weight:800; letter-spacing:2px;
          color:#fff; text-transform:uppercase; white-space:nowrap;
        }
        .ticker-viewport{ overflow:hidden; flex:1; }
        .ticker-track{
          display:flex; gap:36px;
          width:max-content;
          animation:ticker-scroll 32s linear infinite;
        }
        .ticker:hover .ticker-track{ animation-play-state:paused; }
        .ticker-item{
          display:flex; align-items:center; gap:8px;
          font-size:12px; color:rgba(255,255,255,.9);
          white-space:nowrap;
        }
        .ticker-dot{
          display:inline-block;
          width:4px; height:4px; border-radius:50%;
          background:rgba(255,255,255,.55);
        }
        @keyframes ticker-scroll{
          0%{ transform:translateX(0); }
          100%{ transform:translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce){
          .ticker-track{ animation:none; }
        }
        @media (min-width:768px){
          .ticker{ gap:24px; }
          .ticker-label{ padding:0 24px; font-size:11px; }
          .ticker-item{ font-size:12.5px; gap:8px; }
        }
      `}</style>
    </div>
  )
}