import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const empty = { title: '', type: 'domestic', region: '', continent: '', image: '', days: '', price: '', description: '', includes: '' }

const inp = {
  width: '100%', background: 'rgba(255,255,255,0.05)',
  border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 10,
  padding: '11px 14px', fontSize: 13, color: 'var(--admin-inp-text)',
  fontFamily: 'Montserrat,sans-serif', outline: 'none', transition: 'border 0.2s',
  appearance: 'none', colorScheme: 'dark',
}

const lbl = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }

export default function AdminTours() {
  const [tours, setTours] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  const fetch = async () => {
    const res = await axios.get(`${API_URL}/api/tours`)
    setTours(res.data)
  }

  useEffect(() => { fetch() }, [])

  const handleSave = async () => {
    const data = { ...form, includes: form.includes.split(',').map(i => i.trim()) }
    if (editing) {
      await axios.put(`${API_URL}/api/tours/${editing}`, data, { headers })
    } else {
      await axios.post(`${API_URL}/api/tours`, data, { headers })
    }
    setForm(empty); setEditing(null); setShowForm(false); fetch()
  }

  const handleEdit = (t) => { setForm({ ...t, includes: t.includes.join(', ') }); setEditing(t._id); setShowForm(true) }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tour?')) return
    await axios.delete(`${API_URL}/api/tours/${id}`, { headers })
    fetch()
  }

  const typeColors = { domestic: '#10b981', international: '#0ea5e9', 'hajj-umrah': '#E8622A' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Tours</h1>
          <p style={{ fontSize: 13, color: 'var(--admin-muted)' }}>{tours.length} tours total</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setForm(empty); setEditing(null) }}
          style={{ background: showForm ? 'rgba(255,255,255,0.1)' : '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', display: 'flex', alignItems: 'center', gap: 8 }}
        >
          {showForm ? '✕ Cancel' : '+ Add Tour'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>{editing ? 'Edit Tour' : 'Add New Tour'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {[
              { key: 'title', label: 'Tour Title', placeholder: 'Kumrat Valley Tour' },
              { key: 'image', label: 'Image URL', placeholder: 'https://images.unsplash.com/...' },
              { key: 'days', label: 'Duration', placeholder: '5 Days' },
              { key: 'price', label: 'Price', placeholder: 'PKR 25,000' },
              { key: 'region', label: 'Region (domestic only)', placeholder: 'KPK' },
              { key: 'continent', label: 'Continent (international only)', placeholder: 'Asia' },
            ].map(f => (
              <div key={f.key}>
                <label style={lbl}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} style={inp} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
            <div>
              <label style={lbl}>Tour Type</label>
              <select style={inp} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
                <option value="hajj-umrah">Hajj & Umrah</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Includes (comma separated)</label>
              <input type="text" placeholder="Hotel, Transport, Meals" style={inp} value={form.includes} onChange={e => setForm({ ...form, includes: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={lbl}>Description</label>
              <textarea rows={3} style={{ ...inp, resize: 'none' }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>
          </div>
          <button
            onClick={handleSave}
            style={{ background: '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}
          >
            {editing ? '✓ Update Tour' : '+ Save Tour'}
          </button>
        </div>
      )}

      <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--admin-bg)' }}>
              {['Title', 'Type', 'Duration', 'Price', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--admin-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tours.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
                  No tours yet. Click "+ Add Tour" to add your first tour.
                </td>
              </tr>
            )}
            {tours.map((t, i) => (
              <tr key={t._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {t.image && <img src={t.image} alt={t.title} style={{ width: 44, height: 36, objectFit: 'cover', borderRadius: 8 }} />}
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)' }}>{t.title}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, background: (typeColors[t.type] || '#E8622A') + '20', color: typeColors[t.type] || '#E8622A', padding: '4px 10px', borderRadius: 20 }}>{t.type}</span>
                </td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{t.days}</td>
                <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 700, color: '#E8622A' }}>{t.price}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleEdit(t)} style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', color: '#0ea5e9', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Edit</button>
                    <button onClick={() => handleDelete(t._id)} style={{ background: 'rgba(232,98,42,0.15)', border: '1px solid rgba(232,98,42,0.3)', color: '#E8622A', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


