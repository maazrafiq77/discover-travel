import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const empty = { country: '', flag: '', type: '', processing: '', fee: '' }
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

export default function AdminVisa() {
  const [visas, setVisas] = useState([])
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

  const fetchVisas = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/api/visa${showInactive ? '?all=true' : ''}`)
      setVisas(Array.isArray(res.data) ? res.data : [])
      setError(null)
    } catch {
      setError('Could not load visa countries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVisas() }, [showInactive])

  const flash = (msg) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(null), 3000)
  }

  const handleSave = async () => {
    if (saving) return
    if (!form.country.trim() || !form.type.trim()) {
      setError('Country and visa type are required.')
      return
    }
    setSaving(true); setError(null)
    try {
      if (editing) await axios.put(`${API_URL}/api/visa/${editing}`, form, { headers })
      else await axios.post(`${API_URL}/api/visa`, form, { headers })
      setForm(empty); setEditing(null); setShowForm(false)
      await fetchVisas()
      flash(editing ? 'Country updated.' : 'Country added.')
    } catch {
      setError('Failed to save country.')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (v) => {
    setForm(v); setEditing(v._id); setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this country?')) return
    setDeletingId(id)
    try {
      await axios.delete(`${API_URL}/api/visa/${id}`, { headers })
      await fetchVisas()
      flash('Country deleted.')
    } catch {
      setError('Failed to delete country.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="ad-page">
      <header className="ad-head">
        <div>
          <h1 className="ad-title">Visa Countries</h1>
          <p className="ad-sub">{visas.length} countries total</p>
        </div>
        <button
          className="ad-btn ad-btn-primary"
          onClick={() => { setShowForm(!showForm); setForm(empty); setEditing(null); setError(null) }}
        >
          {showForm ? '✕ Cancel' : '+ Add Country'}
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
          <h2 className="ad-form-title">{editing ? 'Edit Country' : 'Add Visa Country'}</h2>
          <div className="ad-form-grid">
            {[
              { key: 'country', label: 'Country Name', placeholder: 'UAE (Dubai)' },
              { key: 'flag', label: 'Flag Emoji', placeholder: '🇦🇪' },
              { key: 'type', label: 'Visa Type', placeholder: 'Visa on Arrival' },
              { key: 'processing', label: 'Processing Time', placeholder: '3-5 Days' },
              { key: 'fee', label: 'Service Fee', placeholder: 'PKR 15,000' },
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
          <button className="ad-btn ad-btn-primary" onClick={handleSave} disabled={saving} style={{ marginTop: 14 }}>
            {saving ? 'Saving…' : editing ? '✓ Update' : '+ Save Country'}
          </button>
        </section>
      )}

      {loading && (
        <div className="ad-card" style={{ padding: 30, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          Loading…
        </div>
      )}

      {!loading && visas.length === 0 && (
        <div className="ad-card" style={{ padding: 40, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          No visa countries yet. Click "+ Add Country" to get started.
        </div>
      )}

      {!loading && visas.length > 0 && (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Visa Type</th>
                <th>Processing</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {visas.map(v => (
                <tr key={v._id}>
                  <td>
                    <div className="ad-cell-title">
                      <span style={{ fontSize: 24 }}>{v.flag}</span>
                      <span>{v.country}</span>
                    </div>
                  </td>
                  <td>
                    <span className="ad-tag" style={{ '--tc': '#10B981' }}>{v.type}</span>
                  </td>
                  <td>{v.processing || '—'}</td>
                  <td className="ad-price">{v.fee}</td>
                  <td>
                    <span className={`ad-status ${v.isActive === false ? 'is-off' : 'is-on'}`}>
                      {v.isActive === false ? 'Inactive' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div className="ad-actions">
                      <button className="ad-btn ad-btn-ghost" onClick={() => handleEdit(v)} disabled={!!deletingId}>Edit</button>
                      <button className="ad-btn ad-btn-danger" onClick={() => handleDelete(v._id)} disabled={deletingId === v._id}>
                        {deletingId === v._id ? '…' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        .ad-table-wrap { background: var(--admin-bg2); border: 1px solid var(--admin-border); border-radius: 16px; overflow-x: auto; }
        .ad-table { width: 100%; min-width: 660px; border-collapse: collapse; }
        .ad-table thead tr { background: var(--admin-bg); }
        .ad-table th { padding: 12px 16px; text-align: left; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--admin-muted); border-bottom: 1px solid var(--admin-border); white-space: nowrap; }
        .ad-table td { padding: 12px 16px; font-size: 13px; color: var(--admin-text); border-bottom: 1px solid var(--admin-border); vertical-align: middle; }
        .ad-table tbody tr:last-child td { border-bottom: 0; }
        .ad-cell-title { display: flex; align-items: center; gap: 10px; font-weight: 700; min-width: 160px; }
        .ad-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .5px; padding: 3px 9px; border-radius: 999px; background: color-mix(in srgb, var(--tc) 15%, transparent); color: var(--tc); }
        .ad-price { font-weight: 700; color: var(--brand); }
        .ad-status { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .5px; padding: 3px 9px; border-radius: 999px; }
        .ad-status.is-on { background: rgba(16,185,129,.15); color: #10B981; }
        .ad-status.is-off { background: rgba(255,255,255,.06); color: var(--admin-muted); }
        .ad-actions { display: flex; gap: 6px; flex-wrap: nowrap; }
        @media (min-width: 640px) {
          .ad-form-grid { grid-template-columns: 1fr 1fr; gap: 14px; }
          .ad-toolbar { flex-direction: row; align-items: center; justify-content: space-between; }
        }
      `}</style>
    </div>
  )
}