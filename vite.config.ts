import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Dev proxy: route `/api/*` to TMDB. This avoids browser CORS by proxying requests
    // through the Vite dev server. In `tmdbApi.ts` set `VITE_USE_LOCAL_PROXY=true` to use `/api`.
    proxy: {
      '/api': {
        target: 'https://api.themoviedb.org',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/3'),
      },
    },
  },
});
