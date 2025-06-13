import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/Flor_Do_Campo/',
  plugins: [
    tailwindcss(),
  ],
})