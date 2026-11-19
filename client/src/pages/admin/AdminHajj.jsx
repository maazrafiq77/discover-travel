import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const empty = { title: '', price: '', days: '', includes: '', isPopular: false }

const inp = { width: '100%', background: 'var(--admin-inp)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: 'var(--admin-inp-text)', fontFamily: 'Montserrat,sans-serif', outline: 'none', appearance: 'none' }
const lbl = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }

export default function AdminHajj() {
  const [packages, setPackages] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  const fetch = async () => { const r = await axios.get(`${API_URL}/api/hajj`); setPackages(r.data) }
  useEffect(() => { fetch() }, [])

  const handleSave = async () => {
    const data = { ...form, includes: form.includes.split(',').map(i => i.trim()) }
    if (editing) await axios.put(`${API_URL}/api/hajj/${editing}`, data, { headers })
    else await axios.post(`${API_URL}/api/hajj`, data, { headers })
    setForm(empty); setEditing(null); setShowForm(false); fetch()
  }

  const handleEdit = (p) => { setForm({ ...p, includes: p.includes.join(', ') }); setEditing(p._id); setShowForm(true) }
  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await axios.delete(`${API_URL}/api/hajj/${id}`, { headers }); fetch() }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Hajj & Umrah Packages</h1>
          <p style={{ fontSize: 13, color: 'var(--admin-muted)' }}>{packages.length} packages total</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditing(null) }}
          style={{ background: showForm ? 'rgba(255,255,255,0.1)' : '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
          {showForm ? '✕ Cancel' : '+ Add Package'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>{editing ? 'Edit Package' : 'Add New Package'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {[
              { key: 'title', label: 'Package Title', placeholder: 'Economy Umrah Package' },
              { key: 'price', label: 'Price', placeholder: 'PKR 180,000' },
              { key: 'days', label: 'Duration', placeholder: '14 Days' },
              { key: 'includes', label: 'Includes (comma separated)', placeholder: 'Air Ticket, Hotel, Visa, Guide' },
            ].map(f => (
              <div key={f.key}>
                <label style={lbl}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} style={inp} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <input type="checkbox" id="pop" checked={form.isPopular} onChange={e => setForm({ ...form, isPopular: e.target.checked })} style={{ width: 16, height: 16, accentColor: '#E8622A' }} />
            <label htmlFor="pop" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>Mark as Most Popular</label>
          </div>
          <button onClick={handleSave} style={{ background: '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
            {editing ? '✓ Update Package' : '+ Save Package'}
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {packages.length === 0 && (
          <div style={{ gridColumn: '1/-1', background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 48, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
            No packages yet. Click "+ Add Package" to get started.
          </div>
        )}
        {packages.map(p => (
          <div key={p._id} style={{ background: p.isPopular ? '#E8622A' : '#1a1d27', border: `1px solid ${p.isPopular ? '#E8622A' : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: 24, position: 'relative' }}>
            {p.isPopular && <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 20, letterSpacing: 1 }}>POPULAR</span>}
            <h3 style={{ fontSize: 15, fontWeight: 700, color: p.isPopular ? '#fff' : '#fff', marginBottom: 6 }}>{p.title}</h3>
            <p style={{ fontSize: 24, fontWeight: 800, color: p.isPopular ? '#fff' : '#E8622A', marginBottom: 4 }}>{p.price}</p>
            <p style={{ fontSize: 12, color: p.isPopular ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.4)', marginBottom: 16 }}>{p.days}</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 20 }}>
              {p.includes.map(item => (
                <li key={item} style={{ fontSize: 12, color: p.isPopular ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: p.isPopular ? '#fff' : '#E8622A' }}>✓</span> {item}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => handleEdit(p)} style={{ flex: 1, background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.3)', color: '#0ea5e9', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Edit</button>
              <button onClick={() => handleDelete(p._id)} style={{ flex: 1, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


