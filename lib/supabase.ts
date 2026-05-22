import { createClient, SupabaseClient } from '@supabase/supabase-js';

// =====================================================================
// Cliente Supabase — usado em todo o app
// =====================================================================
// Variáveis lidas do Vite (.env.local):
//   VITE_SUPABASE_URL         → URL do projeto (sem /rest/v1)
//   VITE_SUPABASE_ANON_KEY    → publishable / anon key
// =====================================================================

const rawUrl = (import.meta as any).env?.VITE_SUPABASE_URL as string | undefined;
const anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY as string | undefined;

// Aceita URL completa (com /rest/v1) e remove o sufixo se presente
const supabaseUrl = (rawUrl || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');

export const isSupabaseConfigured = Boolean(supabaseUrl && anonKey);

if (!isSupabaseConfigured) {
  console.error(
    '[Supabase] Variáveis de ambiente faltando. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local (e na Vercel).'
  );

  // Mostra erro visível na tela em vez de deixar o spinner travado
  if (typeof document !== 'undefined') {
    const showFatal = () => {
      const root = document.getElementById('root');
      if (!root) return;
      root.innerHTML = `
        <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0f172a;color:#fff;font-family:system-ui,sans-serif;padding:2rem">
          <div style="max-width:560px;background:#1e293b;border:1px solid #334155;border-radius:1.5rem;padding:2.5rem;text-align:left">
            <h1 style="margin:0 0 1rem;font-size:1.5rem;font-weight:900;color:#fbbf24">⚠️ Configuração do Supabase faltando</h1>
            <p style="color:#cbd5e1;line-height:1.6;margin:0 0 1.5rem">
              Defina estas variáveis de ambiente no servidor onde este app está hospedado e refaça o deploy:
            </p>
            <pre style="background:#0f172a;border:1px solid #334155;border-radius:.5rem;padding:1rem;color:#a5f3fc;font-size:.85rem;overflow-x:auto;margin:0 0 1rem"><code>VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
VITE_GEMINI_API_KEY=AQ.Ab8...</code></pre>
            <p style="color:#94a3b8;font-size:.85rem;margin:0;line-height:1.6">
              No Vercel: <strong>Settings → Environment Variables</strong> (Production + Preview + Development), depois <strong>Deployments → Redeploy</strong>.
            </p>
          </div>
        </div>`;
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showFatal);
    } else {
      showFatal();
    }
  }
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'portal-avaliacao-session',
    },
  }
);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleSupabaseError(error: unknown, operationType: OperationType, path: string | null) {
  const msg = error instanceof Error ? error.message : String(error);
  console.error(`[Supabase ${operationType}] ${path ?? '-'}: ${msg}`);
  throw new Error(msg);
}

/** Retorna o usuário atualmente autenticado (ou null). */
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
