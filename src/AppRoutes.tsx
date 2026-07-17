import { Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { SolutionsPage } from '@/pages/SolutionsPage'
import { SegmentsPage } from '@/pages/SegmentsPage'
import { ContactPage } from '@/pages/ContactPage'
import { ProductDetailPage } from '@/pages/detail/ProductDetailPage'
import { ServiceDetailPage } from '@/pages/detail/ServiceDetailPage'
import { SegmentDetailPage } from '@/pages/detail/SegmentDetailPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="a-auriun" element={<AboutPage />} />
        <Route path="solucoes" element={<SolutionsPage />} />
        <Route path="solucoes/produtos/:slug" element={<ProductDetailPage />} />
        <Route path="solucoes/servicos/:slug" element={<ServiceDetailPage />} />
        <Route path="segmentos" element={<SegmentsPage />} />
        <Route path="segmentos/:slug" element={<SegmentDetailPage />} />
        <Route path="contato" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
