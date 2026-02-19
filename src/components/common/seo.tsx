import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const SUPPORTED_LANGS = ['en', 'tr', 'pl'] as const

interface SEOProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: string
}

export function SEO({ title, description, path = '', image, type = 'website' }: SEOProps) {
  const { t, i18n } = useTranslation()
  
  const pageTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${t('site.tagline')}`
  const pageDescription = description || t('site.description')
  const pageUrl = `${SITE_URL}${path}`
  const pageImage = image || `${SITE_URL}/social-card.png`

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={pageUrl} />

      {/* hreflang alternates for each supported language */}
      {SUPPORTED_LANGS.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${pageUrl}${pageUrl.includes('?') ? '&' : '?'}lang=${lang}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={pageUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={i18n.language} />
      <meta name="theme-color" content="#e11d48" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      
      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'product' ? 'Product' : 'Organization',
          name: SITE_NAME,
          description: pageDescription,
          url: pageUrl,
          ...(type === 'product' ? {
            offers: {
              '@type': 'AggregateOffer',
              priceCurrency: 'USD',
              lowPrice: '25',
              highPrice: '90',
            }
          } : {
            logo: pageImage,
          }),
        })}
      </script>
    </Helmet>
  )
}
