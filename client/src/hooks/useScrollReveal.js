import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollReveal() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal:not(.in)')
      if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('in'))
        return
      }
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in')
              io.unobserve(e.target)
            }
          })
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
      )
      els.forEach(el => io.observe(el))
      return () => io.disconnect()
    }, 60)

    return () => clearTimeout(timer)
  }, [pathname])
}