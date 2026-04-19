import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Force a single copy of React across all packages
    dedupe: ['react', 'react-dom', 'react-reconciler', '@react-three/fiber', '@react-three/drei'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@react-three/fiber', '@react-three/drei', 'three'],
  },
})
