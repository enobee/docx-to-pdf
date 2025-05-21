const fs = require("fs");
const { docxBufferToPdfBuffer } = require("./convert");

(async () => {
  const docx = fs.readFileSync("sample.docx");
  const pdf = await docxBufferToPdfBuffer(docx);
  fs.writeFileSync("out.pdf", pdf);
  console.log("out.pdf written");
})().catch(console.error);
