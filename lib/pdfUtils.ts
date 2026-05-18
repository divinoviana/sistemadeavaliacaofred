
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const BRAND = 'www.sistemadeavaliacao.com.br';
const FOOTER_HEIGHT_MM = 10; // espaço reservado no rodapé de cada página

export const exportToPDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth  = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const usableHeight = pageHeight - FOOTER_HEIGHT_MM;

    // Largura da imagem = largura da página; altura proporcional
    const imgWidthPx  = canvas.width;
    const imgHeightPx = canvas.height;

    // Quantos px de canvas cabem numa página (considerando a escala mm→px)
    const pxPerMm     = imgWidthPx / pageWidth;
    const sliceHeightPx = usableHeight * pxPerMm;

    let yOffset = 0; // posição atual no canvas (em px)
    let page    = 0;

    while (yOffset < imgHeightPx) {
      if (page > 0) pdf.addPage();

      // Recorta o slice desta página
      const remainingPx  = imgHeightPx - yOffset;
      const thisPx       = Math.min(sliceHeightPx, remainingPx);
      const thisHeightMm = thisPx / pxPerMm;

      // Cria canvas temporário só com o slice
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width  = imgWidthPx;
      sliceCanvas.height = thisPx;
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.drawImage(canvas, 0, yOffset, imgWidthPx, thisPx, 0, 0, imgWidthPx, thisPx);

      pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', 0, 0, pageWidth, thisHeightMm);

      // Rodapé com a marca
      const footerY = pageHeight - 4;
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(BRAND, pageWidth / 2, footerY, { align: 'center' });

      // Linha separadora fina acima do rodapé
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.3);
      pdf.line(10, footerY - 3, pageWidth - 10, footerY - 3);

      yOffset += thisPx;
      page++;
    }

    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
