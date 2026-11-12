import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the app from /trace-iv/. Override with BASE=/ for other hosts.
export default defineConfig({
  base: process.env.BASE ?? '/trace-iv/',
  plugins: [react(), tailwindcss()],
})
