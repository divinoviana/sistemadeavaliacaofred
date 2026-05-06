// =====================================================================
// Export PDF e DOCX da atividade adaptada
// =====================================================================
// PDF: usa html2canvas + jsPDF (já são deps do projeto). Captura o
//      <div id="activity-print-area"> e converte para A4.
// DOCX: monta o documento programaticamente com a lib `docx` (import
//      dinâmico para não pesar o bundle inicial).
// =====================================================================

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NeuroStudent } from '../data_students_neuro';
import { AdaptedActivity, GenerateRequest, StudentBlock } from './adaptedActivityService';

interface ExportOpts { showAnswers?: boolean }

// =====================================================================
// PDF
// =====================================================================

export async function exportActivityPDF(
  student: NeuroStudent,
  activity: AdaptedActivity,
  request: GenerateRequest,
  _opts: ExportOpts = {},
) {
  const el = document.getElementById('activity-print-area') as HTMLElement | null;
  if (!el) throw new Error('Área de impressão não encontrada.');

  el.classList.add('export-mode');
  try {
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: el.scrollWidth,
    });

    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const usableW = pageW - margin * 2;
    const imgH = (canvas.height * usableW) / canvas.width;

    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    if (imgH <= pageH - margin * 2) {
      pdf.addImage(imgData, 'JPEG', margin, margin, usableW, imgH);
    } else {
      // Quebra em múltiplas páginas: desloca a imagem pra cima
      const pageUsableH = pageH - margin * 2;
      let renderedH = 0;
      while (renderedH < imgH) {
        pdf.addImage(imgData, 'JPEG', margin, margin - renderedH, usableW, imgH);
        renderedH += pageUsableH;
        if (renderedH < imgH) pdf.addPage();
      }
    }

    pdf.save(sanitize(`Atividade-${student.firstName}-${request.theme}.pdf`));
  } finally {
    el.classList.remove('export-mode');
  }
}

// =====================================================================
// DOCX
// =====================================================================

