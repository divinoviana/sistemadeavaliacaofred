// =====================================================================
// BlocksRenderer — renderiza um array de StudentBlock
// =====================================================================

import React from 'react';
import { StudentBlock } from '../../services/adaptedActivityService';
import { WordSearchGrid } from './WordSearchGrid';
import { CrosswordGrid } from './CrosswordGrid';

interface Props {
  blocks: StudentBlock[];
  /** Modo de impressão: estilos mais sóbrios, sem cor de fundo. */
  printMode?: boolean;
  /** Mostrar gabarito de cruzadas/caça-palavras. */
  showAnswers?: boolean;
}

const BlockTitle: React.FC<{ children: React.ReactNode; n?: number }> = ({ children, n }) => (
  <div className="flex items-center gap-3 mb-3">
    {n !== undefined && (
      <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-vibe-pink to-vibe-purple text-white font-black text-base flex items-center justify-center shadow-glow-pink shrink-0 print:bg-slate-700 print:shadow-none">
        {n}
      </span>
    )}
    <h3 className="text-lg sm:text-xl font-black text-slate-900 print:text-black">{children}</h3>
  </div>
);

export const BlocksRenderer: React.FC<Props> = ({ blocks, printMode = false, showAnswers = false }) => {
  return (
    <div className="space-y-6">
      {blocks.map((b, idx) => {
        const title = (b as any).title;
        switch (b.type) {
          case 'instruction':
            return (
              <div key={idx} className="rounded-2xl border-2 border-vibe-purple/40 bg-vibe-purple/5 p-5 print:border-slate-400 print:bg-transparent">
                <p className="text-xs font-black uppercase tracking-widest text-vibe-purple mb-2 print:text-black">📝 Como fazer</p>
                <p className="text-base text-slate-800 leading-relaxed print:text-black">{(b as any).content}</p>
              </div>
            );

          case 'text':
            return (
              <div key={idx} className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-5 print:border-slate-400">
                {title && <BlockTitle n={idx + 1}>{title}</BlockTitle>}
                <p className="text-base text-slate-800 leading-relaxed whitespace-pre-wrap print:text-black">
                  {(b as any).content}
                </p>
              </div>
            );

          case 'multiple_choice': {
            const opts = (b as any).options || [];
            const correctIdx = (b as any).correctIndex;
            return (
              <div key={idx} className="rounded-2xl border-2 border-slate-200 p-5 print:border-slate-400">
                {title && <BlockTitle n={idx + 1}>{title}</BlockTitle>}
                {(b as any).content && (
                  <p className="text-base text-slate-800 mb-4 print:text-black">{(b as any).content}</p>
                )}
                <ul className="space-y-3">
                  {opts.map((opt: any, i: number) => (
                    <li key={i} className={`flex items-start gap-3 p-3 rounded-xl border-2 ${showAnswers && i === correctIdx ? 'border-vibe-lime bg-vibe-lime/10 print:bg-yellow-100 print:border-slate-700' : 'border-slate-200 bg-white'}`}>
                      <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-700 shrink-0">
                        {opt.label || String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-slate-800 print:text-black">{opt.text}</span>
                      {showAnswers && i === correctIdx && (
                        <span className="ml-auto text-xs font-black text-vibe-lime px-2 py-1 rounded-md bg-white print:hidden">✓ CORRETA</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          case 'fill_blank': {
            const blanks = (b as any).blanks || [];
            return (
              <div key={idx} className="rounded-2xl border-2 border-slate-200 p-5 print:border-slate-400">
                {title && <BlockTitle n={idx + 1}>{title}</BlockTitle>}
                <ol className="space-y-3">
                  {blanks.map((bl: any, i: number) => (
                    <li key={i} className="text-base text-slate-800 print:text-black">
                      <span className="inline-block w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-black text-sm text-center leading-7 mr-3">
                        {i + 1}
                      </span>
                      {bl.sentence?.split('___').map((part: string, j: number, arr: string[]) => (
                        <React.Fragment key={j}>
                          {part}
                          {j < arr.length - 1 && (
                            <span className="inline-block mx-1 px-3 py-0.5 border-b-2 border-slate-700 min-w-[5em]">
                              {showAnswers ? <span className="font-bold text-vibe-pink">{bl.answer}</span> : ' '}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </li>
                  ))}
                </ol>
              </div>
            );
          }

          case 'association':
          case 'matching_pairs': {
            const pairs = (b as any).pairs;
            const left = pairs ? pairs.map((p: any) => p.left) : ((b as any).leftColumn || []);
            const right = pairs ? pairs.map((p: any) => p.right) : ((b as any).rightColumn || []);
            // Embaralha a coluna direita pra o aluno ligar
            const shuffledRight = React.useMemo(() => {
              const arr = [...right];
              for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
              }
              return arr;
            }, [right.join('|')]);
            return (
              <div key={idx} className="rounded-2xl border-2 border-slate-200 p-5 print:border-slate-400">
                {title && <BlockTitle n={idx + 1}>{title}</BlockTitle>}
                <p className="text-xs uppercase tracking-widest font-black text-slate-500 mb-3">
                  ✏️ Ligue cada item da esquerda ao da direita
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="space-y-3">
                    {left.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-vibe-cyan text-slate-900 font-black text-sm flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1 px-3 py-2 rounded-lg bg-white border-2 border-slate-200 text-slate-800 print:text-black">{item}</span>
                        <span className="text-2xl text-slate-300">●</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {shuffledRight.map((item: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-2xl text-slate-300">●</span>
                        <span className="flex-1 px-3 py-2 rounded-lg bg-white border-2 border-slate-200 text-slate-800 print:text-black">{item}</span>
                        <span className="w-7 h-7 rounded-lg bg-vibe-pink text-white font-black text-sm flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {showAnswers && pairs && (
                  <div className="mt-4 pt-4 border-t-2 border-dashed border-slate-300">
                    <p className="text-xs font-black uppercase tracking-widest text-vibe-lime mb-2">Gabarito:</p>
                    <ul className="text-sm space-y-1">
                      {pairs.map((p: any, i: number) => (
                        <li key={i}><strong>{String.fromCharCode(65 + i)}</strong> ↔ <strong>{p.right}</strong></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          case 'draw_paint':
            return (
              <div key={idx} className="rounded-2xl border-4 border-dashed border-vibe-orange/60 bg-vibe-orange/5 p-5 print:border-slate-400 print:bg-transparent">
                {title && <BlockTitle n={idx + 1}>{title}</BlockTitle>}
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{(b as any).imageEmoji || '🎨'}</div>
                  <p className="text-base text-slate-800 leading-relaxed flex-1 print:text-black">{(b as any).drawPrompt}</p>
                </div>
                <div className="mt-5 h-48 sm:h-64 rounded-xl border-2 border-slate-300 bg-white grid place-items-center text-slate-300 text-sm font-bold uppercase tracking-widest">
                  · espaço para desenhar / pintar ·
                </div>
              </div>
            );

          case 'wordsearch':
            return (
              <div key={idx} className="rounded-2xl border-2 border-slate-200 p-5 print:border-slate-400">
                <BlockTitle n={idx + 1}>{title || '🔍 Caça-palavras'}</BlockTitle>
                <WordSearchGrid words={(b as any).words || []} showAnswerKey={showAnswers} />
              </div>
            );

          case 'crossword':
            return (
              <div key={idx} className="rounded-2xl border-2 border-slate-200 p-5 print:border-slate-400">
                <BlockTitle n={idx + 1}>{title || '🧩 Palavras-cruzadas'}</BlockTitle>
                <CrosswordGrid words={(b as any).words || []} clues={(b as any).clues} showAnswerKey={showAnswers} />
              </div>
            );

          case 'image_description':
            return (
              <div key={idx} className="rounded-2xl border-2 border-slate-200 p-5 print:border-slate-400">
                {title && <BlockTitle n={idx + 1}>{title}</BlockTitle>}
                <div className="text-center mb-4">
                  <div className="inline-block text-7xl sm:text-8xl">{(b as any).imageEmoji}</div>
                  <p className="mt-2 text-xs uppercase tracking-widest text-slate-500 font-bold italic">
                    {(b as any).imageDescription}
                  </p>
                </div>
                {(b as any).content && (
                  <p className="text-base text-slate-800 print:text-black">{(b as any).content}</p>
                )}
              </div>
            );

          case 'sequence':
            return (
              <div key={idx} className="rounded-2xl border-2 border-slate-200 p-5 print:border-slate-400">
                {title && <BlockTitle n={idx + 1}>{title}</BlockTitle>}
                <p className="text-xs uppercase tracking-widest font-black text-slate-500 mb-3">
                  📋 Coloque em ordem
                </p>
                <ol className="space-y-2">
                  {((b as any).items || []).map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border-2 border-slate-200">
                      <span className="w-12 h-8 rounded-lg bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400 text-xs font-black flex items-center justify-center">
                        ?
                      </span>
                      <span className="text-slate-800 print:text-black">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );

          default:
            return (
              <div key={idx} className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
                Tipo de bloco não reconhecido: <code>{(b as any).type}</code>
              </div>
            );
        }
      })}
    </div>
  );
};
