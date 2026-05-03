import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis do arquivo .env local
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Chave da IA — DeepSeek (compatível com OpenAI). Aceita vários nomes
  // pra simplificar configuração em diferentes ambientes (Vercel, local etc):
  //   API_KEY (preferencial — nome curto)
  //   DEEPSEEK_API_KEY
  //   VITE_API_KEY (para acesso via import.meta.env)
  //   GEMINI_API_KEY (compat com builds antigos)
  const API_KEY =
    env.API_KEY ||
    (process as any).env.API_KEY ||
    env.DEEPSEEK_API_KEY ||
    (process as any).env.DEEPSEEK_API_KEY ||
    env.VITE_API_KEY ||
    (process as any).env.VITE_API_KEY ||
    env.GEMINI_API_KEY ||
    (process as any).env.GEMINI_API_KEY ||
    env.VITE_GEMINI_API_KEY ||
    (process as any).env.VITE_GEMINI_API_KEY;

  return {
    plugins: [react()],
    base: './', // Use relative paths to be more flexible on Vercel/CDN
    define: {
      // Injeta a chave em build-time. O aiService lê de process.env.API_KEY.
      'process.env.API_KEY': JSON.stringify(API_KEY),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(API_KEY),
      // Mantém compat com código antigo que ainda referencia GEMINI_API_KEY
      'process.env.GEMINI_API_KEY': JSON.stringify(API_KEY),
      'process.browser': true,
    },
  };
});
