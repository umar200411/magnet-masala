import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "out");

async function catalogModule(name) {
  const source = await readFile(path.join(root, "lib", `${name}.ts`), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { products, variantImage } = await catalogModule("catalog");
const { information } = await catalogModule("information");
const routes = ["/", "/shop/", "/cart/", "/checkout/", "/contact/",
  ...Object.keys(information).map(info => `/${info}/`),
  ...products.map(product => `/products/${product.slug}/`)];

for (const route of routes) {
  const html = await readFile(path.join(output, route, "index.html"), "utf8");
  assert.ok(html.includes("Magnet Masala"), `Missing branded HTML: ${route}`);
  assert.ok(!html.includes("/_next/image"), `Runtime image optimizer in ${route}`);
}

const sitemap = await readFile(path.join(output, "sitemap.xml"), "utf8");
const robots = await readFile(path.join(output, "robots.txt"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]));
for (const route of routes.filter(route => route !== "/cart/" && route !== "/checkout/")) {
  assert.ok(urls.some(url => url.pathname === route), `Sitemap omits ${route}`);
}
assert.ok(robots.includes(`${urls[0].origin}/sitemap.xml`), "Robots sitemap origin differs");
assert.ok(robots.includes("Disallow: /cart") && robots.includes("Disallow: /checkout"));

const images = new Set(["/logo.jpg", ...products.flatMap(product => [product.image,
  ...product.variants.map(variant => variantImage(product, variant)),
  ...(product.gallery ?? []).map(image => image.src)])]);
for (const image of images) {
  const exported = await readFile(path.join(output, image));
  const original = await readFile(path.join(root, "public", image));
  assert.ok(exported.equals(original), `Missing or changed product image: ${image}`);
}

const notFound = await readFile(path.join(output, "404.html"), "utf8");
assert.ok(notFound.includes("Back to Home") && notFound.includes("Shop Products"));
assert.ok((await stat(path.join(output, ".nojekyll"))).isFile());
const files = await readdir(output, { recursive: true });
assert.ok(!files.some(file => /(^|\/)(server|wrangler\.json|_worker\.js)$/.test(file)), "Server artifacts in static export");

console.log(`Static export verified: ${routes.length} pages, ${products.length} products, ${images.size} images, robots, sitemap and branded 404. Deploy only out/.`);
