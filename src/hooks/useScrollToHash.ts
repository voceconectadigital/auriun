import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll para âncoras (#contato, #segmentos) após navegação SPA. */
export function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = hash.replace('#', '')
    const run = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const t = window.setTimeout(run, 50)
    return () => window.clearTimeout(t)
  }, [pathname, hash])
}
