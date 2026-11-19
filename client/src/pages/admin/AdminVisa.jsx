import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const empty = { country: '', flag: '', type: '', processing: '', fee: '' }
const inp = { width: '100%', background: 'var(--admin-inp)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: 'var(--admin-inp-text)', fontFamily: 'Montserrat,sans-serif', outline: 'none', appearance: 'none' }
const lbl = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }

export default function AdminVisa() {
  const [visas, setVisas] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  const fetch = async () => { const r = await axios.get(`${API_URL}/api/visa`); setVisas(r.data) }
  useEffect(() => { fetch() }, [])

  const handleSave = async () => {
    if (editing) await axios.put(`${API_URL}/api/visa/${editing}`, form, { headers })
    else await axios.post(`${API_URL}/api/visa`, form, { headers })
    setForm(empty); setEditing(null); setShowForm(false); fetch()
  }

  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await axios.delete(`${API_URL}/api/visa/${id}`, { headers }); fetch() }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Visa Countries</h1>
          <p style={{ fontSize: 13, color: 'var(--admin-muted)' }}>{visas.length} countries total</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditing(null) }}
          style={{ background: showForm ? 'rgba(255,255,255,0.1)' : '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
          {showForm ? '✕ Cancel' : '+ Add Country'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>{editing ? 'Edit Country' : 'Add Visa Country'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            {[
              { key: 'country', label: 'Country Name', placeholder: 'UAE (Dubai)' },
              { key: 'flag', label: 'Flag Emoji', placeholder: '🇦🇪' },
              { key: 'type', label: 'Visa Type', placeholder: 'Visa on Arrival' },
              { key: 'processing', label: 'Processing Time', placeholder: '3-5 Days' },
              { key: 'fee', label: 'Service Fee', placeholder: 'PKR 15,000' },
            ].map(f => (
              <div key={f.key}>
                <label style={lbl}>{f.label}</label>
                <input type="text" placeholder={f.placeholder} style={inp} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} />
              </div>
            ))}
          </div>
          <button onClick={handleSave} style={{ background: '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
            {editing ? '✓ Update' : '+ Save Country'}
          </button>
        </div>
      )}

      <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--admin-bg)' }}>
              {['Country', 'Visa Type', 'Processing', 'Fee', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--admin-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visas.length === 0 && <tr><td colSpan={5} style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>No visa countries yet. Click "+ Add Country" to get started.</td></tr>}
            {visas.map(v => (
              <tr key={v._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{v.flag}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)' }}>{v.country}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 20px' }}><span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(16,185,129,0.15)', color: '#10b981', padding: '4px 10px', borderRadius: 20 }}>{v.type}</span></td>
                <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--admin-muted)' }}>{v.processing || '-'}</td>
                <td style={{ padding: '16px 20px', fontSize: 14, fontWeight: 700, color: '#E8622A' }}>{v.fee}</td>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => { setForm(v); setEditing(v._id); setShowForm(true) }} style={{ background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', color: '#0ea5e9', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Edit</button>
                    <button onClick={() => handleDelete(v._id)} style={{ background: 'rgba(232,98,42,0.15)', border: '1px solid rgba(232,98,42,0.3)', color: '#E8622A', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Delete</button>
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


