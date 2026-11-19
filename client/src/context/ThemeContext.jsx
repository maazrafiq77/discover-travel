import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : true // dark by default
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    document.documentElement.style.setProperty('--admin-bg', dark ? '#0f1117' : '#f0f4f8')
    document.documentElement.style.setProperty('--admin-bg2', dark ? '#1a1d27' : '#ffffff')
    document.documentElement.style.setProperty('--admin-text', dark ? '#ffffff' : '#111210')
    document.documentElement.style.setProperty('--admin-muted', dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.5)')
    document.documentElement.style.setProperty('--admin-border', dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)')
    document.documentElement.style.setProperty('--admin-inp', dark ? '#1a1d27' : '#f5f5f5')
    document.documentElement.style.setProperty('--admin-inp-text', dark ? '#ffffff' : '#111210')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

