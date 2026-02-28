import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
 
export default ({ mode }) => {
  // Load env variables based on mode (development/production)
  const env = loadEnv(mode, process.cwd(), '')
 
  // Use env variable for backend API or fallback to localhost:80
  const backendUrl = env.VITE_API_BASE_URL || 'http://localhost:80'
 
  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@pages': path.resolve(__dirname, 'src/pages'),
      },
    },
    server: {
      port: 5173,
      open: true,
      headers: {
        'Content-Security-Policy': `
          default-src 'self' ${backendUrl} http://localhost:5173 data: blob:;
          script-src 'self' 'unsafe-inline' http://localhost:5173;
          style-src 'self' 'unsafe-inline';
          img-src 'self' ${backendUrl} http://localhost:5173 data: blob:;
          font-src 'self' data:;
          connect-src 'self' ${backendUrl} http://localhost:5173 ws: wss:;
          frame-ancestors 'none';
        `.replace(/\s+/g, ' ').trim(),
        'Cross-Origin-Embedder-Policy': 'unsafe-none',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
      proxy: {
        '/uploads': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
    },
  })
}
