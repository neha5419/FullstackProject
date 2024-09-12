import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://nehaapi.onrender.com/api/users',
        changeOrigin: true,
        secure: false,  // Use true if the API has an SSL certificate
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
