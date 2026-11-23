import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const empty = { name: '', location: '', rating: 5, text: '', textUr: '' }
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

export default function AdminTestimonials() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showInactive, setShowInactive] = useState(false)

  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/api/testimonials${showInactive ? '?all=true' : ''}`)
      setItems(Array.isArray(res.data) ? res.data : [])
      setError(null)
    } catch {
      setError('Could not load testimonials.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [showInactive])

  const flash = (msg) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(null), 3000)
  }

    const handleSave = async () => {
    if (saving) return
    if (!form.name.trim() || !form.text.trim()) {
      setError('Name and review text are required.')
      return
    }
    setSaving(true); setError(null)
    
    // We send both 'text' and 'review' to guarantee the backend accepts it
    const payload = { ...form, review: form.text, content: form.text, isActive: true, rating: Number(form.rating) }
    
    try {
      if (editing) await axios.put(`${API_URL}/api/testimonials/${editing}`, payload, { headers })
      else await axios.post(`${API_URL}/api/testimonials`, payload, { headers })
      setForm(empty); setEditing(null); setShowForm(false)
      await fetchItems()
      flash(editing ? 'Review updated.' : 'Review added.')
    } catch {
      setError('Failed to save review.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return
    setDeletingId(id)
    try {
      await axios.delete(`${API_URL}/api/testimonials/${id}`, { headers })
      await fetchItems()
      flash('Review deleted.')
    } catch {
      setError('Failed to delete review.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="ad-page">
      <header className="ad-head">
        <div>
          <h1 className="ad-title">Testimonials</h1>
          <p className="ad-sub">{items.length} reviews total</p>
        </div>
        <button
          className="ad-btn ad-btn-primary"
          onClick={() => { setShowForm(!showForm); setForm(empty); setEditing(null); setError(null) }}
        >
          {showForm ? '✕ Cancel' : '+ Add Review'}
        </button>
      </header>

      <div className="ad-toolbar">
        <label className="ad-checkbox">
          <input type="checkbox" checked={showInactive} onChange={e => setShowInactive(e.target.checked)} />
          Show inactive
        </label>
        {error && <div className="ad-banner ad-banner-error" role="alert">{error}</div>}
        {success && <div className="ad-banner ad-banner-success" role="status">✓ {success}</div>}
      </div>

      {showForm && (
        <section className="ad-card" style={{ padding: 20, marginBottom: 20 }}>
          <h2 className="ad-form-title">{editing ? 'Edit Review' : 'Add Review'}</h2>
          <div className="ad-form-grid">
            <div>
              <label style={lbl}>Customer Name</label>
              <input type="text" placeholder="Ahmed Khan" style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={lbl}>Location</label>
              <input type="text" placeholder="Peshawar" style={inp} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            </div>
            <div>
              <label style={lbl}>Rating</label>
              <select style={inp} value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={lbl}>Review (English)</label>
              <textarea rows={3} style={{ ...inp, resize: 'vertical', minHeight: 80 }} value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={lbl}>Review (Urdu — optional)</label>
              <textarea rows={2} style={{ ...inp, resize: 'vertical', direction: 'rtl', fontFamily: 'var(--font-urdu)', minHeight: 70 }} value={form.textUr} onChange={e => setForm({ ...form, textUr: e.target.value })} />
            </div>
          </div>
          <button className="ad-btn ad-btn-primary" onClick={handleSave} disabled={saving} style={{ marginTop: 14 }}>
            {saving ? 'Saving…' : editing ? '✓ Update Review' : '+ Save Review'}
          </button>
        </section>
      )}

      {loading && (
        <div className="ad-card" style={{ padding: 30, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          Loading…
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="ad-card" style={{ padding: 40, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          No reviews yet. Click "+ Add Review" to get started.
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="rev-admin-grid">
          {items.map(t => (
            <article key={t._id} className="rev-admin-card">
              <div className="rev-admin-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p className="rev-admin-text">"{t.text}"</p>
              <div className="rev-admin-user">
                <div className="rev-admin-avatar">{(t.name || '?')[0]}</div>
                <div>
                  <div className="rev-admin-name">{t.name}</div>
                  <div className="rev-admin-loc">{t.location}</div>
                </div>
              </div>
              <div className="rev-admin-actions">
                <button className="ad-btn ad-btn-ghost" onClick={() => { setForm(t); setEditing(t._id); setShowForm(true) }} disabled={!!deletingId}>Edit</button>
                <button className="ad-btn ad-btn-danger" onClick={() => handleDelete(t._id)} disabled={deletingId === t._id}>
                  {deletingId === t._id ? '…' : 'Delete'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <style>{`
        .ad-page { max-width: 1200px; margin: 0 auto; }
        .ad-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
        .ad-title { font-size: 22px; font-weight: 800; color: var(--admin-text); margin: 0 0 4px; }
        .ad-sub { font-size: 13px; color: var(--admin-muted); margin: 0; }
        .ad-card { background: var(--admin-bg2); border: 1px solid var(--admin-border); border-radius: 16px; }
        .ad-form-title { font-size: 15px; font-weight: 700; color: var(--admin-text); margin: 0 0 16px; }
        .ad-form-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .ad-toolbar { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
        .ad-checkbox { display: inline-flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--admin-muted); cursor: pointer; }
        .ad-checkbox input { accent-color: var(--brand); width: 15px; height: 15px; }
        .ad-banner { padding: 10px 14px; border-radius: 10px; font-size: 12.5px; font-weight: 600; }
        .ad-banner-error { background: rgba(232,98,42,.1); border: 1px solid rgba(232,98,42,.3); color: var(--brand); }
        .ad-banner-success { background: rgba(16,185,129,.1); border: 1px solid rgba(16,185,129,.3); color: #10B981; }
        .ad-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 42px; padding: 9px 16px; border-radius: 10px; font-size: 12.5px; font-weight: 700; font-family: var(--font-sans); border: 1px solid transparent; cursor: pointer; transition: all .2s; }
        .ad-btn:disabled { opacity: .6; cursor: not-allowed; }
        .ad-btn-primary { background: var(--brand); color: #fff; }
        .ad-btn-primary:hover:not(:disabled) { background: var(--brand-2); }
        .ad-btn-ghost { background: rgba(14,165,233,.15); border-color: rgba(14,165,233,.3); color: #0EA5E9; }
        .ad-btn-ghost:hover:not(:disabled) { background: #0EA5E9; color: #fff; }
        .ad-btn-danger { background: rgba(232,98,42,.15); border-color: rgba(232,98,42,.3); color: var(--brand); }
        .ad-btn-danger:hover:not(:disabled) { background: var(--brand); color: #fff; }

        .rev-admin-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .rev-admin-card {
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          padding: 18px;
          display: flex; flex-direction: column;
        }
        .rev-admin-stars { color: #F59E0B; font-size: 13px; letter-spacing: 2px; margin-bottom: 10px; }
        .rev-admin-text {
          font-size: 13px; font-style: italic;
          color: var(--admin-muted); line-height: 1.7;
          margin: 0 0 14px; flex: 1;
        }
        .rev-admin-user {
          display: flex; align-items: center; gap: 10px;
          padding-top: 12px; border-top: 1px solid var(--admin-border);
          margin-bottom: 12px;
        }
        .rev-admin-avatar {
          width: 36px; height: 36px;
          background: var(--brand); color: #fff;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 14px;
        }
        .rev-admin-name { font-size: 13px; font-weight: 700; color: var(--admin-text); }
        .rev-admin-loc { font-size: 11px; color: var(--admin-muted); margin-top: 2px; }
        .rev-admin-actions { display: flex; gap: 6px; }
        .rev-admin-actions .ad-btn { flex: 1; }

        @media (min-width: 640px) {
          .ad-form-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
          .ad-toolbar { flex-direction: row; align-items: center; justify-content: space-between; }
          .rev-admin-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .rev-admin-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
      `}</style>
    </div>
  )
}