import API_URL from '../../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminChats() {
  const [sessions, setSessions] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mobileView, setMobileView] = useState('list') // 'list' | 'chat'

  const token = localStorage.getItem('adminToken')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    let cancelled = false
    axios.get(`${API_URL}/api/chat`, { headers })
      .then(r => { if (!cancelled) setSessions(Array.isArray(r.data) ? r.data : []) })
      .catch(() => { if (!cancelled) setError('Could not load chat sessions.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  const openSession = (s) => {
    setSelected(s)
    setMobileView('chat')
  }

  const closeChat = () => {
    setMobileView('list')
  }

  return (
    <div className="ad-page chat-page">
      <header className="ad-head">
        <div>
          <h1 className="ad-title">Chat Sessions</h1>
          <p className="ad-sub">{sessions.length} total sessions</p>
        </div>
      </header>

      {error && <div className="ad-banner ad-banner-error" style={{ marginBottom: 14 }}>{error}</div>}

      <div className={`chat-layout ${mobileView === 'chat' ? 'chat-show-detail' : ''}`}>
        {/* List panel */}
        <div className="chat-list-panel">
          <div className="chat-list-head">Conversations</div>
          <div className="chat-list-body">
            {loading && (
              <div style={{ padding: 20, textAlign: 'center', color: 'var(--admin-muted)', fontSize: 13 }}>
                Loading…
              </div>
            )}
            {!loading && sessions.length === 0 && (
              <p style={{ padding: 20, color: 'var(--admin-muted)', fontSize: 13 }}>
                No chat sessions yet.
              </p>
            )}
            {!loading && sessions.map(s => (
              <button
                key={s._id}
                onClick={() => openSession(s)}
                className={`chat-list-item${selected?._id === s._id ? ' is-active' : ''}`}
              >
                <div className="chat-item-avatar">
                  {(s.customerName || 'A')[0].toUpperCase()}
                </div>
                <div className="chat-item-info">
                  <div className="chat-item-name">{s.customerName || 'Anonymous'}</div>
                  <div className="chat-item-phone">{s.customerPhone || 'No phone'}</div>
                  <div className="chat-item-date">{new Date(s.createdAt).toLocaleDateString()}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="chat-detail-panel">
          {!selected && (
            <div className="chat-detail-empty">
              Select a conversation to view messages
            </div>
          )}

          {selected && (
            <>
              <div className="chat-detail-head">
                <button className="chat-back-btn" onClick={closeChat} aria-label="Back to conversations">
                  ←
                </button>
                <div className="chat-detail-who">
                  <div className="chat-item-name">{selected.customerName || 'Anonymous'}</div>
                  <div className="chat-item-phone">{selected.customerPhone}</div>
                </div>
                {selected.customerPhone && (
                  <a
                    href={`https://wa.me/${selected.customerPhone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="chat-wa-btn"
                  >
                    💬 WhatsApp
                  </a>
                )}
              </div>
              <div className="chat-messages">
                {(selected.messages || []).map((m, i) => (
                  <div
                    key={i}
                    className={`chat-msg ${m.role === 'user' ? 'is-user' : 'is-bot'}`}
                  >
                    <div className="chat-bubble">{m.content}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .ad-page { max-width: 1200px; margin: 0 auto; }
        .ad-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
        .ad-title { font-size: 22px; font-weight: 800; color: var(--admin-text); margin: 0 0 4px; }
        .ad-sub { font-size: 13px; color: var(--admin-muted); margin: 0; }
        .ad-banner { padding: 10px 14px; border-radius: 10px; font-size: 12.5px; font-weight: 600; }
        .ad-banner-error { background: rgba(232,98,42,.1); border: 1px solid rgba(232,98,42,.3); color: var(--brand); }

        .chat-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        .chat-layout.chat-show-detail .chat-list-panel { display: none; }
        .chat-layout:not(.chat-show-detail) .chat-detail-panel { display: none; }

        .chat-list-panel,
        .chat-detail-panel {
          background: var(--admin-bg2);
          border: 1px solid var(--admin-border);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-height: 420px;
        }

        .chat-list-head {
          padding: 14px 18px;
          border-bottom: 1px solid var(--admin-border);
          font-size: 10px; font-weight: 700;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--admin-muted);
        }
        .chat-list-body {
          flex: 1;
          overflow-y: auto;
        }
        .chat-list-item {
          display: flex;
          gap: 10px;
          width: 100%;
          text-align: left;
          padding: 14px 18px;
          background: transparent;
          border: 0;
          border-bottom: 1px solid var(--admin-border);
          border-left: 3px solid transparent;
          cursor: pointer;
          color: inherit;
          transition: background .15s, border-color .15s;
          font-family: var(--font-sans);
        }
        .chat-list-item:hover { background: rgba(255,255,255,.03); }
        .chat-list-item.is-active {
          background: rgba(232,98,42,.08);
          border-left-color: var(--brand);
        }
        .chat-item-avatar {
          width: 38px; height: 38px; flex-shrink: 0;
          background: var(--brand); color: #fff;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700;
        }
        .chat-item-info { flex: 1; min-width: 0; }
        .chat-item-name {
          font-size: 13px; font-weight: 700;
          color: var(--admin-text);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .chat-item-phone { font-size: 11.5px; color: var(--admin-muted); margin-top: 1px; }
        .chat-item-date { font-size: 10.5px; color: var(--admin-muted); opacity: .7; margin-top: 2px; }

        .chat-detail-empty {
          flex: 1;
          display: flex; align-items: center; justify-content: center;
          color: var(--admin-muted); font-size: 13px;
          padding: 20px; text-align: center;
        }
        .chat-detail-head {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 14px;
          border-bottom: 1px solid var(--admin-border);
        }
        .chat-back-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid var(--admin-border);
          color: var(--admin-text);
          font-size: 16px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .chat-detail-who { flex: 1; min-width: 0; }
        .chat-wa-btn {
          padding: 8px 12px;
          background: #25D366; color: #fff;
          border-radius: 8px;
          font-size: 11.5px; font-weight: 700;
          text-decoration: none;
          white-space: nowrap;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .chat-msg { display: flex; }
        .chat-msg.is-user { justify-content: flex-end; }
        .chat-msg.is-bot { justify-content: flex-start; }
        .chat-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .chat-msg.is-user .chat-bubble {
          background: var(--brand);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .chat-msg.is-bot .chat-bubble {
          background: rgba(255,255,255,.06);
          color: var(--admin-text);
          border-bottom-left-radius: 4px;
        }

        @media (min-width: 900px) {
          .chat-layout {
            grid-template-columns: 320px 1fr;
            gap: 16px;
          }
          .chat-layout.chat-show-detail .chat-list-panel { display: flex; }
          .chat-layout:not(.chat-show-detail) .chat-detail-panel { display: flex; }
          .chat-back-btn { display: none; }
          .chat-list-panel,
          .chat-detail-panel { min-height: 70vh; }
        }
      `}</style>
    </div>
  )
}