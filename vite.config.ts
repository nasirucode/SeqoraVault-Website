import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteOrigin = (env.VITE_SITE_URL || '').trim().replace(/\/$/, '')

  return {
    plugins: [
      react(),
      {
        name: 'social-meta-absolute-url',
        transformIndexHtml(html) {
          const imagePath = '/download-phone-mockup.svg'
          const ogImage = siteOrigin ? `${siteOrigin}${imagePath}` : imagePath
          const ogSiteUrl = siteOrigin ? `${siteOrigin}/` : '/'
          return html
            .replace(/__OG_IMAGE__/g, ogImage)
            .replace(/__OG_SITE_URL__/g, ogSiteUrl)
        },
      },
    ],
  }
})
