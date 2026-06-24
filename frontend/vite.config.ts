import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'inject-lcp',
      enforce: 'post',
      transformIndexHtml(html) {
        return html
          .replace(
            '<link rel="preload" as="image" href="/guayafood-frame.webp">',
            '<link rel="preload" as="image" href="/guayafood-frame.webp" fetchpriority="high">',
          )
          .replace(
            '<div id="root"></div>',
            `<div id="root"><img src="/guayafood-frame.webp" alt="" style="width:100%;display:block;height:auto;aspect-ratio:640/292;background:#080808" /></div>`,
          )
      },
    },
  ],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react'
          if (id.includes('node_modules/framer-motion')) return 'vendor-framer'
          if (id.includes('node_modules/animejs')) return 'vendor-animejs'
        },
      },
    },
  },
})
