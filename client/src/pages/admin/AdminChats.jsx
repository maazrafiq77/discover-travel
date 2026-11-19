import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminChats() {
  const [sessions, setSessions] = useState([])
  const [selected, setSelected] = useState(null)
  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    axios.get(`${API_URL}/api/chat`, { headers }).then(r => setSessions(r.data))
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--admin-text)', marginBottom: 4 }}>Chat Sessions</h1>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{sessions.length} total sessions</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, height: '70vh' }}>
        {/* List */}
        <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--admin-border)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase' }}>Conversations</div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {sessions.length === 0 && <p style={{ padding: 20, color: 'var(--admin-muted)', fontSize: 13 }}>No chat sessions yet.</p>}
            {sessions.map(s => (
              <div
                key={s._id}
                onClick={() => setSelected(s)}
                style={{
                  padding: '14px 20px', cursor: 'pointer',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: selected?._id === s._id ? 'rgba(232,98,42,0.1)' : 'transparent',
                  borderLeft: selected?._id === s._id ? '3px solid #E8622A' : '3px solid transparent',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: '#E8622A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                    {(s.customerName || 'A')[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--admin-text)' }}>{s.customerName || 'Anonymous'}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{s.customerPhone || 'No phone'}</p>
                    <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{new Date(s.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat view */}
        <div style={{ background: 'var(--admin-bg2)', border: '1px solid var(--admin-border)', borderRadius: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {!selected && (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: 'var(--admin-muted)', fontSize: 13 }}>Select a conversation to view messages</p>
            </div>
          )}
          {selected && (
            <>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{selected.customerName || 'Anonymous'}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{selected.customerPhone}</p>
                </div>
                {selected.customerPhone && (
                  <a href={`https://wa.me/${selected.customerPhone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    style={{ background: '#25D366', color: '#fff', padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                    💬 Open WhatsApp
                  </a>
                )}
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {selected.messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '70%', padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5,
                      background: m.role === 'user' ? '#E8622A' : 'rgba(255,255,255,0.08)',
                      color: '#fff',
                      borderBottomRightRadius: m.role === 'user' ? 4 : 12,
                      borderBottomLeftRadius: m.role === 'assistant' ? 4 : 12,
                    }}>
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}


