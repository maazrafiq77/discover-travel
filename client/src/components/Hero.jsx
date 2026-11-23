import { useState, useEffect } from 'react'

const slides = [
  { img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80&auto=format&fit=crop', label: 'Northern Pakistan' },
  { img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1800&q=80&auto=format&fit=crop', label: 'Hajj & Umrah' },
  { img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80&auto=format&fit=crop', label: 'Dubai, UAE' },
  { img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1800&q=80&auto=format&fit=crop', label: 'Gilgit Baltistan' },
]

const WaIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

const inputStyle = {
  width: '100%',
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  color: 'var(--text)',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border .2s, box-shadow .2s',
  appearance: 'none',
  WebkitAppearance: 'none',
  minHeight: 46,
}
const labelStyle = {
  fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
  color: 'var(--muted)', textTransform: 'uppercase',
  display: 'block', marginBottom: 6,
}

export default function Hero() {
  const [cur, setCur] = useState(0)
  const [tab, setTab] = useState('tour')
  const [tripType, setTripType] = useState('one-way')
  const [tourForm, setTourForm] = useState({ destination: '', type: 'Tour Package', travellers: '1 Person', date: '' })
  const [flightForm, setFlightForm] = useState({ from: '', to: '', date: '', travellers: '1 Adult', cls: 'Economy' })
  const [hotelForm, setHotelForm] = useState({ city: '', checkin: '', checkout: '', rooms: '1 Room' })

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [])

  const handleWA = () => {
    let msg = ''
    if (tab === 'tour') {
      msg = `Assalam o Alaikum!\nEnquiry: Tour Package\nDestination: ${tourForm.destination}\nType: ${tourForm.type}\nTravellers: ${tourForm.travellers}\nDate: ${tourForm.date}\nPlease share package details.`
    } else if (tab === 'flight') {
      msg = `Assalam o Alaikum!\nEnquiry: Flight Ticket\nFrom: ${flightForm.from}\nTo: ${flightForm.to}\nTrip: ${tripType}\nDate: ${flightForm.date}\nTravellers: ${flightForm.travellers}\nClass: ${flightForm.cls}\nPlease share fares.`
    } else {
      msg = `Assalam o Alaikum!\nEnquiry: Hotel Booking\nCity: ${hotelForm.city}\nCheck-in: ${hotelForm.checkin}\nCheck-out: ${hotelForm.checkout}\nRooms: ${hotelForm.rooms}\nPlease share options.`
    }
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const TabBtn = ({ id, label }) => (
    <button
      onClick={() => setTab(id)}
      className={`hero-tab${tab === id ? ' is-active' : ''}`}
      type="button"
    >
      {label}
    </button>
  )

  const TripBtn = ({ id, label }) => (
    <button
      onClick={() => setTripType(id)}
      type="button"
      className={`trip-btn${tripType === id ? ' is-active' : ''}`}
    >
      {label}
    </button>
  )

  return (
    <section className="hero">
      {/* Background slides */}
      <div className="hero-bg">
        {slides.map((s, i) => (
          <div key={i} className={`hero-slide${i === cur ? ' is-active' : ''}`}>
            <img src={s.img} alt={s.label} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Content — distinct layouts via CSS */}
      <div className="hero-inner container">
        {/* Mobile title block */}
        <div className="hero-copy">
          <span className="eyebrow" style={{ color: '#fff' }}>
            <span style={{ background: '#fff' }} /> Peshawar, Pakistan
          </span>
          <h1 className="hero-title">
            From Peshawar<br />to the <em>World.</em>
          </h1>
          <p className="hero-desc">
            Hajj & Umrah, the mountains of northern Pakistan, and international destinations — planned by people who know travel.
          </p>
          <p className="hero-urdu" lang="ur" dir="rtl">
            پشاور سے دنیا تک — ہم آپ کے سفر کے ماہر ساتھی ہیں
          </p>
          <div className="hero-dots" role="tablist" aria-label="Slides">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                className={`hero-dot${i === cur ? ' is-active' : ''}`}
                aria-label={`Slide: ${s.label}`}
                aria-selected={i === cur}
                role="tab"
              />
            ))}
            <span className="hero-dot-label">{slides[cur].label}</span>
          </div>
        </div>

        {/* Booking card */}
        <div className="hero-card">
          <div className="hero-tabs" role="tablist">
            <TabBtn id="tour" label="🏔 Tours" />
            <TabBtn id="flight" label="✈️ Flights" />
            <TabBtn id="hotel" label="🏨 Hotels" />
          </div>

          {tab === 'tour' && (
            <div className="hero-form">
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Destination</label>
                <select
                  style={inputStyle}
                  value={tourForm.destination}
                  onChange={e => setTourForm({ ...tourForm, destination: e.target.value })}
                >
                  <option value="">Select destination</option>
                  <optgroup label="Northern Pakistan">
                    {['Kumrat Valley', 'Swat Valley', 'Naran Kaghan', 'Kashmir', 'Gilgit Baltistan', 'Chitral'].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </optgroup>
                  <optgroup label="International">
                    {['Dubai', 'Turkey', 'Malaysia', 'Baku', 'Europe', 'Thailand'].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Sacred Journeys">
                    <option>Umrah Package</option>
                    <option>Hajj Package</option>
                  </optgroup>
                </select>
              </div>
              <div className="grid-2">
                <div>
                  <label style={labelStyle}>Travel Type</label>
                  <select style={inputStyle} value={tourForm.type} onChange={e => setTourForm({ ...tourForm, type: e.target.value })}>
                    {['Tour Package', 'Hajj', 'Umrah', 'Visa Only'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Travellers</label>
                  <select style={inputStyle} value={tourForm.travellers} onChange={e => setTourForm({ ...tourForm, travellers: e.target.value })}>
                    {['1 Person', '2 People', '3–4 People', '5+ People'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Travel Date</label>
                <input type="date" style={inputStyle} value={tourForm.date} onChange={e => setTourForm({ ...tourForm, date: e.target.value })} />
              </div>
            </div>
          )}

          {tab === 'flight' && (
            <div className="hero-form">
              <div className="trip-row">
                <TripBtn id="one-way" label="One Way" />
                <TripBtn id="return" label="Return" />
                <TripBtn id="multi" label="Multi-City" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>From</label>
                <input type="text" placeholder="City or airport" style={inputStyle} value={flightForm.from} onChange={e => setFlightForm({ ...flightForm, from: e.target.value })} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>To</label>
                <input type="text" placeholder="City or airport" style={inputStyle} value={flightForm.to} onChange={e => setFlightForm({ ...flightForm, to: e.target.value })} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Departing</label>
                <input type="date" style={inputStyle} value={flightForm.date} onChange={e => setFlightForm({ ...flightForm, date: e.target.value })} />
              </div>
              <div className="grid-2">
                <div>
                  <label style={labelStyle}>Travellers</label>
                  <select style={inputStyle} value={flightForm.travellers} onChange={e => setFlightForm({ ...flightForm, travellers: e.target.value })}>
                    {['1 Adult', '2 Adults', '3 Adults', '4+ Adults'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Class</label>
                  <select style={inputStyle} value={flightForm.cls} onChange={e => setFlightForm({ ...flightForm, cls: e.target.value })}>
                    {['Economy', 'Business', 'First Class'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {tab === 'hotel' && (
            <div className="hero-form">
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>City / Destination</label>
                <input type="text" placeholder="e.g. Dubai, Istanbul, Makkah" style={inputStyle} value={hotelForm.city} onChange={e => setHotelForm({ ...hotelForm, city: e.target.value })} />
              </div>
              <div className="grid-2">
                <div>
                  <label style={labelStyle}>Check-in</label>
                  <input type="date" style={inputStyle} value={hotelForm.checkin} onChange={e => setHotelForm({ ...hotelForm, checkin: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Check-out</label>
                  <input type="date" style={inputStyle} value={hotelForm.checkout} onChange={e => setHotelForm({ ...hotelForm, checkout: e.target.value })} />
                </div>
              </div>
              <div style={{ marginTop: 14 }}>
                <label style={labelStyle}>Rooms</label>
                <select style={inputStyle} value={hotelForm.rooms} onChange={e => setHotelForm({ ...hotelForm, rooms: e.target.value })}>
                  {['1 Room', '2 Rooms', '3 Rooms', '4+ Rooms'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}

          <button onClick={handleWA} className="btn btn-primary btn-block" style={{ marginTop: 8 }}>
            <WaIcon />
            {tab === 'flight' ? 'Get Fares on WhatsApp' : tab === 'hotel' ? 'Get Hotel Options on WhatsApp' : 'Get Package on WhatsApp'}
          </button>
          <p className="hero-card-hint">Your trip details fill the chat automatically.</p>
        </div>
      </div>

      <style>{`
        .hero{
          position:relative;
          min-height:calc(100svh - var(--nav-h-mobile) - var(--bottom-nav-h));
          display:flex;
          align-items:center;
          overflow:hidden;
          isolation:isolate;
        }
        .hero-bg{ position:absolute; inset:0; z-index:0; }
        .hero-slide{ position:absolute; inset:0; opacity:0; transition:opacity 1.1s var(--ease); }
        .hero-slide.is-active{ opacity:1; }
        .hero-slide img{ width:100%; height:100%; object-fit:cover; }
        .hero-overlay{
          position:absolute; inset:0;
          background:
            linear-gradient(to top, rgba(10,11,9,1) 0%, rgba(10,11,9,.55) 55%, rgba(10,11,9,.25) 100%),
            linear-gradient(to right, rgba(10,11,9,.7) 0%, rgba(10,11,9,.1) 60%);
        }
        .hero-inner{
          position:relative; z-index:2;
          padding-top:36px;
          padding-bottom:44px;
          display:grid;
          grid-template-columns:1fr;
          gap:26px;
          align-items:start;
        }
        .hero-copy{ min-width:0; }
        .hero-title{
          font-family:var(--font-serif);
          font-size:clamp(34px, 9vw, 54px);
          font-weight:600;
          line-height:1.06;
          letter-spacing:-1px;
          color:#fff;
          margin:0 0 12px;
        }
        .hero-title em{ font-style:italic; color:var(--brand); }
        .hero-desc{ font-size:14px; line-height:1.65; color:rgba(255,255,255,.7); max-width:440px; margin:0 0 10px; }
        .hero-urdu{
          font-family:var(--font-urdu);
          font-size:16px;
          color:rgba(232,98,42,.85);
          margin:0 0 22px;
        }
        .hero-dots{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
        .hero-dot{
          height:3px; width:20px; border:0; border-radius:2px; padding:0;
          background:rgba(255,255,255,.25); cursor:pointer;
          transition:width .3s var(--ease), background .3s var(--ease);
        }
        .hero-dot.is-active{ width:44px; background:var(--brand); }
        .hero-dot-label{ font-size:11px; color:rgba(255,255,255,.55); margin-left:8px; }

        .hero-card{
          background:var(--card-bg);
          border:1px solid var(--border);
          border-radius:18px;
          padding:18px;
          box-shadow:var(--shadow-lg);
          width:100%;
          max-width:560px;
          margin:0 auto;
        }
        .hero-tabs{
          display:flex; gap:4px;
          background:var(--bg3);
          border-radius:10px; padding:4px;
          margin-bottom:16px;
        }
        .hero-tab{
          flex:1; min-height:44px;
          border:0; border-radius:8px;
          background:transparent; color:var(--muted);
          font-size:12px; font-weight:700;
          cursor:pointer;
          transition:background .2s, color .2s;
        }
        .hero-tab.is-active{ background:var(--brand); color:#fff; }
        .grid-2{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; }
        .trip-row{ display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap; }
        .trip-btn{
          min-height:36px;
          padding:8px 14px;
          border-radius:9px;
          background:transparent;
          border:1px solid var(--border);
          color:var(--muted);
          font-size:11.5px; font-weight:700;
          cursor:pointer;
          transition:all .2s;
        }
        .trip-btn.is-active{ background:var(--text); color:var(--bg); border-color:var(--text); }
        .hero-form{ margin-bottom:6px; }
        .hero-card-hint{ text-align:center; font-size:11px; color:var(--muted); margin:10px 0 0; }

        /* Desktop layout — distinct: 2-column, wider card, larger type */
        @media (min-width:960px){
          .hero{ min-height:calc(100svh - 72px); }
          .hero-inner{
            grid-template-columns:minmax(0,1fr) 420px;
            gap:64px;
            align-items:center;
            padding-top:40px;
            padding-bottom:56px;
          }
          .hero-title{ font-size:clamp(48px, 5.2vw, 74px); margin-bottom:20px; }
          .hero-desc{ font-size:15px; line-height:1.75; margin-bottom:14px; }
          .hero-urdu{ font-size:18px; margin-bottom:32px; }
          .hero-card{ padding:24px; }
          .hero-tab{ font-size:13px; }
        }
        @media (min-width:1200px){
          .hero-inner{ gap:80px; }
        }
      `}</style>
    </section>
  )
}