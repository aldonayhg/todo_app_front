import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                //Backend local
                //target: 'http://localhost:8080',
                
                //backend publico
                target: 'todoappdeploy-production.up.railway.app',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
