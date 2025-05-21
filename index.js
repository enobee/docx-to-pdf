const fs = require("fs");
const { docxBufferToPdfBuffer } = require("./src/convert");

async function main() {
  const [, , input = "sample.docx", output = "out-new.pdf"] = process.argv;

  const docx = fs.readFileSync(input);
  const pdf = await docxBufferToPdfBuffer(docx);
  fs.writeFileSync(output, pdf);

  console.log(`Converted ${input} → ${output}`);
}

main().catch((err) => {
  console.error("Conversion failed:", err);
  process.exit(1);
});
