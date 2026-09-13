import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), {
    name: 'gam-social-metadata',
    transformIndexHtml() {
      const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
      const origin = process.env.SITE_URL || (host ? `https://${host}` : 'http://localhost:5173')
      const image = new URL('/social-preview.png', origin).href
      return [
        { tag: 'meta', attrs: { property: 'og:image', content: image } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: image } },
        { tag: 'meta', attrs: { property: 'og:url', content: new URL('/', origin).href } },
      ]
    },
  }],
})
