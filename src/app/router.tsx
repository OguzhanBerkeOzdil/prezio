import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './layout'
import loadingData from '@/assets/lottie/loading.json'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/home'))
const BuilderPage = lazy(() => import('@/pages/builder'))
const CatalogPage = lazy(() => import('@/pages/catalog'))
const PricingPage = lazy(() => import('@/pages/pricing'))
const AboutPage = lazy(() => import('@/pages/about'))
const FAQPage = lazy(() => import('@/pages/faq'))
const ContactPage = lazy(() => import('@/pages/contact'))
const ProfilePage = lazy(() => import('@/pages/profile'))
const PrivacyPage = lazy(() => import('@/pages/privacy'))
const TermsPage = lazy(() => import('@/pages/terms'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))

const LottiePlayer = lazy(() => import('lottie-react'))

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Suspense fallback={<div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />}>
          <LottiePlayer animationData={loadingData} loop autoplay className="w-24 h-24" />
        </Suspense>
      </div>
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="builder" element={<BuilderPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
