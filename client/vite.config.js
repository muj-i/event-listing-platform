import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/client/',  // This would break if the app is at the root.
  plugins: [react()],
});