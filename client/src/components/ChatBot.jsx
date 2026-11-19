import API_URL from '../config/api'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const WaIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.523 5.84L.057 23.428a.75.75 0 0 0 .921.921l5.588-1.466A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.724 9.724 0 0 1-4.964-1.362l-.355-.213-3.32.871.887-3.235-.233-.374A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
  </svg>
)

const SendIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
)

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Assalam o Alaikum! 👋 I\'m your Discover Travel assistant. How can I help you today?\n\nI can help with:\n• Tour packages & prices\n• Hajj & Umrah packages\n• Visa information\n• Flight & hotel bookings',
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '' })
  const [showInfo, setShowInfo] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const createSession = async (name, phone) => {
    try {
      const res = await axios.post(`${API_URL}/api/chat/session`, {
        customerName: name,
        customerPhone: phone,
        messages: [],
      })
      setSessionId(res.data._id)
      return res.data._id
    } catch {}
  }

 
const sendMessage = async () => {
  if (!input.trim() || loading) return

  const userMsg = { role: 'user', content: input.trim() }
  const newMessages = [...messages, userMsg]

  setMessages(newMessages)
  setInput('')
  setLoading(true)

  try {
    // Create a session automatically for new conversations
    let currentSessionId = sessionId

    if (!currentSessionId) {
      const sessionRes = await axios.post(
        `${API_URL}/api/chat/session`,
        {
          customerName: '',
          customerPhone: '',
          messages: []
        }
      )

      currentSessionId = sessionRes.data._id
      setSessionId(currentSessionId)
    }

    // Send message with session ID
    const res = await axios.post(
      `${API_URL}/api/chat/message`,
      {
        messages: newMessages,
        sessionId: currentSessionId
      }
    )

    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: res.data.reply }
    ])

  } catch (err) {
    console.error('Chat error:', err)

    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please WhatsApp us directly at +92 343 934 3482.'
      }
    ])
  }

  setLoading(false)
}


  const handleInfoSubmit = async () => {
    if (!customerInfo.name || !customerInfo.phone) return
    const id = await createSession(customerInfo.name, customerInfo.phone)
    setShowInfo(false)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Thank you ${customerInfo.name}! 😊 How can I help you today? Feel free to ask about our tour packages, Hajj & Umrah, visa or anything else.`
    }])
  }

  const openWhatsApp = () => {
    const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || ''
    const msg = `Assalam o Alaikum!\nName: ${customerInfo.name || 'Customer'}\nPhone: ${customerInfo.phone || ''}\nEnquiry: ${lastUserMsg}`
    window.open(`https://wa.me/923439343482?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 999,
          width: 52, height: 52, background: '#E8622A',
          borderRadius: '50%', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(232,98,42,0.4)',
          transition: 'all 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
        }}
      >
        {open
          ? <svg width="20" height="20" fill="#fff" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          : <svg width="22" height="22" fill="#fff" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
        }
      </button>

      {/* Notification badge */}
      {!open && (
        <div style={{
          position: 'fixed', bottom: 132, right: 20, zIndex: 998,
          background: '#E8622A', color: '#fff', borderRadius: 20,
          padding: '6px 12px', fontSize: 11, fontWeight: 700,
          boxShadow: '0 4px 12px rgba(232,98,42,0.4)',
          fontFamily: 'Montserrat,sans-serif', whiteSpace: 'nowrap',
          animation: 'pulse 2s infinite',
        }}>
          💬 Need help? Chat with us!
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 998,
          width: 360, height: 520,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'Montserrat,sans-serif',
          animation: 'slideUp 0.3s ease',
        }}>

          {/* Header */}
          <div style={{
            background: '#E8622A', padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 18,
              }}>🤖</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>Discover AI Assistant</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <div style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%' }} />
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', margin: 0 }}>Online — replies instantly</p>
                </div>
              </div>
            </div>
            <button
              onClick={openWhatsApp}
              style={{
                background: 'rgba(255,255,255,0.2)', border: 'none',
                borderRadius: 8, padding: '6px 10px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                color: '#fff', fontSize: 11, fontWeight: 600,
                fontFamily: 'Montserrat,sans-serif',
              }}
            >
              <WaIcon /> WhatsApp
            </button>
          </div>

          {/* Customer info form */}
          {showInfo && (
            <div style={{ padding: 16, background: 'rgba(232,98,42,0.05)', borderBottom: '1px solid var(--border)' }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>
                Please share your details so we can assist you better:
              </p>
              <input
                type="text" placeholder="Your Name"
                style={{
                  width: '100%', background: 'var(--bg)', border: '1.5px solid var(--border)',
                  borderRadius: 8, padding: '9px 12px', fontSize: 12,
                  color: 'var(--text)', fontFamily: 'Montserrat,sans-serif',
                  outline: 'none', marginBottom: 8,
                }}
                value={customerInfo.name}
                onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
              />
              <input
                type="tel" placeholder="Phone Number (WhatsApp)"
                style={{
                  width: '100%', background: 'var(--bg)', border: '1.5px solid var(--border)',
                  borderRadius: 8, padding: '9px 12px', fontSize: 12,
                  color: 'var(--text)', fontFamily: 'Montserrat,sans-serif',
                  outline: 'none', marginBottom: 8,
                }}
                value={customerInfo.phone}
                onChange={e => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleInfoSubmit}
                  style={{
                    flex: 1, background: '#E8622A', color: '#fff', border: 'none',
                    borderRadius: 8, padding: '9px', fontSize: 12, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'Montserrat,sans-serif',
                  }}
                >
                  Start Chat
                </button>
                <button
                  onClick={() => setShowInfo(false)}
                  style={{
                    background: 'var(--bg3)', color: 'var(--muted)', border: '1px solid var(--border)',
                    borderRadius: 8, padding: '9px 14px', fontSize: 12,
                    cursor: 'pointer', fontFamily: 'Montserrat,sans-serif',
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                {m.role === 'assistant' && (
                  <div style={{
                    width: 28, height: 28, background: '#E8622A', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0, marginRight: 8, alignSelf: 'flex-end',
                  }}>🤖</div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  fontSize: 12, lineHeight: 1.6,
                  background: m.role === 'user' ? '#E8622A' : 'var(--bg3)',
                  color: m.role === 'user' ? '#fff' : 'var(--text)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ width: 28, height: 28, background: '#E8622A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>🤖</div>
                <div style={{ background: 'var(--bg3)', borderRadius: '16px 16px 16px 4px', padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{
                        width: 6, height: 6, background: '#E8622A', borderRadius: '50%',
                        animation: `bounce 1.2s ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 16px 10px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Umrah Package', 'Domestic Tours', 'Dubai Package', 'Visa Info'].map(q => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  style={{
                    background: 'var(--bg3)', border: '1px solid var(--border)',
                    borderRadius: 20, padding: '5px 10px', fontSize: 11,
                    color: 'var(--text)', cursor: 'pointer',
                    fontFamily: 'Montserrat,sans-serif', fontWeight: 600,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E8622A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#E8622A' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg3)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--border)',
            display: 'flex', gap: 8,
          }}>
            <input
              type="text"
              placeholder="Ask about tours, visa, Umrah..."
              style={{
                flex: 1, background: 'var(--bg)',
                border: '1.5px solid var(--border)',
                borderRadius: 10, padding: '10px 14px',
                fontSize: 12, color: 'var(--text)',
                fontFamily: 'Montserrat,sans-serif', outline: 'none',
                transition: 'border 0.2s',
              }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              onFocus={e => e.target.style.borderColor = '#E8622A'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: 40, height: 40, background: input.trim() ? '#E8622A' : 'var(--bg3)',
                border: 'none', borderRadius: 10, cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s', flexShrink: 0,
                color: input.trim() ? '#fff' : 'var(--muted)',
              }}
            >
              <SendIcon />
            </button>
          </div>

          {/* Footer */}
          <div style={{ padding: '8px 16px 12px', textAlign: 'center' }}>
            <button
              onClick={openWhatsApp}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                fontSize: 11, color: 'var(--muted)', fontFamily: 'Montserrat,sans-serif',
                display: 'flex', alignItems: 'center', gap: 4, margin: '0 auto',
              }}
            >
              <WaIcon /> Talk to a human on WhatsApp
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </>
  )
}


