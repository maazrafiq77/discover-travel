import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const empty = { name: '', location: '', rating: 5, text: '', textUr: '' }
const inp = { width: '100%', background: 'var(--admin-inp)', border: '1.5px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: 'var(--admin-inp-text)', fontFamily: 'Montserrat,sans-serif', outline: 'none', appearance: 'none' }
const lbl = { fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', display: 'block', marginBottom: 6 }

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  const fetch = async () => { const r = await axios.get(`${API_URL}/api/testimonials`); setItems(r.data) }
  useEffect(() => { fetch() }, [])

  const handleSave = async () => {
    if (editing) await axios.put(`${API_URL}/api/testimonials/${editing}`, form, { headers })
    else await axios.post(`${API_URL}/api/testimonials`, form, { headers })
    setForm(empty); setEditing(null); setShowForm(false); fetch()
  }

  const handleDelete = async (id) => { if (!window.confirm('Delete?')) return; await axios.delete(`${API_URL}/api/testimonials/${id}`, { headers }); fetch() }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Testimonials</h1>
          <p style={{ fontSize: 13, color: 'var(--admin-muted)' }}>{items.length} reviews total</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditing(null) }}
          style={{ background: showForm ? 'rgba(255,255,255,0.1)' : '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
          {showForm ? '✕ Cancel' : '+ Add Review'}
        </button>
      </div>

      {showForm && (
        <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 20 }}>{editing ? 'Edit Review' : 'Add Review'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <div><label style={lbl}>Customer Name</label><input type="text" placeholder="Ahmed Khan" style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><label style={lbl}>Location</label><input type="text" placeholder="Peshawar" style={inp} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
            <div>
              <label style={lbl}>Rating</label>
              <select style={inp} value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Review (English)</label>
            <textarea rows={3} style={{ ...inp, resize: 'none' }} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={lbl}>Review (Urdu - Optional)</label>
            <textarea rows={2} style={{ ...inp, resize: 'none', direction: 'rtl', fontFamily: 'Noto Nastaliq Urdu,serif' }} value={form.textUr} onChange={e => setForm({ ...form, textUr: e.target.value })} />
          </div>
          <button onClick={handleSave} style={{ background: '#E8622A', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>
            {editing ? '✓ Update Review' : '+ Save Review'}
          </button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {items.length === 0 && (
          <div style={{ gridColumn: '1/-1', background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 48, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
            No reviews yet. Click "+ Add Review" to get started.
          </div>
        )}
        {items.map(t => (
          <div key={t._id} style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, padding: 24 }}>
            <div style={{ color: '#f59e0b', fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>{'★'.repeat(t.rating)}</div>
            <p style={{ fontSize: 13, color: 'var(--admin-muted)', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 36, height: 36, background: '#E8622A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>{t.name[0]}</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)' }}>{t.name}</p>
                <p style={{ fontSize: 11, color: 'var(--admin-muted)' }}>{t.location}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setForm(t); setEditing(t._id); setShowForm(true) }} style={{ flex: 1, background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)', color: '#0ea5e9', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Edit</button>
              <button onClick={() => handleDelete(t._id)} style={{ flex: 1, background: 'rgba(232,98,42,0.15)', border: '1px solid rgba(232,98,42,0.3)', color: '#E8622A', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


