import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis do arquivo .env local
  const env = loadEnv(mode, (process as any).cwd(), '');

  // Chave da IA — DeepSeek (compatível com OpenAI). Aceita vários nomes:
  //   API_KEY (preferencial — nome curto)
  //   DEEPSEEK_API_KEY
  //   VITE_API_KEY  /  VITE_DEEPSEEK_API_KEY
  //   GEMINI_API_KEY  /  VITE_GEMINI_API_KEY (compat com builds antigos)
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

  // Aviso visível no log de build pra detectar problema cedo
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
      // Constantes globais — caminho mais robusto, o Vite substitui literalmente
      '__API_KEY__': JSON.stringify(API_KEY),
      '__DEEPSEEK_API_KEY__': JSON.stringify(API_KEY),
      // process.env.* — caminho legado mantido para compatibilidade
      'process.env.API_KEY': JSON.stringify(API_KEY),
      'process.env.DEEPSEEK_API_KEY': JSON.stringify(API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(API_KEY),
      'process.browser': true,
    },
  };
});
