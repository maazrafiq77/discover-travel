import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--footer-bg)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 0' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr',
          gap: 48, paddingBottom: 48,
          borderBottom: '1px solid rgb(255, 255, 255)',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
               <div
                style={{
                  width: 49,
                  height: 49,
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid rgba(232, 98, 42, 0.85)',
                  padding: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  boxShadow: '0 0 12px rgba(232, 98, 42, 0.18)',
                }}
              >
                <img
                  src="/logo.webp"
                  alt="Discover Travel"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '50%',
                  }}
                />
              </div>
              <span style={{ fontWeight: 800, fontSize: 14, color: '#fff' }}>Discover <span style={{ color: '#E8622A' }}>Travel</span> & Tours</span>
            </div>
            <p style={{ fontSize: 12, color: 'rgb(255, 255, 255)', lineHeight: 1.75, maxWidth: 240, marginBottom: 10 }}>
              Your trusted travel partner for Hajj, Umrah, domestic and international tours from Peshawar, Pakistan.
            </p>
            <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', fontSize: 12, color: 'rgb(255, 255, 255)' }}>
              پشاور سے دنیا تک — آپ کا بھروسہ مند سفری ساتھی
            </p>
          </div>

          {[
            {
              title: 'Services',
              links: [
                { l: 'Hajj & Umrah', p: '/hajj-umrah' },
                { l: 'Domestic Tours', p: '/domestic' },
                { l: 'International Tours', p: '/international' },
                { l: 'Visa Consultancy', p: '/visa' },
                { l: 'About Us', p: '/about' },
                { l: 'Contact', p: '/contact' },
              ]
            },
            {
              title: 'Popular Tours',
              links: [
                { l: 'Kumrat Valley', p: '/domestic' },
                { l: 'Swat Valley', p: '/domestic' },
                { l: 'Naran Kaghan', p: '/domestic' },
                { l: 'Dubai Package', p: '/international' },
                { l: 'Turkey Package', p: '/international' },
                { l: 'Umrah Package', p: '/hajj-umrah' },
              ]
            },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#E8622A', textTransform: 'uppercase', marginBottom: 18 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {col.links.map(item => (
                  <li key={item.l} style={{ marginBottom: 10 }}>
                    <Link to={item.p} style={{ fontSize: 12, color: 'rgb(255, 255, 255)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = '#E8622A'}
                      onMouseLeave={e => e.target.style.color = 'rgb(255, 255, 255)'}
                    >{item.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: '#E8622A', textTransform: 'uppercase', marginBottom: 18 }}>Contact</div>
            {[
              { icon: '📍', text: 'Deans Trade Center, Saddar Cantt, Peshawar' },
              { icon: '📞', text: '+92 343 934 3482', href: 'tel:+923439343482' },
              { icon: '💬', text: 'WhatsApp Us', href: 'https://wa.me/923439343482' },
              { icon: '✉️', text: 'discovertravel93@gmail.com', href: 'mailto:discovertravel93@gmail.com' },
            ].map(c => (
              <div key={c.text} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 14, marginTop: 1 }}>{c.icon}</span>
                {c.href
                  ? <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                    style={{ fontSize: 12, color: 'rgb(255, 255, 255)', textDecoration: 'none', lineHeight: 1.5, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = '#E8622A'}
                    onMouseLeave={e => e.target.style.color = 'rgb(255, 255, 255)'}
                  >{c.text}</a>
                  : <p style={{ fontSize: 12, color: 'rgb(255, 255, 255)', lineHeight: 1.5, margin: 0 }}>{c.text}</p>
                }
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 11, color: 'rgb(255, 255, 255)' }}>© {new Date().getFullYear()} Discover Travel & Tours. All rights reserved.</span>
          <span style={{ fontSize: 11, color: 'rgb(255, 255, 255)' }}>Peshawar, Pakistan</span>
        </div>
      </div>
    </footer>
  )
}

