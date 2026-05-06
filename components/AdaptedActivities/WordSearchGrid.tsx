// =====================================================================
// WordSearchGrid — gera caça-palavras simples (8 direções)
// =====================================================================
// Recebe um array de palavras e renderiza uma grade de letras 12×12 (ou
// proporcional ao maior comprimento). Posiciona cada palavra em direção
// aleatória e preenche o resto com letras random. Sem libs externas.
// Renderizado em <table> para imprimir limpo em PDF.
// =====================================================================

import React, { useMemo } from 'react';

interface Props {
  words: string[];
  /** lado da grade (default = max(palavra) + 4, mín 10, máx 16) */
  size?: number;
  showAnswerKey?: boolean;
}

const norm = (w: string) =>
  w.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');

const DIRECTIONS = [
  [0, 1],   // →
  [1, 0],   // ↓
  [1, 1],   // ↘
  [-1, 1],  // ↗
  [0, -1],  // ←
  [-1, 0],  // ↑
  [-1, -1], // ↖
  [1, -1],  // ↙
];

interface Placement { word: string; row: number; col: number; dr: number; dc: number; }

function buildGrid(rawWords: string[], size: number): { grid: string[][], placements: Placement[] } {
  const words = rawWords
    .map(norm)
    .filter(w => w.length >= 2 && w.length <= size)
    .sort((a, b) => b.length - a.length);

  const grid: (string | null)[][] = Array.from({ length: size }, () => Array(size).fill(null));
  const placements: Placement[] = [];

  const tryPlace = (word: string): boolean => {
    const tries: Array<[number, number, number, number]> = [];
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        for (const [dr, dc] of DIRECTIONS) {
          tries.push([r, c, dr, dc]);
        }
      }
    }
    // shuffle
    for (let i = tries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tries[i], tries[j]] = [tries[j], tries[i]];
    }
    for (const [r, c, dr, dc] of tries) {
      const endR = r + dr * (word.length - 1);
      const endC = c + dc * (word.length - 1);
      if (endR < 0 || endR >= size || endC < 0 || endC >= size) continue;
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const cell = grid[r + dr * i][c + dc * i];
        if (cell !== null && cell !== word[i]) { ok = false; break; }
      }
      if (!ok) continue;
      for (let i = 0; i < word.length; i++) {
        grid[r + dr * i][c + dc * i] = word[i];
      }
      placements.push({ word, row: r, col: c, dr, dc });
      return true;
    }
    return false;
  };

  words.forEach(tryPlace);

  // Preenche vazios com letras aleatórias
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const filled: string[][] = grid.map(row =>
    row.map(c => c === null ? ALPHA[Math.floor(Math.random() * 26)] : c)
  );

  return { grid: filled, placements };
}

export const WordSearchGrid: React.FC<Props> = ({ words, size, showAnswerKey = false }) => {
  const computedSize = useMemo(() => {
    const max = Math.max(...words.map(w => norm(w).length), 5);
    const target = Math.min(16, Math.max(10, max + 4));
    return size || target;
  }, [words, size]);

  const { grid, placements } = useMemo(
    () => buildGrid(words, computedSize),
    [words, computedSize],
  );

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="border-collapse mx-auto" style={{ borderSpacing: 0 }}>
          <tbody>
            {grid.map((row, r) => (
              <tr key={r}>
                {row.map((ch, c) => {
                  const inAnswer = showAnswerKey && placements.some(p => {
                    for (let i = 0; i < p.word.length; i++) {
                      if (p.row + p.dr * i === r && p.col + p.dc * i === c) return true;
                    }
                    return false;
                  });
                  return (
                    <td
                      key={c}
                      className={`w-9 h-9 sm:w-10 sm:h-10 text-center font-mono text-base sm:text-lg font-bold border border-slate-400 ${inAnswer ? 'bg-yellow-200 text-slate-900' : 'bg-white text-slate-800'}`}
                    >
                      {ch}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-2">
          Encontre as palavras:
        </p>
        <div className="flex flex-wrap gap-2">
          {placements.map(p => (
            <span
              key={p.word}
              className="inline-block px-3 py-1.5 rounded-lg bg-white border-2 border-slate-300 text-sm font-mono font-bold text-slate-800"
            >
              {p.word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
