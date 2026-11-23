import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Services',
    links: [
      { l: 'Hajj & Umrah', p: '/hajj-umrah' },
      { l: 'Domestic Tours', p: '/domestic' },
      { l: 'International Tours', p: '/international' },
      { l: 'Visa Consultancy', p: '/visa' },
      { l: 'About Us', p: '/about' },
      { l: 'Contact', p: '/contact' },
    ],
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
    ],
  },
]

const contact = [
  { icon: '📍', text: 'Deans Trade Center, Saddar Cantt, Peshawar' },
  { icon: '📞', text: '+92 343 934 3482', href: 'tel:+923439343482' },
  { icon: '💬', text: 'WhatsApp Us', href: 'https://wa.me/923439343482' },
  { icon: '✉️', text: 'discovertravel93@gmail.com', href: 'mailto:discovertravel93@gmail.com' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="foot-brand-row">
              <span className="foot-logo">
                <img src="/logo.webp" alt="Discover Travel" />
              </span>
              <span className="foot-brand-text">
                Discover <span>Travel</span> &amp; Tours
              </span>
            </div>
            <p className="foot-brand-desc">
              Your trusted travel partner for Hajj, Umrah, domestic and international tours from Peshawar, Pakistan.
            </p>
            <p className="foot-urdu" lang="ur" dir="rtl">
              پشاور سے دنیا تک — آپ کا بھروسہ مند سفری ساتھی
            </p>
          </div>

          {cols.map(col => (
            <div key={col.title} className="foot-col">
              <h4 className="foot-title">{col.title}</h4>
              <ul>
                {col.links.map(item => (
                  <li key={item.l}>
                    <Link to={item.p} className="foot-link">{item.l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="foot-col">
            <h4 className="foot-title">Contact</h4>
            <ul>
              {contact.map(c => (
                <li key={c.text} className="foot-contact">
                  <span aria-hidden="true">{c.icon}</span>
                  {c.href
                    ? <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="foot-link">{c.text}</a>
                    : <span className="foot-contact-text">{c.text}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} Discover Travel &amp; Tours. All rights reserved.</span>
          <span>Peshawar, Pakistan</span>
        </div>
      </div>

      <style>{`
        .site-footer{
          background:var(--footer-bg);
          color:rgba(255,255,255,.82);
          padding:48px 0 100px;
        }
        .foot-grid{ display:grid; grid-template-columns:1fr; gap:32px; padding-bottom:28px; }
        .foot-brand-row{ display:flex; align-items:center; gap:10px; margin-bottom:14px; }
        .foot-logo{
          width:46px; height:46px; flex:0 0 46px;
          border-radius:50%; background:#fff; border:2px solid var(--brand);
          padding:3px; overflow:hidden;
          display:flex; align-items:center; justify-content:center;
        }
        .foot-logo img{ width:100%; height:100%; object-fit:contain; border-radius:50%; }
        .foot-brand-text{ font-weight:800; font-size:14px; color:#fff; }
        .foot-brand-text span{ color:var(--brand); }
        .foot-brand-desc{ font-size:12.5px; line-height:1.75; color:rgba(255,255,255,.68); margin:0 0 10px; max-width:300px; }
        .foot-urdu{ font-family:var(--font-urdu); font-size:12px; color:rgba(255,255,255,.55); margin:0; }
        .foot-title{
          font-size:10px; font-weight:800; letter-spacing:2px;
          text-transform:uppercase; color:var(--brand);
          margin:0 0 14px;
        }
        .foot-col ul{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; }
        .foot-link{
          font-size:12.5px; color:rgba(255,255,255,.72);
          text-decoration:none; transition:color .2s;
        }
        .foot-link:hover{ color:var(--brand); }
        .foot-contact{
          display:flex; gap:10px; align-items:flex-start;
          font-size:12.5px; line-height:1.5;
        }
        .foot-contact > span:first-child{ font-size:14px; line-height:1.2; margin-top:1px; }
        .foot-contact-text{ color:rgba(255,255,255,.72); }
        .foot-bottom{
          display:flex; flex-direction:column; gap:6px;
          padding-top:20px; margin-top:20px;
          border-top:1px solid rgba(255,255,255,.12);
          font-size:11.5px; color:rgba(255,255,255,.55);
        }

        @media (min-width:640px){
          .foot-grid{ grid-template-columns:repeat(2, 1fr); gap:32px; }
          .foot-brand{ grid-column:1 / -1; }
          .site-footer{ padding:56px 0 32px; }
        }
        @media (min-width:960px){
          .foot-grid{ grid-template-columns:1.6fr 1fr 1fr 1.2fr; gap:40px; padding-bottom:40px; }
          .foot-brand{ grid-column:auto; }
          .site-footer{ padding:72px 0 24px; }
          .foot-bottom{ flex-direction:row; justify-content:space-between; align-items:center; }
        }
      `}</style>
    </footer>
  )
}