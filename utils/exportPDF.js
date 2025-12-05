// Export Tasks/Notes As PDF (Browser)
   // Simple, dependency-free approach: open a new window with the element's HTML and call print.
   // Browser user selects "Save as PDF" to export.

export default class Exporter {
  constructor(){}

  printElement(element){
    if(!element) { alert('No content to export'); return; }
    const html = `
      <html>
        <head>
          <title>Export - Work Productivity</title>
          <meta charset="utf-8" />
          <style>
            body{font-family: Arial, Helvetica, sans-serif; color:#111; padding:16px}
            .view{max-width:900px}
            .note{border:1px solid #ddd;padding:10px;margin-bottom:8px;border-radius:6px}
          </style>
        </head>
        <body>
          <h1>Export</h1>
          ${element.innerHTML}
        </body>
      </html>`;
    const w = window.open('', '_blank');
    w.document.open();
    w.document.write(html);
    w.document.close();
    // Wait a moment then print
    setTimeout(()=>{ w.print(); }, 300);
  }
}
