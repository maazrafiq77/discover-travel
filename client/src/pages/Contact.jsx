import API_URL from '../config/api'
import { useState } from 'react'
import axios from 'axios'

const WaIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

const inp = {
  width: '100%',
  background: 'var(--bg)',
  border: '1.5px solid var(--border)',
  borderRadius: 10,
  padding: '12px 14px',
  fontSize: 14,
  color: 'var(--text)',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
  transition: 'border-color .2s',
  appearance: 'none',
  minHeight: 46,
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
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (loading) return
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      alert('Please fill in name, phone and message.')
      return
    }
    setLoading(true)
    try {
      await axios.post(`${API_URL}/api/enquiries`, form)
    } catch {
      /* fall through to WhatsApp regardless */
    }
    const msg = `Assalam o Alaikum!\nName: ${form.name}\nPhone: ${form.phone}\nSubject: ${form.subject}\nMessage: ${form.message}`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      <header className="page-hero">
        <div
          className="page-hero-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80&auto=format&fit=crop')",
          }}
        />
        <div className="page-hero-shade" />
        <div className="page-hero-inner">
          <span className="eyebrow" style={{ color: '#fff' }}>
            <span style={{ background: '#fff' }} /> Get in touch
          </span>
          <h1 className="page-hero-title">Contact Us</h1>
          <p className="page-hero-urdu" lang="ur" dir="rtl">ہم سے رابطہ کریں</p>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-card reveal">
              <h2 className="contact-form-title">Send a message</h2>
              {sent && (
                <div className="contact-success">
                  ✅ Message sent! We'll reply on WhatsApp shortly.
                </div>
              )}
              <div className="grid-2">
                <div>
                  <label style={lbl}>Your Name</label>
                  <input
                    type="text"
                    placeholder="Ahmed Khan"
                    style={inp}
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={lbl}>Phone</label>
                  <input
                    type="tel"
                    placeholder="+92 311 0000000"
                    style={inp}
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>Email (optional)</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={inp}
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={lbl}>Subject</label>
                <select
                  style={inp}
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                >
                  <option value="">Select subject</option>
                  {['Hajj & Umrah Enquiry', 'Domestic Tour', 'International Tour', 'Visa Enquiry', 'Flight Ticket', 'Other'].map(s => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={lbl}>Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your travel plans..."
                  style={{ ...inp, resize: 'none', minHeight: 110 }}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                <WaIcon /> {loading ? 'Sending…' : 'Send via WhatsApp'}
              </button>
            </div>

            <div className="contact-info-stack reveal">
              <div className="contact-info-card">
                <h3 className="contact-info-title">Contact information</h3>
                <div className="contact-info-list">
                  {[
                    { icon: '📍', label: 'Office', value: 'Deans Trade Center, Saddar Cantt, Peshawar', ur: 'ڈینز ٹریڈ سینٹر، صدر کینٹ، پشاور' },
                    { icon: '📞', label: 'Phone', value: '+92 343 934 3482', href: 'tel:+923439343482' },
                    { icon: '💬', label: 'WhatsApp', value: '+92 343 934 3482', href: 'https://wa.me/923439343482' },
                    { icon: '✉️', label: 'Email', value: 'discovertravel93@gmail.com', href: 'mailto:discovertravel93@gmail.com' },
                  ].map(c => (
                    <div key={c.label} className="contact-info-row">
                      <div className="contact-info-icon">{c.icon}</div>
                      <div>
                        <p className="contact-info-label">{c.label}</p>
                        {c.href ? (
                          <a
                            href={c.href}
                            target={c.href.startsWith('http') ? '_blank' : undefined}
                            rel="noreferrer"
                            className="contact-info-value link"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <p className="contact-info-value">{c.value}</p>
                        )}
                        {c.ur && (
                          <p className="contact-info-urdu" lang="ur" dir="rtl">{c.ur}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-hours-card">
                <h3 className="contact-hours-title">Office hours</h3>
                <div className="contact-hours-list">
                  {[
                    { day: 'Monday – Saturday', time: '9:00 AM – 7:00 PM' },
                    { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
                    { day: 'WhatsApp', time: '24/7 Available' },
                  ].map(h => (
                    <div key={h.day} className="contact-hours-row">
                      <span>{h.day}</span>
                      <strong>{h.time}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
        .contact-form-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
        }
        .contact-form-title {
          font-family: var(--font-serif); font-size: 22px;
          font-weight: 600; color: var(--text); margin: 0 0 20px;
        }
        .contact-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 18px;
          font-size: 13px; color: #10b981; font-weight: 600;
        }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }

        .contact-info-stack { display: flex; flex-direction: column; gap: 16px; }
        .contact-info-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 22px;
        }
        .contact-info-title { font-size: 16px; font-weight: 700; color: var(--text); margin: 0 0 20px; }
        .contact-info-list { display: flex; flex-direction: column; gap: 18px; }
        .contact-info-row { display: flex; gap: 14px; align-items: flex-start; }
        .contact-info-icon {
          width: 40px; height: 40px; flex-shrink: 0;
          background: var(--brand-soft); border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
        }
        .contact-info-label {
          font-size: 10px; color: var(--muted); font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase; margin: 0 0 3px;
        }
        .contact-info-value { font-size: 13.5px; color: var(--text); font-weight: 500; margin: 0; }
        .contact-info-value.link { text-decoration: none; }
        .contact-info-value.link:hover { color: var(--brand); }
        .contact-info-urdu {
          font-family: var(--font-urdu); font-size: 11.5px;
          color: var(--muted); margin: 2px 0 0;
        }

        .contact-hours-card {
          background: var(--brand); border-radius: 20px; padding: 22px;
        }
        .contact-hours-title { font-size: 16px; font-weight: 700; color: #fff; margin: 0 0 16px; }
        .contact-hours-list { display: flex; flex-direction: column; gap: 12px; }
        .contact-hours-row {
          display: flex; justify-content: space-between; align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 13px;
        }
        .contact-hours-row:last-child { border-bottom: 0; padding-bottom: 0; }
        .contact-hours-row span { color: rgba(255, 255, 255, 0.75); }
        .contact-hours-row strong { color: #fff; }

        @media (min-width: 768px) {
          .contact-form-card { padding: 32px; }
          .contact-info-card { padding: 28px; }
          .contact-hours-card { padding: 28px; }
        }
        @media (min-width: 960px) {
          .contact-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
      `}</style>
    </>
  )
}