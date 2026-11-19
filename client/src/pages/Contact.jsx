import API_URL from '../config/api'
import { useState } from 'react'
import axios from 'axios'

const WaIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

const inp = {
  width: '100%',
  background: 'var(--bg)',
  border: '1.5px solid var(--border)',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 13,
  color: 'var(--text)',
  fontFamily: 'Montserrat,sans-serif',
  outline: 'none',
  transition: 'border 0.2s',
  appearance: 'none',
}

const lbl = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: 1.5,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: 6,
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    try { await axios.post(`${API_URL}/api/enquiries`, form) } catch {}
    const msg = `Assalam o Alaikum!\nName: ${form.name}\nPhone: ${form.phone}\nSubject: ${form.subject}\nMessage: ${form.message}`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
    setSent(true)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: 68 }}>
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,8,1) 0%, rgba(10,10,8,0.5) 50%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1200, margin: '0 auto', padding: '0 24px 40px', width: '100%' }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>Get in touch</span>
          <h1 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, color: '#fff' }}>Contact Us</h1>
          <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'rgba(232,98,42,0.8)', fontSize: 20, marginTop: 8 }}>ہم سے رابطہ کریں</p>
        </div>
      </div>

      <section style={{ padding: '72px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>

            {/* Form */}
            <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, padding: 36 }}>
              <h2 style={{ fontFamily: 'Lora,serif', fontSize: 24, fontWeight: 600, color: 'var(--text)', marginBottom: 24 }}>Send a Message</h2>
              {sent && (
                <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 13, color: '#10b981', fontWeight: 600 }}>
                  ✅ Message sent! We'll reply on WhatsApp shortly.
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={lbl}>Your Name</label>
                  <input type="text" placeholder="Ahmed Khan" style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Phone Number</label>
                  <input type="tel" placeholder="+92 311 0000000" style={inp} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>Email (Optional)</label>
                <input type="email" placeholder="your@email.com" style={inp} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>Subject</label>
                <select style={inp} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                  <option value="">Select subject</option>
                  {['Hajj & Umrah Enquiry', 'Domestic Tour', 'International Tour', 'Visa Enquiry', 'Flight Ticket', 'Other'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={lbl}>Message</label>
                <textarea
                  rows={4} placeholder="Tell us about your travel plans..."
                  style={{ ...inp, resize: 'none' }}
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button
                onClick={handleSubmit}
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
                <WaIcon /> Send via WhatsApp
              </button>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 24, fontSize: 16 }}>Contact Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { icon: '📍', label: 'Office', value: 'Deans Trade Center, Saddar Cantt, Peshawar', ur: 'ڈینز ٹریڈ سینٹر، صدر کینٹ، پشاور' },
                    { icon: '📞', label: 'Phone', value: '+92 343 934 3482', href: 'tel:+923439343482' },
                    { icon: '💬', label: 'WhatsApp', value: '+92 343 934 3482', href: 'https://wa.me/923439343482' },
                    { icon: '✉️', label: 'Email', value: 'discovertravel93@gmail.com', href: 'mailto:discovertravel93@gmail.com' },
                  ].map(c => (
                    <div key={c.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, background: 'rgba(232,98,42,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                        {c.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>{c.label}</p>
                        {c.href
                          ? <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{ fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 500 }}>{c.value}</a>
                          : <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, margin: 0 }}>{c.value}</p>
                        }
                        {c.ur && <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{c.ur}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#E8622A', borderRadius: 20, padding: 28 }}>
                <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: 20, fontSize: 16 }}>Office Hours</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { day: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' },
                    { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
                    { day: 'WhatsApp', time: '24/7 Available' },
                  ].map(h => (
                    <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{h.day}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


