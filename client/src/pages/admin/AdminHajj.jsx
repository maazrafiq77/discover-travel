import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const empty = { title: '', price: '', days: '', includes: '', isPopular: false }

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

export default function AdminHajj() {
  const [packages, setPackages] = useState([])
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

  const fetchPkgs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/api/hajj${showInactive ? '?all=true' : ''}`)
      setPackages(Array.isArray(res.data) ? res.data : [])
      setError(null)
    } catch {
      setError('Could not load packages.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPkgs() }, [showInactive])

  const flash = (msg) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleSave = async () => {
    if (saving) return
    if (!form.title.trim() || !form.price.trim() || !form.days.trim()) {
      setError('Title, price and duration are required.')
      return
    }
    setSaving(true); setError(null)
    try {
      const data = {
        ...form,
        includes: form.includes.split(',').map(s => s.trim()).filter(Boolean),
      }
      if (editing) await axios.put(`${API_URL}/api/hajj/${editing}`, data, { headers })
      else await axios.post(`${API_URL}/api/hajj`, data, { headers })
      setForm(empty); setEditing(null); setShowForm(false)
      await fetchPkgs()
      flash(editing ? 'Package updated.' : 'Package added.')
    } catch {
      setError('Failed to save package.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (p) => {
    setForm({ ...p, includes: Array.isArray(p.includes) ? p.includes.join(', ') : '' })
    setEditing(p._id); setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this package?')) return
    setDeletingId(id)
    try {
      await axios.delete(`${API_URL}/api/hajj/${id}`, { headers })
      await fetchPkgs()
      flash('Package deleted.')
    } catch {
      setError('Failed to delete package.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="ad-page">
      <header className="ad-head">
        <div>
          <h1 className="ad-title">Hajj &amp; Umrah Packages</h1>
          <p className="ad-sub">{packages.length} packages total</p>
        </div>
        <button
          className="ad-btn ad-btn-primary"
          onClick={() => { setShowForm(!showForm); setForm(empty); setEditing(null); setError(null) }}
        >
          {showForm ? '✕ Cancel' : '+ Add Package'}
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
          <h2 className="ad-form-title">{editing ? 'Edit Package' : 'Add New Package'}</h2>
          <div className="ad-form-grid">
            {[
              { key: 'title', label: 'Package Title', placeholder: 'Economy Umrah Package' },
              { key: 'price', label: 'Price', placeholder: 'PKR 180,000' },
              { key: 'days', label: 'Duration', placeholder: '14 Days' },
              { key: 'includes', label: 'Includes (comma separated)', placeholder: 'Air Ticket, Hotel, Visa, Guide' },
            ].map(f => (
              <div key={f.key}>
                <label style={lbl}>{f.label}</label>
                <input
                  type="text"
                  placeholder={f.placeholder}
                  style={inp}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <label className="ad-checkbox" style={{ marginTop: 14 }}>
            <input
              type="checkbox"
              checked={form.isPopular}
              onChange={e => setForm({ ...form, isPopular: e.target.checked })}
            />
            Mark as Most Popular
          </label>
          <button
            className="ad-btn ad-btn-primary"
            onClick={handleSave}
            disabled={saving}
            style={{ marginTop: 14 }}
          >
            {saving ? 'Saving…' : editing ? '✓ Update Package' : '+ Save Package'}
          </button>
        </section>
      )}

      {loading && (
        <div className="ad-card" style={{ padding: 30, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          Loading…
        </div>
      )}

      {!loading && packages.length === 0 && (
        <div className="ad-card" style={{ padding: 40, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          No packages yet. Click "+ Add Package" to get started.
        </div>
      )}

      {!loading && packages.length > 0 && (
        <div className="pkg-admin-grid">
          {packages.map(p => (
            <article key={p._id} className={`pkg-admin-card${p.isPopular ? ' is-pop' : ''}`}>
              {p.isPopular && <span className="pkg-admin-badge">POPULAR</span>}
              <h3 className="pkg-admin-title">{p.title}</h3>
              <div className="pkg-admin-price">{p.price}</div>
              <div className="pkg-admin-days">{p.days}</div>
              <ul className="pkg-admin-list">
                {(p.includes || []).map(item => (
                  <li key={item}><span>✓</span> {item}</li>
                ))}
              </ul>
              <div className="pkg-admin-actions">
                <button className="ad-btn ad-btn-ghost" onClick={() => handleEdit(p)} disabled={!!deletingId}>Edit</button>
                <button className="ad-btn ad-btn-danger" onClick={() => handleDelete(p._id)} disabled={deletingId === p._id}>
                  {deletingId === p._id ? '…' : 'Delete'}
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

        .pkg-admin-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .pkg-admin-card {
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          padding: 18px;
          position: relative;
        }
        .pkg-admin-card.is-pop { background: var(--brand); border-color: var(--brand); }
        .pkg-admin-badge {
          position: absolute; top: 12px; right: 12px;
          background: rgba(255,255,255,.2); color: #fff;
          font-size: 9px; font-weight: 700; letter-spacing: 1px;
          padding: 3px 8px; border-radius: 999px;
        }
        .pkg-admin-title { font-size: 14px; font-weight: 700; color: var(--admin-text); margin: 0 0 6px; }
        .pkg-admin-card.is-pop .pkg-admin-title { color: #fff; }
        .pkg-admin-price { font-size: 22px; font-weight: 800; color: var(--brand); margin-bottom: 3px; }
        .pkg-admin-card.is-pop .pkg-admin-price { color: #fff; }
        .pkg-admin-days { font-size: 12px; color: var(--admin-muted); margin-bottom: 12px; }
        .pkg-admin-card.is-pop .pkg-admin-days { color: rgba(255,255,255,.7); }
        .pkg-admin-list { list-style: none; padding: 0; margin: 0 0 14px; }
        .pkg-admin-list li { font-size: 12px; color: var(--admin-muted); margin-bottom: 6px; display: flex; gap: 8px; }
        .pkg-admin-card.is-pop .pkg-admin-list li { color: rgba(255,255,255,.85); }
        .pkg-admin-list span { color: var(--brand); }
        .pkg-admin-card.is-pop .pkg-admin-list span { color: #fff; }
        .pkg-admin-actions { display: flex; gap: 6px; }
        .pkg-admin-actions .ad-btn { flex: 1; }

        @media (min-width: 640px) {
          .ad-form-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
          .ad-toolbar { flex-direction: row; align-items: center; justify-content: space-between; }
          .pkg-admin-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
          .pkg-admin-grid { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
      `}</style>
    </div>
  )
}