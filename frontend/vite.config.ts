import react from '@vitejs/plugin-react';
import { createProxyMiddleware } from 'http-proxy-middleware';

export default {
  plugins: [react()],
  server: {
    middleware: {
      '/api': createProxyMiddleware({
        target: 'http://localhost:5000/api',
        changeOrigin: true
      })
    }
  }
};
