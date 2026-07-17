import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { useScrollToHash } from '@/hooks/useScrollToHash'

export function Layout() {
  useScrollToHash()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main
        className={isHome ? 'flex-1' : 'flex-1'}
        style={isHome ? undefined : { paddingTop: 'var(--site-header-h)' }}
      >
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
