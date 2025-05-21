# Docx-to-PDF Converter

A simple Node.js utility to convert a DOCX buffer into a PDF buffer, preserving original formatting (fonts, headings, tables, margins) without relying on LibreOffice.

## Features

- Converts `.docx` to HTML with Mammoth
- Renders PDF via Puppeteer (headless Chrome)
- Maintains page size (A4) and margins (1in)
- Preserves Word styles and inline CSS

## Installation

1. Clone this repository
2. Install dependencies:

   ```bash
   npm install
   ```

## How to run

```bash
node index.js                # converts sample.docx → out-new.pdf
OR
node index.js foo.docx bar.pdf  # converts foo.docx → bar.pdf
```
