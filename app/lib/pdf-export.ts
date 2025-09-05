import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Add a special class for PDF rendering
  element.classList.add('exporting-pdf');
  
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: '#ffffff'
  });
  
  // Remove the special class
  element.classList.remove('exporting-pdf');
  
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
  if (Capacitor.isNativePlatform()) {
    // Save to device on mobile
    const pdfData = pdf.output('datauristring').split(',')[1];
    try {
      await Filesystem.writeFile({
        path: `${filename}.pdf`,
        data: pdfData,
        directory: Directory.Documents,
        recursive: true
      });
      
      // Show notification that file was saved
      import('@capacitor/dialog').then(({ Dialog }) => {
        Dialog.alert({
          title: 'PDF Saved',
          message: `File saved as ${filename}.pdf in your documents folder.`
        });
      });
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  } else {
    // Download on web
    pdf.save(`${filename}.pdf`);
  }
};