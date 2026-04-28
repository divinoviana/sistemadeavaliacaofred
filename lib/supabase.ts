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

if (!supabaseUrl || !anonKey) {
  console.error(
    '[Supabase] Variáveis de ambiente faltando. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local (e na Vercel).'
  );
}

export const supabase: SupabaseClient = createClient(supabaseUrl, anonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'chsa-auth-session',
  },
});

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
