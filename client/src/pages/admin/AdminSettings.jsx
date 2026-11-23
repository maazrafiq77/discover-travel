import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const inp = {
  width: '100%', background: 'var(--admin-inp)',
  border: '1.5px solid var(--admin-border)', borderRadius: 10,
  padding: '11px 14px', fontSize: 14,
  color: 'var(--admin-inp-text)', fontFamily: 'var(--font-sans)',
  outline: 'none', minHeight: 44,
}
const lbl = {
  fontSize: 10, fontWeight: 700, letterSpacing: 1.5,
  color: 'var(--admin-muted)', textTransform: 'uppercase',
  display: 'block', marginBottom: 6,
}

const DEFAULTS = {
  phone: '', whatsapp: '', email: '', address: '', addressUr: '',
  aboutText: '', aboutTextUr: '',
  yearsExperience: '', happyCustomers: '', destinations: '', toursCompleted: '',
}

function Section({ title, children }) {
  return (
    <section className="set-card">
      <h2 className="set-card-title">{title}</h2>
      {children}
    </section>
  )
}

export default function AdminSettings() {
  const [settings, setSettings] = useState(DEFAULTS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState(false)

  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get(`${API_URL}/api/settings`)
      .then(r => setSettings(prev => ({ ...prev, ...(r.data || {}) })))
      .catch(() => setError('Could not load settings.'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    if (saving) return
    setSaving(true)
    setError(null)
    try {
      await Promise.all(
        Object.entries(settings).map(([key, value]) =>
          axios.post(`${API_URL}/api/settings`, { key, value }, { headers })
        )
      )
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      setError('Could not save settings.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="ad-card" style={{ padding: 40, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
        Loading settings…
      </div>
    )
  }

  return (
    <div className="ad-page">
      <header className="ad-head">
        <div>
          <h1 className="ad-title">Site Settings</h1>
          <p className="ad-sub">Manage your website content and information</p>
        </div>
        {saved && (
          <span className="set-saved">✓ Saved</span>
        )}
      </header>

      {error && <div className="ad-banner ad-banner-error" style={{ marginBottom: 14 }}>{error}</div>}

      <Section title="Contact Information">
        <div className="set-grid set-grid-2">
          {[
            { key: 'phone', label: 'Phone Number', placeholder: '+92 311 92 888 21' },
            { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '923439343482' },
            { key: 'email', label: 'Email Address', placeholder: 'discovertravel93@gmail.com' },
          ].map(f => (
            <div key={f.key}>
              <label style={lbl}>{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                style={inp}
                value={settings[f.key]}
                onChange={e => setSettings({ ...settings, [f.key]: e.target.value })}
              />
            </div>
          ))}
          <div className="set-full">
            <label style={lbl}>Office Address (English)</label>
            <input
              type="text"
              placeholder="Deans Trade Center, Saddar Cantt, Peshawar"
              style={inp}
              value={settings.address}
              onChange={e => setSettings({ ...settings, address: e.target.value })}
            />
          </div>
          <div className="set-full">
            <label style={lbl}>Office Address (Urdu)</label>
            <input
              type="text"
              style={{ ...inp, direction: 'rtl', fontFamily: 'var(--font-urdu)' }}
              value={settings.addressUr}
              onChange={e => setSettings({ ...settings, addressUr: e.target.value })}
            />
          </div>
        </div>
      </Section>

      <Section title="Trust Bar Stats">
        <div className="set-grid set-grid-4">
          {[
            { key: 'yearsExperience', label: 'Years Experience', placeholder: '15+' },
            { key: 'happyCustomers', label: 'Happy Customers', placeholder: '10,000+' },
            { key: 'destinations', label: 'Destinations', placeholder: '50+' },
            { key: 'toursCompleted', label: 'Tours Completed', placeholder: '500+' },
          ].map(f => (
            <div key={f.key}>
              <label style={lbl}>{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                style={inp}
                value={settings[f.key]}
                onChange={e => setSettings({ ...settings, [f.key]: e.target.value })}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title="About Us Text">
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>About Text (English)</label>
          <textarea
            rows={4}
            style={{ ...inp, resize: 'vertical', minHeight: 100 }}
            value={settings.aboutText}
            onChange={e => setSettings({ ...settings, aboutText: e.target.value })}
          />
        </div>
        <div>
          <label style={lbl}>About Text (Urdu)</label>
          <textarea
            rows={3}
            style={{ ...inp, resize: 'vertical', direction: 'rtl', fontFamily: 'var(--font-urdu)', minHeight: 90 }}
            value={settings.aboutTextUr}
            onChange={e => setSettings({ ...settings, aboutTextUr: e.target.value })}
          />
        </div>
      </Section>

      <button
        className="ad-btn ad-btn-primary set-save-btn"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? 'Saving…' : 'Save all settings'}
      </button>

      <style>{`
        .ad-page { max-width: 1200px; margin: 0 auto; }
        .ad-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
        .ad-title { font-size: 22px; font-weight: 800; color: var(--admin-text); margin: 0 0 4px; }
        .ad-sub { font-size: 13px; color: var(--admin-muted); margin: 0; }
        .ad-banner { padding: 10px 14px; border-radius: 10px; font-size: 12.5px; font-weight: 600; }
        .ad-banner-error { background: rgba(232,98,42,.1); border: 1px solid rgba(232,98,42,.3); color: var(--brand); }
        .ad-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 44px; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 700; font-family: var(--font-sans); border: 1px solid transparent; cursor: pointer; transition: all .2s; }
        .ad-btn:disabled { opacity: .6; cursor: not-allowed; }
        .ad-btn-primary { background: var(--brand); color: #fff; }
        .ad-btn-primary:hover:not(:disabled) { background: var(--brand-2); }

        .set-saved {
          background: rgba(16,185,129,.15);
          border: 1px solid rgba(16,185,129,.3);
          color: #10B981;
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 12.5px; font-weight: 600;
        }

        .set-card {
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          padding: 18px;
          margin-bottom: 14px;
        }
        .set-card-title {
          font-size: 14px; font-weight: 700;
          color: var(--admin-text);
          margin: 0 0 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--admin-border);
        }

        .set-grid { display: grid; gap: 12px; }
        .set-grid-2 { grid-template-columns: 1fr; }
        .set-grid-4 { grid-template-columns: 1fr; }
        .set-full { grid-column: 1 / -1; }

        .set-save-btn { margin-top: 6px; width: 100%; }

        @media (min-width: 640px) {
          .set-card { padding: 22px; }
          .set-grid-2 { grid-template-columns: 1fr 1fr; gap: 14px; }
          .set-grid-4 { grid-template-columns: 1fr 1fr; gap: 14px; }
          .set-save-btn { width: auto; }
        }
        @media (min-width: 1024px) {
          .set-grid-4 { grid-template-columns: repeat(4, 1fr); }
        }
      `}</style>
    </div>
  )
}