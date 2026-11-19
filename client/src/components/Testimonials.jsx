import API_URL from '../config/api'
import { useEffect, useState } from 'react'
import axios from 'axios'

const placeholder = [
  { _id: '1', name: 'Ahmed Khan', location: 'Peshawar', rating: 5, text: 'Our Umrah trip was perfectly organized. Every single detail was taken care of — we had complete peace of mind the entire journey.' },
  { _id: '2', name: 'Fatima Bibi', location: 'Nowshera', rating: 5, text: 'Kumrat Valley tour was breathtaking. The arrangements were flawless and the price was very reasonable. Highly recommend.' },
  { _id: '3', name: 'Tariq Mehmood', location: 'Peshawar', rating: 5, text: 'Dubai family package was excellent — visa processed quickly, hotel was fantastic, and the team was always reachable on WhatsApp.' },
]

export default function Testimonials() {
  const [reviews, setReviews] = useState(placeholder)

  useEffect(() => {
    axios.get(`${API_URL}/api/testimonials`)
      .then(r => { if (r.data.length > 0) setReviews(r.data) })
      .catch(() => {})
  }, [])

  return (
    <section style={{ background: 'var(--bg)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: '#E8622A', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Client stories</span>
        <h2 style={{ fontFamily: 'Lora,serif', fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, color: 'var(--text)', marginBottom: 56 }}>
          Real travellers.<br />Real journeys.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {reviews.slice(0, 3).map((r, i) => (
            <div key={r._id} style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: 16, padding: 32,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Quote mark */}
              <span style={{
                position: 'absolute', top: 16, right: 20,
                fontFamily: 'Georgia,serif', fontSize: 80,
                color: 'rgba(232,98,42,0.08)', lineHeight: 1,
                userSelect: 'none', pointerEvents: 'none',
              }}>"</span>

              <div style={{ color: '#E8622A', fontSize: 12, letterSpacing: 3, marginBottom: 18 }}>
                {'★'.repeat(r.rating)}
              </div>
              <p style={{
                fontFamily: 'Lora,serif', fontStyle: 'italic',
                fontSize: 13, color: 'var(--text2)',
                lineHeight: 1.8, marginBottom: 24,
              }}>
                "{r.text}"
              </p>
              {r.textUr && (
                <p style={{ fontFamily: 'Noto Nastaliq Urdu,serif', direction: 'rtl', color: 'var(--muted)', fontSize: 12, marginBottom: 20 }}>{r.textUr}</p>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <div style={{
                  width: 38, height: 38, background: '#E8622A',
                  borderRadius: '50%', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 15,
                  flexShrink: 0,
                }}>
                  {r.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{r.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


