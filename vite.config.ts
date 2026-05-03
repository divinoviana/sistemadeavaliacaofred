import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Chave da IA — DeepSeek (compatível com OpenAI)
  const API_KEY =
    env.API_KEY ||
    (process as any).env.API_KEY ||
    env.DEEPSEEK_API_KEY ||
    (process as any).env.DEEPSEEK_API_KEY ||
    env.VITE_API_KEY ||
    (process as any).env.VITE_API_KEY ||
    env.VITE_DEEPSEEK_API_KEY ||
    (process as any).env.VITE_DEEPSEEK_API_KEY ||
    env.GEMINI_API_KEY ||
    (process as any).env.GEMINI_API_KEY ||
    env.VITE_GEMINI_API_KEY ||
    (process as any).env.VITE_GEMINI_API_KEY ||
    '';

  if (mode === 'production') {
    if (API_KEY) {
      console.log(`[vite] ✅ API_KEY detectada (${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}) — IA habilitada no bundle.`);
    } else {
      console.warn('[vite] ⚠️  API_KEY NÃO encontrada nas envs. A IA estará desabilitada no bundle final.');
    }
  }

  return {
    plugins: [react()],
    base: './',
    define: {
      '__API_KEY__': JSON.stringify(API_KEY),
      '__DEEPSEEK_API_KEY__': JSON.stringify(API_KEY),
      'process.env.API_KEY': JSON.stringify(API_KEY),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(API_KEY),
      'process.browser': true,
    },
    build: {
      // Code splitting agressivo para acelerar a primeira tela
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('@supabase')) return 'vendor-supabase';
              if (id.includes('react-router')) return 'vendor-router';
              if (id.includes('react-dom') || id.includes('scheduler')) return 'vendor-react';
              if (id.includes('react/')) return 'vendor-react';
              if (id.includes('lucide-react')) return 'vendor-icons';
              if (id.includes('recharts') || id.includes('d3-')) return 'vendor-charts';
              if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('purify')) return 'vendor-pdf';
              return 'vendor-misc';
            }
            // Currículo (~360 KB de aulas hardcoded) só no chunk de aulas
            if (id.includes('/data_grade')) return 'data-curriculum';
            if (id.includes('/data_admin') || id.includes('/data_subjects') || id.includes('/data_helpers')) return 'data-meta';
            // Seed de alunos (46 KB) só usado uma vez no admin
            if (id.includes('/students_to_seed')) return 'data-seed';
          },
        },
      },
      // Aumenta o limite de aviso para os chunks ainda grandes (admin)
      chunkSizeWarningLimit: 800,
    },
  };
});
