// =====================================================================
// CrosswordGrid — palavras-cruzadas simples
// =====================================================================
// Algoritmo: começa com a palavra mais longa horizontal no centro,
// depois tenta encaixar cada outra palavra (vertical/horizontal) em
// alguma letra compartilhada. É um gerador "best effort", suficiente
// para fins pedagógicos com 4-8 palavras.
// =====================================================================

import React, { useMemo } from 'react';

interface Props {
  words: string[];
  /** Dicas (mesma ordem das palavras). Se ausente, mostra a palavra como dica. */
  clues?: string[];
  showAnswerKey?: boolean;
}

const norm = (w: string) =>
  w.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');

interface Placed {
  word: string;
  clue: string;
  row: number;
  col: number;
  /** 'h' = horizontal, 'v' = vertical */
  dir: 'h' | 'v';
  number?: number;
}

function buildCrossword(rawWords: string[], rawClues: string[]): { placed: Placed[]; rows: number; cols: number; offsetRow: number; offsetCol: number } {
  const pairs = rawWords.map((w, i) => ({ word: norm(w), clue: rawClues[i] || w }))
    .filter(p => p.word.length >= 2)
    .sort((a, b) => b.word.length - a.word.length);

  if (pairs.length === 0) return { placed: [], rows: 0, cols: 0, offsetRow: 0, offsetCol: 0 };

  // Espaço grande virtual; depois recortamos
  const SIZE = 30;
  const grid: (string | null)[][] = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  const placed: Placed[] = [];

  const place = (w: string, r: number, c: number, dir: 'h' | 'v') => {
    for (let i = 0; i < w.length; i++) {
      if (dir === 'h') grid[r][c + i] = w[i]; else grid[r + i][c] = w[i];
    }
  };

  // Primeira: horizontal no centro
  const first = pairs[0];
  const startCol = Math.floor((SIZE - first.word.length) / 2);
  const startRow = Math.floor(SIZE / 2);
  place(first.word, startRow, startCol, 'h');
  placed.push({ ...first, row: startRow, col: startCol, dir: 'h' });

  // Função para tentar encaixar
  const tryFit = (w: string, clue: string): boolean => {
    for (const p of placed) {
      for (let i = 0; i < p.word.length; i++) {
        for (let j = 0; j < w.length; j++) {
          if (p.word[i] !== w[j]) continue;
          // perpendicular ao p
          const dir: 'h' | 'v' = p.dir === 'h' ? 'v' : 'h';
          let r: number, c: number;
          if (p.dir === 'h') {
            r = p.row - j; c = p.col + i;
          } else {
            r = p.row + i; c = p.col - j;
          }
          // valida
          if (r < 0 || c < 0 || r >= SIZE || c >= SIZE) continue;
          if (dir === 'h' && c + w.length > SIZE) continue;
          if (dir === 'v' && r + w.length > SIZE) continue;
          let ok = true;
          for (let k = 0; k < w.length; k++) {
            const rr = dir === 'v' ? r + k : r;
            const cc = dir === 'h' ? c + k : c;
            const cell = grid[rr][cc];
            if (cell !== null && cell !== w[k]) { ok = false; break; }
            // Adjacência: se a célula vazia, vizinhos perpendiculares devem ser vazios
            if (cell === null) {
              if (dir === 'h') {
                if ((rr > 0 && grid[rr - 1][cc] !== null) || (rr < SIZE - 1 && grid[rr + 1][cc] !== null)) {
                  ok = false; break;
                }
              } else {
                if ((cc > 0 && grid[rr][cc - 1] !== null) || (cc < SIZE - 1 && grid[rr][cc + 1] !== null)) {
                  ok = false; break;
                }
              }
            }
          }
          if (!ok) continue;
          // Anteriores e posteriores devem estar vazios
          if (dir === 'h') {
            if (c > 0 && grid[r][c - 1] !== null) continue;
            if (c + w.length < SIZE && grid[r][c + w.length] !== null) continue;
          } else {
            if (r > 0 && grid[r - 1][c] !== null) continue;
            if (r + w.length < SIZE && grid[r + w.length][c] !== null) continue;
          }
          place(w, r, c, dir);
          placed.push({ word: w, clue, row: r, col: c, dir });
          return true;
        }
      }
    }
    return false;
  };

  for (let i = 1; i < pairs.length; i++) {
    tryFit(pairs[i].word, pairs[i].clue);
  }

  // Recorte das bordas
  let minR = SIZE, maxR = 0, minC = SIZE, maxC = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] !== null) {
        if (r < minR) minR = r;
        if (r > maxR) maxR = r;
        if (c < minC) minC = c;
        if (c > maxC) maxC = c;
      }
    }
  }

  // numera células de início (1, 2, 3 ...)
  const numbered: Placed[] = [...placed].sort((a, b) =>
    a.row === b.row ? a.col - b.col : a.row - b.row
  );
  const cellNum = new Map<string, number>();
  let n = 1;
  for (const p of numbered) {
    const key = `${p.row}:${p.col}`;
    if (!cellNum.has(key)) {
      cellNum.set(key, n++);
    }
    p.number = cellNum.get(key);
  }

  return {
    placed: numbered,
    rows: maxR - minR + 1,
    cols: maxC - minC + 1,
    offsetRow: minR,
    offsetCol: minC,
  };
}

