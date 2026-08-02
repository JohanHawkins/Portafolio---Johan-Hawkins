import { useEffect } from 'react'

const SITE_URL = import.meta.env.VITE_SITE_URL as string | undefined

interface SEOOptions {
  title?: string
  description?: string
}

function setName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function absolutize(path: string): string {
  return SITE_URL ? new URL(path, SITE_URL).toString() : path
}

export function useSEO({ title, description }: SEOOptions) {
  useEffect(() => {
    if (title) {
      document.title = title
      setProperty('og:title', title)
      setName('twitter:title', title)
    }
    if (description) {
      setName('description', description)
      setProperty('og:description', description)
      setName('twitter:description', description)
    }
  }, [title, description])

  useEffect(() => {
    if (!SITE_URL) return
    const canonical =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    canonical?.setAttribute('href', new URL('/', SITE_URL).toString())
    setProperty('og:url', new URL('/', SITE_URL).toString())
    setProperty('og:image', absolutize('/projects/portafolio/V1.webp'))
    setName('twitter:image', absolutize('/projects/portafolio/V1.webp'))
  }, [])
}
