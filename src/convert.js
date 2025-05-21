const mammoth = require("mammoth");
const puppeteer = require("puppeteer");

async function docxBufferToPdfBuffer(docxBuffer) {
  // 1) DOCX → HTML
  const { value: html, messages } = await mammoth.convertToHtml({
    buffer: docxBuffer,
    styleMap: [
      "p[style-name='Heading 1'] => h1:fresh",
      "p[style-name='Heading 2'] => h2:fresh",
      "r[style-name='Strong'] => strong",
      "r[style-name='Emphasis'] => em",
      "p[style-name='List Paragraph'] => ul > li:fresh",
      "table => table",
      "tr => tr",
      "td => td",
    ],
  });
  if (messages.length) {
    console.warn("Mammoth conversion messages:", messages);
  }

  // 2) HTML → PDF via headless Chrome
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
  });

  await browser.close();
  return pdfBuffer;
}

module.exports = { docxBufferToPdfBuffer };
