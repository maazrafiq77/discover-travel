import { useState, useEffect } from 'react'

const slides = [
  { img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800', label: 'Northern Pakistan' },
  { img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1800', label: 'Hajj & Umrah' },
  { img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800', label: 'Dubai, UAE' },
  { img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1800', label: 'Gilgit Baltistan' },
]

const WaIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

const inputStyle = {
  width: '100%',
  background: '#fff',
  border: '1.5px solid #e8eaed',
  borderRadius: 8,
  padding: '11px 14px',
  fontSize: 13,
  color: '#1a1a2e',
  fontFamily: 'Montserrat,sans-serif',
  outline: 'none',
  transition: 'border 0.2s',
  appearance: 'none',
  WebkitAppearance: 'none',
}

const labelStyle = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 1.5,
  color: '#6b7280',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 6,
}

export default function Hero() {
  const [cur, setCur] = useState(0)
  const [tab, setTab] = useState('tour') // tour | flight | hotel
  const [tripType, setTripType] = useState('one-way')

  // Tour form
  const [tourForm, setTourForm] = useState({ destination: '', type: 'Tour Package', travellers: '1 Person', date: '' })
  // Flight form
  const [flightForm, setFlightForm] = useState({ from: '', to: '', date: '', travellers: '1 Adult', cls: 'Economy' })
  // Hotel form
  const [hotelForm, setHotelForm] = useState({ city: '', checkin: '', checkout: '', rooms: '1 Room' })

  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 5000)
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

  const tabBtn = (id, label) => (
    <button
      onClick={() => setTab(id)}
      style={{
        flex: 1, padding: '10px 8px',
        background: tab === id ? '#E8622A' : 'transparent',
        color: tab === id ? '#fff' : '#6b7280',
        border: 'none', borderRadius: 8,
        fontSize: 12, fontWeight: 700,
        cursor: 'pointer', transition: 'all 0.2s',
        fontFamily: 'Montserrat,sans-serif',
      }}
    >
      {label}
    </button>
  )

  const tripBtn = (id, label) => (
    <button
      onClick={() => setTripType(id)}
      style={{
        padding: '7px 14px',
        background: tripType === id ? '#1a1a2e' : 'transparent',
        color: tripType === id ? '#fff' : '#6b7280',
        border: `1.5px solid ${tripType === id ? '#1a1a2e' : '#e8eaed'}`,
        borderRadius: 8,
        fontSize: 11, fontWeight: 700,
        cursor: 'pointer', transition: 'all 0.2s',
        fontFamily: 'Montserrat,sans-serif',
      }}
    >
      {label}
    </button>
  )

  return (
    <section style={{
      position: 'relative', width: '100%',
      height: '100vh', minHeight: 600,
      overflow: 'hidden', display: 'flex', alignItems: 'center',
    }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          transition: 'opacity 1.2s ease',
          opacity: i === cur ? 1 : 0,
        }}>
          <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,1) 0%, rgba(10,10,8,0.55) 50%, rgba(10,10,8,0.2) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,8,0.65) 0%, transparent 55%)' }} />
        </div>
      ))}

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 1200,
        margin: '0 auto', padding: '0 24px',
        paddingTop: 68,
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: 56,
        alignItems: 'center',
      }} className="hero-grid">

        {/* Left */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#E8622A', fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, background: '#E8622A', borderRadius: '50%', display: 'inline-block' }} />
            Peshawar, Pakistan
          </div>
          <h1 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(44px,5.5vw,70px)', fontWeight: 600, lineHeight: 1.08, color: '#fff', marginBottom: 18, letterSpacing: -1 }}>
            From Peshawar<br />
            to the <em style={{ fontStyle: 'italic', color: '#E8622A' }}>World.</em>
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: 420, marginBottom: 12 }}>
            Hajj & Umrah, the mountains of northern Pakistan, and international destinations — planned by people who know travel.
          </p>
          <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', fontSize: 18, color: 'rgba(232,98,42,0.75)', marginBottom: 32, display: 'block' }}>
            پشاور سے دنیا تک — ہم آپ کے سفر کے ماہر ساتھی ہیں
          </p>
          {/* Dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {slides.map((s, i) => (
              <button key={i} onClick={() => setCur(i)} style={{
                height: 3, borderRadius: 2, border: 'none', cursor: 'pointer', padding: 0,
                width: i === cur ? 44 : 20,
                background: i === cur ? '#E8622A' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s',
              }} />
            ))}
            <span style={{ marginLeft: 8, color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>{slides[cur].label}</span>
          </div>
        </div>

        {/* Form card */}
        <div style={{
          background: '#fff',
          borderRadius: 20,
          padding: 24,
          boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex', gap: 4,
            background: '#f3f4f6', borderRadius: 10, padding: 4, marginBottom: 20,
          }}>
            {tabBtn('tour', '🏔 Tours')}
            {tabBtn('flight', '✈️ Flights')}
            {tabBtn('hotel', '🏨 Hotels')}
          </div>

          {/* TOUR FORM */}
          {tab === 'tour' && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Destination</label>
                <select style={inputStyle} value={tourForm.destination} onChange={e => setTourForm({ ...tourForm, destination: e.target.value })}>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
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
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Travel Date</label>
                <input type="date" style={inputStyle} value={tourForm.date} onChange={e => setTourForm({ ...tourForm, date: e.target.value })} />
              </div>
            </div>
          )}

          {/* FLIGHT FORM */}
          {tab === 'flight' && (
            <div>
              {/* Trip type */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {tripBtn('one-way', 'One Way')}
                {tripBtn('return', 'Return')}
                {tripBtn('multi', 'Multi-City')}
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
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

          {/* HOTEL FORM */}
          {tab === 'hotel' && (
            <div>
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>City / Destination</label>
                <input type="text" placeholder="e.g. Dubai, Istanbul, Makkah" style={inputStyle} value={hotelForm.city} onChange={e => setHotelForm({ ...hotelForm, city: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
                <div>
                  <label style={labelStyle}>Check-in</label>
                  <input type="date" style={inputStyle} value={hotelForm.checkin} onChange={e => setHotelForm({ ...hotelForm, checkin: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Check-out</label>
                  <input type="date" style={inputStyle} value={hotelForm.checkout} onChange={e => setHotelForm({ ...hotelForm, checkout: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>Rooms</label>
                <select style={inputStyle} value={hotelForm.rooms} onChange={e => setHotelForm({ ...hotelForm, rooms: e.target.value })}>
                  {['1 Room', '2 Rooms', '3 Rooms', '4+ Rooms'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleWA}
            style={{
              width: '100%', background: '#E8622A', color: '#fff',
              border: 'none', borderRadius: 10, padding: '14px',
              fontSize: 13, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#d4571f'}
            onMouseLeave={e => e.currentTarget.style.background = '#E8622A'}
          >
            <WaIcon />
            {tab === 'flight' ? 'Get Fares on WhatsApp' : tab === 'hotel' ? 'Get Hotel Options on WhatsApp' : 'Get Package on WhatsApp'}
          </button>
          <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginTop: 10 }}>
            Your trip details are filled into the chat automatically.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}

