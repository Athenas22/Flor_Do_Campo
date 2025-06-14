import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  // Use relative paths for development and preview
  base: './',
  
  plugins: [
    tailwindcss(),
  ],
    build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        carrinho: resolve(__dirname, 'CartPage/carrinho.html'),
        checkout: resolve(__dirname, 'CheckoutPage/checkout.html'),
        login: resolve(__dirname, 'LoginPage/login.html'),
        produto: resolve(__dirname, 'ProductPage/produto.html')      }
    }
  }
})