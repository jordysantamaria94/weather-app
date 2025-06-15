declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | [number, number, number, number];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: any;
    jsPDF?: any;
    enableLinks?: boolean;
    pagebreak?: { mode: 'css' | 'legacy' | 'avoid-all' | 'all' | string };
  }

  interface Html2PdfChain {
    from(element: HTMLElement | string): Html2PdfChain;
    set(options: Html2PdfOptions): Html2PdfChain;
    save(): Promise<void>;
    outputPdf(
      type:
        | 'datauristring'
        | 'dataurlstring'
        | 'dataurlnewwindow'
        | 'blob'
        | 'arraybuffer'
        | 'base64'
    ): string | Blob | ArrayBuffer;
  }

  function html2pdf(
    element?: HTMLElement | string,
    options?: Html2PdfOptions
  ): Html2PdfChain;
  export default html2pdf;
}
