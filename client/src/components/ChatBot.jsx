import API_URL from '../config/api'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const WaIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
)

const SendIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
)

const ChatIcon = () => (
  <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
)

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
)

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Assalam o Alaikum! 👋 I'm your Discover Travel assistant. How can I help you today?\n\nI can help with:\n• Tour packages & prices\n• Hajj & Umrah packages\n• Visa information\n• Flight & hotel bookings",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [customerInfo, setCustomerInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('chat_customer')
      return saved ? JSON.parse(saved) : { name: '', phone: '' }
    } catch {
      return { name: '', phone: '' }
    }
  })
  const [showInfo, setShowInfo] = useState(false)
  const [showBadge, setShowBadge] = useState(() => {
    try {
      return !localStorage.getItem('chat_badge_dismissed')
    } catch {
      return true
    }
  })
  const messagesEndRef = useRef(null)

  // Auto-scroll on new message / loading change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Escape closes chat
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Lock body scroll on mobile while open
  useEffect(() => {
    if (!open) return
    if (!window.matchMedia('(max-width: 959px)').matches) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Dismiss badge permanently after first open
  useEffect(() => {
    if (open && showBadge) {
      try {
        localStorage.setItem('chat_badge_dismissed', '1')
      } catch {}
      setShowBadge(false)
    }
  }, [open, showBadge])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]

    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      let currentSessionId = sessionId

      if (!currentSessionId) {
        const sessionRes = await axios.post(`${API_URL}/api/chat/session`, {
          customerName: customerInfo.name || '',
          customerPhone: customerInfo.phone || '',
          messages: [],
        })
        currentSessionId = sessionRes.data._id
        setSessionId(currentSessionId)
      }

      const res = await axios.post(`${API_URL}/api/chat/message`, {
        messages: newMessages,
        sessionId: currentSessionId,
      })

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: res.data.reply },
      ])
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting. Please WhatsApp us directly at +92 343 934 3482.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleInfoSubmit = async () => {
    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) return

    try {
      localStorage.setItem('chat_customer', JSON.stringify(customerInfo))
    } catch {}

    if (!sessionId) {
      try {
        const res = await axios.post(`${API_URL}/api/chat/session`, {
          customerName: customerInfo.name,
          customerPhone: customerInfo.phone,
          messages: [],
        })
        setSessionId(res.data._id)
      } catch {}
    }

    setShowInfo(false)
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: `Thank you ${customerInfo.name}! 😊 How can I help you today? Feel free to ask about our tour packages, Hajj & Umrah, visa or anything else.`,
      },
    ])
  }

  const openWhatsApp = () => {
    const lastUserMsg =
      messages.filter((m) => m.role === 'user').slice(-1)[0]?.content || ''
    const lines = ['Assalam o Alaikum!']
    if (customerInfo.name) lines.push(`Name: ${customerInfo.name}`)
    if (customerInfo.phone) lines.push(`Phone: ${customerInfo.phone}`)
    if (lastUserMsg) lines.push(`Enquiry: ${lastUserMsg}`)
    window.open(
      `https://wa.me/923439343482?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank'
    )
  }

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </button>

      {!open && showBadge && (
        <div className="chat-badge">💬 Need help? Chat with us!</div>
      )}

      {open && (
        <div className="chat-window" role="dialog" aria-label="Chat assistant">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">🤖</div>
              <div style={{ minWidth: 0 }}>
                <div className="chat-title">Discover AI Assistant</div>
                <div className="chat-status">
                  <span className="chat-status-dot" />
                  Online — replies instantly
                </div>
              </div>
            </div>
            <div className="chat-header-actions">
              {messages.length <= 1 && !showInfo && !customerInfo.name && (
                <button
                  className="chat-icon-btn"
                  onClick={() => setShowInfo(true)}
                  aria-label="Share contact info"
                  title="Share contact info"
                >
                  <InfoIcon />
                </button>
              )}
              <button
                className="chat-icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Info form (only reachable when session hasn't started) */}
          {showInfo && (
            <div className="chat-info-form">
              <p className="chat-info-intro">
                Share your contact info so we can follow up on WhatsApp if needed:
              </p>
              <input
                className="chat-input"
                type="text"
                placeholder="Your name"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
              />
              <input
                className="chat-input"
                type="tel"
                placeholder="Phone (WhatsApp)"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
              />
              <div className="chat-info-actions">
                <button
                  className="chat-btn chat-btn-primary"
                  onClick={handleInfoSubmit}
                >
                  Save
                </button>
                <button
                  className="chat-btn chat-btn-ghost"
                  onClick={() => setShowInfo(false)}
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg chat-msg-${m.role}`}>
                {m.role === 'assistant' && (
                  <div className="chat-msg-avatar">🤖</div>
                )}
                <div className="chat-bubble">{m.content}</div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg chat-msg-assistant">
                <div className="chat-msg-avatar">🤖</div>
                <div className="chat-bubble chat-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div className="chat-quick">
              {['Umrah Package', 'Domestic Tours', 'Dubai Package', 'Visa Info'].map(
                (q) => (
                  <button
                    key={q}
                    className="chat-quick-btn"
                    onClick={() => setInput(q)}
                  >
                    {q}
                  </button>
                )
              )}
            </div>
          )}

          {/* Input */}
          <div className="chat-input-area">
            <input
              className="chat-text-input"
              type="text"
              placeholder="Ask about tours, visa, Umrah..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              className={`chat-send${input.trim() ? ' is-ready' : ''}`}
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>

          {/* Footer */}
          <div className="chat-footer">
            <button className="chat-wa-link" onClick={openWhatsApp}>
              <WaIcon /> Talk to a human on WhatsApp
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* ===== Bubble ===== */
        .chat-fab {
          position: fixed;
          right: 16px;
          bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + 86px);
          width: 54px;
          height: 54px;
          background: var(--brand);
          color: #fff;
          border: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 998;
          box-shadow: 0 6px 20px rgba(232, 98, 42, 0.4);
          transition: transform .2s var(--ease), box-shadow .2s var(--ease);
          -webkit-tap-highlight-color: transparent;
        }
        .chat-fab:hover { box-shadow: 0 10px 28px rgba(232, 98, 42, 0.5); }
        .chat-fab:active { transform: scale(0.94); }

        /* ===== Badge ===== */
        .chat-badge {
          position: fixed;
          right: 16px;
          bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + 146px);
          z-index: 997;
          background: var(--brand);
          color: #fff;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-sans);
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(232, 98, 42, 0.4);
          animation: chat-pulse 2s ease-in-out infinite;
          pointer-events: none;
        }

        /* ===== Window ===== */
        .chat-window {
          position: fixed;
          top: calc(var(--nav-h-mobile) + 12px);
          left: 12px;
          right: 12px;
          bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + 12px);
          z-index: 998;
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: var(--font-sans);
          animation: chat-slide-up .28s var(--ease);
        }

        /* ===== Header ===== */
        .chat-header {
          background: var(--brand);
          color: #fff;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          flex-shrink: 0;
        }
        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .chat-avatar {
          width: 38px;
          height: 38px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .chat-title {
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .chat-status {
          font-size: 10.5px;
          color: rgba(255, 255, 255, 0.85);
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .chat-status-dot {
          width: 7px;
          height: 7px;
          background: #4ade80;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .chat-header-actions {
          display: flex;
          gap: 4px;
          flex-shrink: 0;
        }
        .chat-icon-btn {
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.15);
          border: 0;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .2s;
          -webkit-tap-highlight-color: transparent;
        }
        .chat-icon-btn:hover { background: rgba(255, 255, 255, 0.28); }
        .chat-icon-btn:active { transform: scale(0.94); }

        /* ===== Info form ===== */
        .chat-info-form {
          padding: 14px;
          background: color-mix(in srgb, var(--brand) 6%, transparent);
          border-bottom: 1px solid var(--border);
          flex-shrink: 0;
        }
        .chat-info-intro {
          font-size: 12px;
          color: var(--text);
          margin: 0 0 10px;
          line-height: 1.5;
        }
        .chat-input {
          width: 100%;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 9px 12px;
          font-size: 13px;
          color: var(--text);
          font-family: var(--font-sans);
          outline: none;
          margin-bottom: 8px;
          transition: border-color .2s;
        }
        .chat-input:focus { border-color: var(--brand); }
        .chat-info-actions {
          display: flex;
          gap: 8px;
        }
        .chat-btn {
          flex: 1;
          min-height: 38px;
          border: 0;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          font-family: var(--font-sans);
          cursor: pointer;
          transition: all .2s;
        }
        .chat-btn-primary { background: var(--brand); color: #fff; }
        .chat-btn-primary:hover { background: var(--brand-2); }
        .chat-btn-ghost {
          background: var(--bg3);
          color: var(--muted);
          border: 1px solid var(--border);
        }
        .chat-btn-ghost:hover { color: var(--text); }

        /* ===== Messages ===== */
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overscroll-behavior: contain;
        }
        .chat-msg {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .chat-msg-user { justify-content: flex-end; }
        .chat-msg-avatar {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          background: var(--brand);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }
        .chat-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 12.5px;
          line-height: 1.6;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .chat-msg-user .chat-bubble {
          background: var(--brand);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .chat-msg-assistant .chat-bubble {
          background: var(--bg3);
          color: var(--text);
          border-bottom-left-radius: 4px;
        }
        .chat-typing {
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .chat-typing span {
          width: 6px;
          height: 6px;
          background: var(--brand);
          border-radius: 50%;
          animation: chat-bounce 1.2s ease-in-out infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: .2s; }
        .chat-typing span:nth-child(3) { animation-delay: .4s; }

        /* ===== Quick replies ===== */
        .chat-quick {
          padding: 0 14px 10px;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .chat-quick-btn {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 5px 10px;
          font-size: 11px;
          color: var(--text);
          cursor: pointer;
          font-family: var(--font-sans);
          font-weight: 600;
          transition: all .2s;
        }
        .chat-quick-btn:hover {
          background: var(--brand);
          color: #fff;
          border-color: var(--brand);
        }

        /* ===== Input ===== */
        .chat-input-area {
          padding: 10px 14px;
          border-top: 1px solid var(--border);
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }
        .chat-text-input {
          flex: 1;
          min-width: 0;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          color: var(--text);
          font-family: var(--font-sans);
          outline: none;
          transition: border-color .2s;
        }
        .chat-text-input:focus { border-color: var(--brand); }
        .chat-send {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          background: var(--bg3);
          color: var(--muted);
          border: 0;
          border-radius: 10px;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .2s;
        }
        .chat-send.is-ready {
          background: var(--brand);
          color: #fff;
          cursor: pointer;
        }
        .chat-send.is-ready:hover { background: var(--brand-2); }
        .chat-send.is-ready:active { transform: scale(0.94); }

        /* ===== Footer ===== */
        .chat-footer {
          padding: 0 14px 10px;
          text-align: center;
          flex-shrink: 0;
        }
        .chat-wa-link {
          background: transparent;
          border: 0;
          color: var(--muted);
          font-size: 11px;
          font-family: var(--font-sans);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px;
          transition: color .2s;
        }
        .chat-wa-link:hover { color: var(--brand); }

        /* ===== Animations ===== */
        @keyframes chat-slide-up {
          from { transform: translateY(16px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes chat-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        @keyframes chat-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* ===== Desktop ===== */
        @media (min-width: 960px) {
          .chat-fab {
            right: 24px;
            bottom: 96px;
            width: 56px;
            height: 56px;
          }
          .chat-badge {
            right: 20px;
            bottom: 160px;
          }
          .chat-window {
            top: auto;
            left: auto;
            right: 24px;
            bottom: 96px;
            width: 380px;
            height: min(560px, calc(100vh - 200px));
            border-radius: 20px;
          }
        }

        /* ===== Small phones ===== */
        @media (max-width: 380px) {
          .chat-window {
            top: calc(var(--nav-h-mobile) + 8px);
            left: 8px;
            right: 8px;
            bottom: calc(var(--bottom-nav-h) + env(safe-area-inset-bottom, 0px) + 8px);
            border-radius: 12px;
          }
          .chat-header { padding: 10px 12px; }
          .chat-avatar { width: 32px; height: 32px; font-size: 15px; }
          .chat-title { font-size: 12px; }
          .chat-status { font-size: 9.5px; }
        }

        /* ===== Reduced motion ===== */
        @media (prefers-reduced-motion: reduce) {
          .chat-window { animation: none; }
          .chat-badge { animation: none; }
          .chat-typing span { animation: none; }
        }
      `}</style>
    </>
  )
}