export const CrosswordGrid: React.FC<Props> = ({ words, clues = [], showAnswerKey = false }) => {
  const cw = useMemo(() => buildCrossword(words, clues), [words, clues]);

  if (cw.placed.length === 0) {
    return <p className="text-sm text-slate-500 italic">Sem palavras suficientes para gerar a cruzadinha.</p>;
  }

  // build cell map
  const cellMap = new Map<string, { letter: string; number?: number }>();
  for (const p of cw.placed) {
    for (let i = 0; i < p.word.length; i++) {
      const r = p.dir === 'v' ? p.row + i : p.row;
      const c = p.dir === 'h' ? p.col + i : p.col;
      const key = `${r}:${c}`;
      const ex = cellMap.get(key);
      cellMap.set(key, {
        letter: p.word[i],
        number: ex?.number ?? (i === 0 ? p.number : undefined),
      });
    }
  }

  const horizontals = cw.placed.filter(p => p.dir === 'h');
  const verticals = cw.placed.filter(p => p.dir === 'v');

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto flex justify-center">
        <table className="border-collapse" style={{ borderSpacing: 0 }}>
          <tbody>
            {Array.from({ length: cw.rows }).map((_, ri) => (
              <tr key={ri}>
                {Array.from({ length: cw.cols }).map((__, ci) => {
                  const r = cw.offsetRow + ri;
                  const c = cw.offsetCol + ci;
                  const cell = cellMap.get(`${r}:${c}`);
                  if (!cell) {
                    return <td key={ci} className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100"></td>;
                  }
                  return (
                    <td
                      key={ci}
                      className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-slate-700 bg-white relative align-bottom"
                    >
                      {cell.number !== undefined && (
                        <span className="absolute top-0 left-0.5 text-[9px] font-bold text-slate-600 leading-none">
                          {cell.number}
                        </span>
                      )}
                      <span className={`block text-center font-mono text-base sm:text-lg font-bold ${showAnswerKey ? 'text-slate-900' : 'text-transparent'}`}>
                        {cell.letter}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-2">→ Horizontal</p>
          <ol className="space-y-1.5">
            {horizontals.map(p => (
              <li key={`h-${p.number}`} className="text-slate-800">
                <span className="font-bold mr-2">{p.number}.</span>
                {p.clue}
              </li>
            ))}
          </ol>
        </div>
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
          <p className="text-xs font-black uppercase tracking-widest text-slate-700 mb-2">↓ Vertical</p>
          <ol className="space-y-1.5">
            {verticals.map(p => (
              <li key={`v-${p.number}`} className="text-slate-800">
                <span className="font-bold mr-2">{p.number}.</span>
                {p.clue}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};
