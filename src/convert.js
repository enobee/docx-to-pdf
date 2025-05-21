const mammoth = require("mammoth");
const puppeteer = require("puppeteer");

async function docxBufferToPdfBuffer(docxBuffer) {
  // 1) DOCX → HTML fragment
  const { value: htmlFragment, messages } = await mammoth.convertToHtml({
    buffer: docxBuffer,
    styleMap: [
      "p[style-name='Heading 1'] => h1:fresh",
      "p[style-name='Heading 2'] => h2:fresh",
      "p[style-name='Heading 3'] => h3:fresh",
      "p[style-name='Heading 4'] => h4:fresh",
      "p[style-name='Heading 5'] => h5:fresh",
      "p[style-name='Heading 6'] => h6:fresh",
      "r[style-name='Strong'] => strong",
      "r[style-name='Emphasis'] => em",
      "p[style-name='List Paragraph'] => ul > li:fresh",
      "table => table",
      "tr => tr",
      "td => td",
    ],
  });
  if (messages.length) {
    console.warn("Mammoth messages:", messages);
  }

  const fullHtml = `
    <!DOCTYPE html>
    <html><head>
      <meta charset="utf-8">
      <style>
        
        @page {
          size: A4;
          margin: 0;
        }
        html, body {
          white-space: pre-wrap;
          tab-size: 4;
        }
        body {
          margin: 1in;
          font-family: serif;
        }
        p {
          margin: 0 0 1em 0;
        }
       
      </style>
    </head><body>
      ${htmlFragment}
    </body></html>
  `;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  return pdfBuffer;
}

module.exports = { docxBufferToPdfBuffer };
