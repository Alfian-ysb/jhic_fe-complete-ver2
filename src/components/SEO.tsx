import { useEffect } from 'react'

type SEOProps = {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  noIndex?: boolean
}

// Lightweight SEO component without external libs
export function SEO({ title, description, keywords, ogImage, noIndex }: SEOProps) {
  useEffect(() => {
    if (title) document.title = title

    const ensureMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
      if (!content) return
      let el = document.head.querySelector<HTMLMetaElement>(`${selector}[${attr}='${key}']`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    if (description) ensureMeta('meta', 'name', 'description', description)
    if (keywords) ensureMeta('meta', 'name', 'keywords', keywords)

    // OG/Twitter
    if (title) ensureMeta('meta', 'property', 'og:title', title)
    if (description) ensureMeta('meta', 'property', 'og:description', description)
    if (ogImage) ensureMeta('meta', 'property', 'og:image', ogImage)
    if (title) ensureMeta('meta', 'name', 'twitter:title', title)
    if (description) ensureMeta('meta', 'name', 'twitter:description', description)
    if (ogImage) ensureMeta('meta', 'name', 'twitter:image', ogImage)

    // Robots
    if (noIndex) {
      ensureMeta('meta', 'name', 'robots', 'noindex, nofollow')
    }
  }, [title, description, keywords, ogImage, noIndex])

  return null
}

// Default site-wide SEO, can be used in App.tsx once
export function DefaultSEO() {
  return (
    <SEO
      title="SMKN 1 Bantul"
      description="SMK Negeri 1 Bantul adalah sekolah menengah kejuruan terkemuka di Yogyakarta yang menyediakan pendidikan berkualitas dengan berbagai program keahlian."
      keywords="SMK Negeri 1 Bantul, Pendidikan, Sekolah, Bantul, Yogyakarta, Lentera Karya, SabaQuiz, Karya, Quiz, Skansaba"
      ogImage="/images/prestasi1.png"
    />
  )
}
