// Wraps src/index.html (a page fragment: <title>, <style>, markup, <script>) into a
// standalone HTML document at dist/index.html, ready for any static host.
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const src = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');
const split = src.indexOf('<main id="app">');
if (split < 0) throw new Error('src/index.html: <main id="app"> not found');

const head = src.slice(0, split).trimEnd();
const body = src.slice(split).trimEnd();

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>:root{color-scheme:light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;

await mkdir(new URL('../dist/', import.meta.url), { recursive: true });
await writeFile(new URL('../dist/index.html', import.meta.url), html);
console.log(`built dist/index.html (${(html.length / 1024).toFixed(1)} KB)`);
