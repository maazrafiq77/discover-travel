const items = [
  'Kumrat Valley', 'Swat', 'Naran Kaghan', 'Gilgit Baltistan',
  'Kashmir', 'Chitral', 'Dubai', 'Turkey', 'Malaysia',
  'Europe', 'Umrah & Hajj', 'Visa Consultancy', 'Baku', 'Thailand',
]

export default function Ticker() {
  return (
    <div style={{
      background: '#E8622A',
      padding: '11px 0',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      gap: 24,
    }}>
      <div style={{
        flexShrink: 0,
        fontSize: 10, fontWeight: 800,
        letterSpacing: 2, color: '#fff',
        textTransform: 'uppercase',
        padding: '0 24px',
        whiteSpace: 'nowrap',
        borderRight: '1px solid rgba(255,255,255,0.3)',
        paddingRight: 24,
      }}>
        We cover
      </div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{
          display: 'flex',
          gap: 48,
          animation: 'ticker 25s linear infinite',
          width: 'max-content',
        }}>
          {[...items, ...items].map((item, i) => (
            <span key={i} style={{
              fontSize: 12, color: 'rgba(255,255,255,0.85)',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 4, height: 4, background: 'rgba(255,255,255,0.5)', borderRadius: '50%', display: 'inline-block' }} />
              {item}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

