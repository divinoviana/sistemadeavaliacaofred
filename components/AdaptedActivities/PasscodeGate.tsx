// =====================================================================
// PasscodeGate — proteção LGPD da página /atividades-adaptadas
// =====================================================================
// Por que existe:
//   Os dados de PEI são sensíveis (menores + diagnósticos clínicos).
//   A página é "pública" no sentido de NÃO exigir login com email/senha,
//   mas fica atrás de um passcode compartilhado entre a equipe pedagógica.
//
// Como funciona:
//   - O passcode "esperado" é injetado em build-time via VITE_ACCESS_PASSCODE
//     (Vercel: Settings → Environment Variables → escopo Production).
//   - Se a env var NÃO estiver definida, o gate fica DESATIVADO (modo dev).
//   - Quando o professor digita o passcode certo:
//       1) Salva no localStorage com expiração de 30 dias
//       2) O passcode é enviado em todo request /api/* via header x-passcode,
//          e o servidor valida contra ACCESS_PASSCODE (mesma env, sem prefix)
//
// Segurança:
//   - O passcode no bundle (VITE_*) é visível por inspeção. NÃO é segredo.
//   - A validação REAL acontece no SERVIDOR (api/generate-adapted-activity.ts),
//     que checa o header. Sem o passcode correto a IA não responde.
//   - Isto evita que a chave Anthropic seja explorada por terceiros.
// =====================================================================

import React, { useEffect, useState } from 'react';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'chsa.adapted.passcode.v1';
const STORAGE_EXP_KEY = 'chsa.adapted.passcode.exp.v1';
const DAYS_30 = 30 * 24 * 60 * 60 * 1000;

// Lê a env var em build-time. Fica vazia em dev → gate desligado.
function expectedPasscode(): string {
  try {
    const env = (import.meta as any).env || {};
    const v = env.VITE_ACCESS_PASSCODE;
    return typeof v === 'string' ? v.trim() : '';
  } catch {
    return '';
  }
}

/** Recupera o passcode salvo (se ainda válido). Public — usado pelo service. */
export function getStoredPasscode(): string | null {
  try {
    const exp = Number(localStorage.getItem(STORAGE_EXP_KEY) || '0');
    if (!exp || Date.now() > exp) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_EXP_KEY);
      return null;
    }
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storePasscode(p: string) {
  try {
    localStorage.setItem(STORAGE_KEY, p);
    localStorage.setItem(STORAGE_EXP_KEY, String(Date.now() + DAYS_30));
  } catch {}
}

function clearStoredPasscode() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_EXP_KEY);
}

interface Props { children: React.ReactNode }

export const PasscodeGate: React.FC<Props> = ({ children }) => {
  const expected = expectedPasscode();
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    if (!expected) return true; // sem env → gate off
    const stored = getStoredPasscode();
    return stored === expected;
  });
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Se a env mudar entre deploys e o stored ficou inválido, expira.
  useEffect(() => {
    if (!expected) return;
    const stored = getStoredPasscode();
    if (stored && stored !== expected) {
      clearStoredPasscode();
      setUnlocked(false);
    }
  }, [expected]);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === expected) {
      storePasscode(input.trim());
      setUnlocked(true);
      setError(null);
    } else {
      setError('Código incorreto. Solicite à coordenação pedagógica.');
    }
  };

  return (
    <div className="min-h-[80vh] bg-mesh-bg dark:bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-3xl bg-gradient-vibe shadow-glow-purple flex items-center justify-center">
            <Lock className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-2xl font-black text-center text-slate-900 dark:text-white font-display tracking-tight">
          Acesso restrito à equipe pedagógica
        </h1>
        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-2 mb-6">
          Esta página contém informações sensíveis dos <strong>PEIs</strong> de estudantes
          neurodivergentes. O acesso é compartilhado por código entre a coordenação,
          pedagogos e professores do Colégio Estadual Frederico José Pedreira Neto.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-1.5">
              Código de acesso
            </label>
            <input
              type="password"
              autoFocus
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Digite o código informado pela coordenação"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-vibe-purple"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm p-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!input.trim()}
            className="w-full px-6 py-3 rounded-xl bg-gradient-vibe text-white font-black uppercase tracking-widest text-sm shadow-glow-purple disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Entrar
          </button>
        </form>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mt-5 leading-relaxed">
          ⚖️ Conformidade LGPD · O código será lembrado neste navegador por 30 dias.
          <br />Não compartilhe fora da equipe escolar.
        </p>
      </div>
    </div>
  );
};
