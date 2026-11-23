import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const STATUS = {
  new: { color: '#0EA5E9', bg: 'rgba(14,165,233,.15)', label: 'New' },
  contacted: { color: '#F59E0B', bg: 'rgba(245,158,11,.15)', label: 'Contacted' },
  closed: { color: '#10B981', bg: 'rgba(16,185,129,.15)', label: 'Closed' },
}

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  const fetchEnquiries = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/api/enquiries`, { headers })
      setEnquiries(Array.isArray(res.data) ? res.data : [])
      setError(null)
    } catch {
      setError('Could not load enquiries.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEnquiries() }, [])

  const updateStatus = async (id, status) => {
    setUpdatingId(id)
    const prev = enquiries
    setEnquiries(prev.map(e => e._id === id ? { ...e, status } : e))
    try {
      await axios.put(`${API_URL}/api/enquiries/${id}`, { status }, { headers })
    } catch {
      setEnquiries(prev)
      setError('Could not update status.')
    } finally {
      setUpdatingId(null)
    }
  }

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return
    setDeletingId(id)
    try {
      await axios.delete(`${API_URL}/api/enquiries/${id}`, { headers })
      setEnquiries(prev => prev.filter(e => e._id !== id))
    } catch {
      setError('Could not delete enquiry.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="ad-page">
      <header className="ad-head">
        <div>
          <h1 className="ad-title">Enquiries</h1>
          <p className="ad-sub">{enquiries.length} total enquiries</p>
        </div>
      </header>

      {error && (
        <div className="ad-banner ad-banner-error" role="alert" style={{ marginBottom: 14 }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="ad-card" style={{ padding: 30, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          Loading…
        </div>
      )}

      {!loading && enquiries.length === 0 && (
        <div className="ad-card" style={{ padding: 40, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
          No enquiries yet.
        </div>
      )}

      {!loading && enquiries.length > 0 && (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map(e => {
                const sc = STATUS[e.status] || STATUS.new
                return (
                  <tr key={e._id}>
                    <td>
                      <div className="ad-cell-title">
                        <div className="ad-avatar">{(e.name || '?')[0].toUpperCase()}</div>
                        <span>{e.name}</span>
                      </div>
                    </td>
                    <td>
                      <a
                        href={`https://wa.me/${(e.phone || '').replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: '#25D366', textDecoration: 'none', fontWeight: 600 }}
                      >
                        {e.phone}
                      </a>
                    </td>
                    <td>{e.subject || 'General Enquiry'}</td>
                    <td>{new Date(e.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        value={e.status || 'new'}
                        onChange={ev => updateStatus(e._id, ev.target.value)}
                        disabled={updatingId === e._id}
                        className="ad-status-select"
                        style={{ '--sc': sc.color, '--sb': sc.bg }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="ad-btn ad-btn-danger"
                        onClick={() => deleteEnquiry(e._id)}
                        disabled={deletingId === e._id}
                      >
                        {deletingId === e._id ? '…' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                )
              })}
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
        .ad-banner { padding: 10px 14px; border-radius: 10px; font-size: 12.5px; font-weight: 600; }
        .ad-banner-error { background: rgba(232,98,42,.1); border: 1px solid rgba(232,98,42,.3); color: var(--brand); }
        .ad-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 38px; padding: 7px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; font-family: var(--font-sans); border: 1px solid transparent; cursor: pointer; transition: all .2s; }
        .ad-btn:disabled { opacity: .6; cursor: not-allowed; }
        .ad-btn-danger { background: rgba(232,98,42,.15); border-color: rgba(232,98,42,.3); color: var(--brand); }
        .ad-btn-danger:hover:not(:disabled) { background: var(--brand); color: #fff; }

        .ad-table-wrap { background: var(--admin-bg2); border: 1px solid var(--admin-border); border-radius: 16px; overflow-x: auto; }
        .ad-table { width: 100%; min-width: 780px; border-collapse: collapse; }
        .ad-table thead tr { background: var(--admin-bg); }
        .ad-table th { padding: 12px 16px; text-align: left; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--admin-muted); border-bottom: 1px solid var(--admin-border); white-space: nowrap; }
        .ad-table td { padding: 14px 16px; font-size: 13px; color: var(--admin-text); border-bottom: 1px solid var(--admin-border); vertical-align: middle; }
        .ad-table tbody tr:last-child td { border-bottom: 0; }
        .ad-cell-title { display: flex; align-items: center; gap: 10px; font-weight: 700; min-width: 140px; }
        .ad-avatar { width: 34px; height: 34px; background: var(--brand); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; }

        .ad-status-select {
          background: var(--sb);
          color: var(--sc);
          border: 0;
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          font-family: var(--font-sans);
          outline: none;
        }
        .ad-status-select:disabled { opacity: .6; }
      `}</style>
    </div>
  )
}