import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get(`${API_URL}/api/enquiries`, { headers }).then(r => setEnquiries(r.data))
  }, [])

  const updateStatus = async (id, status) => {
    await axios.put(`${API_URL}/api/enquiries/${id}`, { status }, { headers })
    setEnquiries(enquiries.map(e => e._id === id ? { ...e, status } : e))
  }

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete?')) return
    await axios.delete(`${API_URL}/api/enquiries/${id}`, { headers })
    setEnquiries(enquiries.filter(e => e._id !== id))
  }

  const statusConfig = {
    new: { color: '#0ea5e9', bg: 'rgba(14,165,233,0.15)', label: 'New' },
    contacted: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', label: 'Contacted' },
    closed: { color: '#10b981', bg: 'rgba(16,185,129,0.15)', label: 'Closed' },
  }

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Enquiries</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{enquiries.length} total enquiries</p>
      </div>

      <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--admin-bg)' }}>
              {['Customer', 'Phone', 'Subject', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--admin-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--admin-border)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 && <tr><td colSpan={6} style={{ padding: '48px 20px', textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>No enquiries yet.</td></tr>}
            {enquiries.map(e => {
              const sc = statusConfig[e.status] || statusConfig.new
              return (
                <tr key={e._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                  onMouseEnter={el => el.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={el => el.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, background: '#E8622A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{e.name?.[0]?.toUpperCase() || '?'}</div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)' }}>{e.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <a href={`https://wa.me/${e.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#25D366', textDecoration: 'none', fontWeight: 600 }}>{e.phone}</a>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: 13, color: 'var(--admin-muted)' }}>{e.subject || 'General Enquiry'}</td>
                  <td style={{ padding: '16px 20px', fontSize: 12, color: 'var(--admin-muted)' }}>{new Date(e.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <select
                      value={e.status}
                      onChange={ev => updateStatus(e._id, ev.target.value)}
                      style={{ background: sc.bg, color: sc.color, border: 'none', borderRadius: 20, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif', outline: 'none' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <button onClick={() => deleteEnquiry(e._id)} style={{ background: 'rgba(232,98,42,0.15)', border: '1px solid rgba(232,98,42,0.3)', color: '#E8622A', padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Montserrat,sans-serif' }}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}