export async function exportActivityDOCX(
  student: NeuroStudent,
  activity: AdaptedActivity,
  request: GenerateRequest,
  opts: ExportOpts = {},
) {
  const docx = await import('docx');
  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
    Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  } = docx as any;

  const showAns = !!opts.showAnswers;

  // ---------- helpers (closure sobre `docx`) ----------
  const h1 = (text: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text, bold: true, size: 36 })],
    });
  const h2 = (text: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 200, after: 80 },
      children: [new TextRun({ text, bold: true, size: 28 })],
    });
  const h3 = (text: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 160, after: 60 },
      children: [new TextRun({ text, bold: true, size: 24 })],
    });
  const p = (text: string, runOpts: any = {}) =>
    new Paragraph({
      spacing: { after: 80, line: 320 },
      children: [new TextRun({ text, size: 22, ...runOpts })],
    });
  const bullet = (text: string) =>
    new Paragraph({
      spacing: { after: 40, line: 280 },
      bullet: { level: 0 },
      children: [new TextRun({ text, size: 22 })],
    });
  const small = (text: string) =>
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text, size: 18, color: '64748B' })],
    });
  const divider = () =>
    new Paragraph({
      spacing: { before: 120, after: 120 },
      border: { bottom: { color: 'CBD5E1', space: 1, style: BorderStyle.SINGLE, size: 6 } },
      children: [],
    });
  const cell = (text: string, o: { bold?: boolean; fill?: string; widthPct?: number } = {}) =>
    new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text, bold: !!o.bold, size: 22 })] })],
      shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
      width: { size: o.widthPct ?? Math.floor(100 / 3), type: WidthType.PERCENTAGE },
    });
  const renderBlankRuns = (sentence: string, answer: string | undefined): any[] => {
    const parts = (sentence || '').split('___');
    const out: any[] = [];
    parts.forEach((part: string, i: number) => {
      if (part) out.push(new TextRun({ text: part, size: 22 }));
      if (i < parts.length - 1) {
        if (showAns && answer) {
          out.push(new TextRun({ text: ` ${answer} `, bold: true, color: 'D946EF', size: 22 }));
        } else {
          out.push(new TextRun({ text: '  ____________  ', size: 22 }));
        }
      }
    });
    return out;
  };

  // ---------- bloco-a-bloco ----------
  const blockToParagraphs = (b: StudentBlock, idx: number): any[] => {
    const t = (b as any).title;
    const out: any[] = [];
    if (t) out.push(h3(`${idx + 1}. ${t}`));

    switch (b.type) {
      case 'instruction':
        out.push(p(`📝 ${(b as any).content}`, { italics: true }));
        break;
      case 'text':
        out.push(p((b as any).content));
        break;
      case 'multiple_choice': {
        if ((b as any).content) out.push(p((b as any).content));
        const optsList = (b as any).options || [];
        optsList.forEach((o: any, i: number) => {
          const isCorrect = showAns && i === (b as any).correctIndex;
          out.push(new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({ text: `(${o.label || String.fromCharCode(65 + i)}) `, bold: true, size: 22 }),
              new TextRun({ text: o.text, size: 22, bold: isCorrect, color: isCorrect ? '009933' : undefined }),
              ...(isCorrect ? [new TextRun({ text: '   ✓ correta', size: 18, color: '009933', italics: true })] : []),
            ],
          }));
        });
        break;
      }
      case 'fill_blank': {
        const blanks = (b as any).blanks || [];
        blanks.forEach((bl: any, i: number) => {
          out.push(new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({ text: `${i + 1}. `, bold: true, size: 22 }),
              ...renderBlankRuns(bl.sentence || '', bl.answer),
            ],
          }));
        });
        break;
      }
      case 'association':
      case 'matching_pairs': {
        const pairs = (b as any).pairs;
        const left = pairs ? pairs.map((x: any) => x.left) : ((b as any).leftColumn || []);
        const right = pairs ? pairs.map((x: any) => x.right) : ((b as any).rightColumn || []);
        const shuffled = [...right].sort(() => Math.random() - 0.5);
        out.push(p('Ligue cada item da esquerda ao da direita:'));
        const rows: any[] = [];
        rows.push(new TableRow({
          children: [
            cell('A', { bold: true, fill: 'F1F5F9', widthPct: 50 }),
            cell('B', { bold: true, fill: 'F1F5F9', widthPct: 50 }),
          ],
        }));
        const max = Math.max(left.length, shuffled.length);
        for (let i = 0; i < max; i++) {
          rows.push(new TableRow({
            children: [
              cell(`${String.fromCharCode(65 + i)}) ${left[i] || ''}`, { widthPct: 50 }),
              cell(`${i + 1}) ${shuffled[i] || ''}`, { widthPct: 50 }),
            ],
          }));
        }
        out.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
        if (showAns && pairs) {
          out.push(small('Gabarito:'));
          pairs.forEach((pp: any, i: number) =>
            out.push(small(`${String.fromCharCode(65 + i)} ↔ ${pp.right}`))
          );
        }
        break;
      }
      case 'draw_paint':
        out.push(p(`${(b as any).imageEmoji || '🎨'}  ${(b as any).drawPrompt}`));
        out.push(p('[ ESPAÇO PARA DESENHAR / PINTAR ]', { italics: true, color: '94A3B8' }));
        out.push(new Table({
          rows: [new TableRow({
            children: [new TableCell({
              children: Array.from({ length: 12 }, () => new Paragraph({ children: [new TextRun(' ')] })),
              width: { size: 100, type: WidthType.PERCENTAGE },
            })],
          })],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }));
        break;
      case 'wordsearch': {
        const words = (b as any).words || [];
        out.push(p(`Encontre as palavras: ${words.map((w: string) => w.toUpperCase()).join(' · ')}`));
        out.push(small('(A grade do caça-palavras é gerada na versão imprimível em PDF — para o DOCX, use a lista acima e peça ao aluno para circular as palavras.)'));
        break;
      }
      case 'crossword': {
        const words = (b as any).words || [];
        const clues = (b as any).clues || [];
        out.push(p('Cruzadinha — preencha cada lacuna:'));
        words.forEach((w: string, i: number) => {
          const clue = clues[i] || w;
          const reveal = showAns ? ` → ${w.toUpperCase()}` : '';
          out.push(bullet(`${i + 1}. ${clue} (${w.length} letras)${reveal}`));
        });
        break;
      }
      case 'image_description':
        out.push(p(`${(b as any).imageEmoji}  ${(b as any).imageDescription}`));
        if ((b as any).content) out.push(p((b as any).content));
        break;
      case 'sequence': {
        const items = (b as any).items || [];
        out.push(p('Coloque na ordem correta:'));
        items.forEach((it: string) => out.push(bullet(`( ___ ) ${it}`)));
        break;
      }
    }
    return out;
  };

  // ---------- monta documento ----------
  const children: any[] = [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'ESTADO DO TOCANTINS · SECRETARIA DA EDUCAÇÃO', size: 16, bold: true, color: '475569' })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      children: [new TextRun({ text: 'Escola Estadual Frederico José Pedreira Neto', size: 22, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [new TextRun({ text: `Atividade Pedagógica Adaptada · ${new Date().toLocaleDateString('pt-BR')}`, size: 16, color: '64748B' })],
    }),
    new Table({
      rows: [new TableRow({
        children: [
          cell(`Estudante: ${student.fullName}`, { bold: true }),
          cell(`Turma: ${student.className} · ${student.grade}`),
          cell(`Componente: ${request.subject}`),
        ],
      })],
      width: { size: 100, type: WidthType.PERCENTAGE },
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] }),
    h1(activity.title),
    small(`Tema: ${request.theme} · Tipo: ${request.activityType} · Duração: ${request.duration}`),
    h2('🎯 Objetivo'),
    p(activity.objective),
    h2('📚 Habilidade trabalhada'),
    p(activity.skill),
    h2('👩‍🏫 Instruções para o professor'),
    p(activity.teacherInstructions),
    divider(),
    h1('Atividade do(a) aluno(a)'),
  ];

  activity.studentBlocks.forEach((b, i) => {
    children.push(...blockToParagraphs(b, i));
  });

  children.push(divider());
  children.push(h2('✨ Adaptações utilizadas'));
  activity.adaptationsUsed.forEach(a => children.push(bullet(a)));
  if (activity.ludicElements?.length) {
    children.push(h2('🎲 Elementos lúdicos'));
    activity.ludicElements.forEach(a => children.push(bullet(a)));
  }
  if (activity.materials?.length) {
    children.push(h2('📦 Materiais'));
    children.push(p(activity.materials.join(' · ')));
  }

  const doc = new Document({
    styles: { default: { document: { run: { font: 'Calibri', size: 22 } } } },
    sections: [{ properties: {}, children }],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = sanitize(`Atividade-${student.firstName}-${request.theme}.docx`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function sanitize(name: string) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9_\-\.]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}
