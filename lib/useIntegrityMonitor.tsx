import { useState, useEffect, useCallback, useRef } from 'react';

export interface IntegrityData {
  tab_switches: number;
  paste_attempts: number;
  extension_detected: boolean;
  programmatic_inputs: number;
  suspicion_level: 'clean' | 'low' | 'medium' | 'high';
}

// Globals injetados por Violentmonkey, Tampermonkey, Greasemonkey e similares
const EXTENSION_GLOBALS = [
  'GM', 'GM_info', 'GM_getValue', 'GM_setValue', 'GM_deleteValue',
  'GM_listValues', 'GM_xmlhttpRequest', 'GM_openInTab', 'GM_notification',
  'GM_setClipboard', 'GM_getResourceText', 'GM_addStyle',
  'unsafeWindow', 'cloneInto', 'exportFunction',
];

function detectExtension(): boolean {
  return EXTENSION_GLOBALS.some(g => g in window);
}

export function useIntegrityMonitor(active: boolean) {
  const [tabSwitches, setTabSwitches] = useState(0);
  const [pasteAttempts, setPasteAttempts] = useState(0);
  const [extensionDetected, setExtensionDetected] = useState(false);
  const [programmaticInputs, setProgrammaticInputs] = useState(0);

  // Timestamp da última tecla pressionada em qualquer textarea monitorada
  const lastKeystrokeRef = useRef<number>(0);

  // Detecta extensões no mount e periodicamente (algumas carregam de forma lazy)
  useEffect(() => {
    if (!active) return;
    const check = () => { if (detectExtension()) setExtensionDetected(true); };
    check();
    const id = setInterval(check, 1500);
    return () => clearInterval(id);
  }, [active]);

  // Saídas de aba/janela
  useEffect(() => {
    if (!active) return;
    const onVis = () => { if (document.visibilityState === 'hidden') setTabSwitches(n => n + 1); };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [active]);

  // Chama nas textareas monitoradas para registrar digitação real
  const handleKeyDown = useCallback(() => {
    lastKeystrokeRef.current = Date.now();
  }, []);

  // Bloqueia paste e conta a tentativa
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    setPasteAttempts(n => n + 1);
  }, []);

  // Detecta injeção programática: texto longo apareceu sem digitação recente
  const handleInput = useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
    const ev = e.nativeEvent as InputEvent;
    const msSinceLastKey = Date.now() - lastKeystrokeRef.current;
    const charsAdded = ev.data?.length ?? 0;
    // > 40 chars inseridos de uma vez sem tecla recente (< 300 ms) = provável injeção
    if (charsAdded > 40 && msSinceLastKey > 300) {
      setProgrammaticInputs(n => n + 1);
    }
  }, []);

  const suspicionLevel = (): 'clean' | 'low' | 'medium' | 'high' => {
    let score = 0;
    if (extensionDetected) score += 5;
    if (programmaticInputs >= 2) score += 4;
    else if (programmaticInputs === 1) score += 3;
    if (pasteAttempts >= 3) score += 2;
    else if (pasteAttempts > 0) score += 1;
    if (tabSwitches >= 4) score += 2;
    else if (tabSwitches > 0) score += 1;
    if (score >= 6) return 'high';
    if (score >= 4) return 'medium';
    if (score >= 1) return 'low';
    return 'clean';
  };

  const getIntegrityData = (): IntegrityData => ({
    tab_switches: tabSwitches,
    paste_attempts: pasteAttempts,
    extension_detected: extensionDetected,
    programmatic_inputs: programmaticInputs,
    suspicion_level: suspicionLevel(),
  });

  return {
    tabSwitches,
    pasteAttempts,
    extensionDetected,
    programmaticInputs,
    suspicionLevel: suspicionLevel(),
    handleKeyDown,
    handlePaste,
    handleInput,
    getIntegrityData,
  };
}

export function SuspicionBadge({ level }: { level: IntegrityData['suspicion_level'] }) {
  if (level === 'clean') return null;
  const cfg = {
    low:    { color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',  label: '⚠️ Atividade suspeita (baixa)' },
    medium: { color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300', label: '🚨 Atividade suspeita (média)' },
    high:   { color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',         label: '🔴 Alta suspeita de uso de IA / extensão' },
  }[level];
  return (
    <span className={`inline-flex items-center gap-1 ${cfg.color} px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest`}>
      {cfg.label}
    </span>
  );
}
