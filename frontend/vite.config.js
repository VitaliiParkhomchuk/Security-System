import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Робить сервер доступним у локальній мережі
    port: 5173, // Можна змінити порт, якщо потрібно
  },
});
