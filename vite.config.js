import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react-vendor',
              test: /node_modules[\\/]react(?:-dom)?[\\/]/,
              priority: 10,
            },
            {
              name: 'motion-vendor',
              test: /node_modules[\\/](?:framer-motion|motion-dom|motion-utils)[\\/]/,
              priority: 9,
            },
            {
              name: 'icon-vendor',
              test: /node_modules[\\/]lucide-react[\\/]/,
              priority: 8,
            },
          ],
        },
      },
    },
  },
})
