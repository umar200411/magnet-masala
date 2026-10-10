import { createRequire } from "node:module";
import { readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Next already depends on sharp; this offline asset task adds no dependency.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const { default: sharp } = await import(nextRequire.resolve("sharp"));
const root = fileURLToPath(new URL("../", import.meta.url));
const directory = path.join(root, "public/products");
const output = path.join(directory, "optimized");
await mkdir(output, { recursive: true });
const widths = {};
let originalBytes = 0, fullBytes = 0, mobileBytes = 0;
for (const filename of (await readdir(directory)).filter(file => file.endsWith(".jpg")).sort()) {
  const source = path.join(directory, filename);
  const base = filename.replace(/\.jpg$/, "");
  const metadata = await sharp(source).metadata();
  const fullWidth = Math.min(metadata.width, 1280);
  widths[`/products/${filename}`] = fullWidth;
  for (const width of [360, 720, fullWidth]) {
    const destination = path.join(output, `${base}${width === fullWidth ? "" : `-${width}`}.webp`);
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 88, effort: 5 }).toFile(destination);
  }
  originalBytes += (await stat(source)).size;
  fullBytes += (await stat(path.join(output, `${base}.webp`))).size;
  mobileBytes += (await stat(path.join(output, `${base}-360.webp`))).size;
}
await writeFile(path.join(root, "lib/product-image-widths.json"), JSON.stringify(widths, null, 2) + "\n");
console.log(JSON.stringify({ products: Object.keys(widths).length, originalBytes, fullBytes, mobileBytes }));
