import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const inp = { width: '100%', background: 'var(--admin-inp)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: 'var(--admin-inp-text)', fontFamily: 'Montserrat,sans-serif', outline: 'none', appearance: 'none' }
const lbl = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    phone: '', whatsapp: '', email: '', address: '', addressUr: '',
    aboutText: '', aboutTextUr: '',
    yearsExperience: '', happyCustomers: '', destinations: '', toursCompleted: '',
  })
  const [saved, setSaved] = useState(false)
  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get(`${API_URL}/api/settings`).then(r => setSettings(prev => ({ ...prev, ...r.data })))
  }, [])

  const handleSave = async () => {
    await Promise.all(Object.entries(settings).map(([key, value]) =>
      axios.post(`${API_URL}/api/settings`, { key, value }, { headers })
    ))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const Section = ({ title, children }) => (
    <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 28, marginBottom: 16 }}>
      <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--admin-text)', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--admin-border)' }}>{title}</h2>
      {children}
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Site Settings</h1>
          <p style={{ fontSize: 13, color: 'var(--admin-muted)' }}>Manage your website content and information</p>
        </div>
        {saved && <span style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600 }}>✓ Saved successfully!</span>}
      </div>

      <Section title="Contact Information">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { key: 'phone', label: 'Phone Number', placeholder: '+92 311 92 888 21' },
            { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '923439343482' },
            { key: 'email', label: 'Email Address', placeholder: 'discovertravel93@gmail.com' },
          ].map(f => (
            <div key={f.key}>
              <label style={lbl}>{f.label}</label>
              <input type="text" placeholder={f.placeholder} style={inp} value={settings[f.key]} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })} />
            </div>
          ))}
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Office Address (English)</label>
            <input type="text" placeholder="Deans Trade Center, Saddar Cantt, Peshawar" style={inp} value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label style={lbl}>Office Address (Urdu)</label>
            <input type="text" style={{ ...inp, direction: 'rtl', fontFamily: 'Noto Nastaliq Urdu,serif' }} value={settings.addressUr} onChange={e => setSettings({ ...settings, addressUr: e.target.value })} />
          </div>
        </div>
      </Section>

      <Section title="Trust Bar Stats">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {[
            { key: 'yearsExperience', label: 'Years Experience', placeholder: '15+' },
            { key: 'happyCustomers', label: 'Happy Customers', placeholder: '10,000+' },
            { key: 'destinations', label: 'Destinations', placeholder: '50+' },
            { key: 'toursCompleted', label: 'Tours Completed', placeholder: '500+' },
          ].map(f => (
            <div key={f.key}>
              <label style={lbl}>{f.label}</label>
              <input type="text" placeholder={f.placeholder} style={inp} value={settings[f.key]} onChange={e => setSettings({ ...settings, [f.key]: e.target.value })} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="About Us Text">
        <div style={{ marginBottom: 14 }}>
          <label style={lbl}>About Text (English)</label>
          <textarea rows={4} style={{ ...inp, resize: 'none' }} value={settings.aboutText} onChange={e => setSettings({ ...settings, aboutText: e.target.value })} />
        </div>
        <div>
          <label style={lbl}>About Text (Urdu)</label>
          <textarea rows={3} style={{ ...inp, resize: 'none', direction: 'rtl', fontFamily: 'Noto Nastaliq Urdu,serif' }} value={settings.aboutTextUr} onChange={e => setSettings({ ...settings, aboutTextUr: e.target.value })} />
        </div>
      </Section>

      <button
        onClick={handleSave}
        style={{ background: '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', transition: 'all 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.background = '#d4571f'}
        onMouseLeave={e => e.currentTarget.style.background = '#E8622A'}
      >
        Save All Settings
      </button>
    </div>
  )
}


