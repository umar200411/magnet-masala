import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';
const compiled = mkdtempSync(join(tmpdir(), 'magnet-order-tests-'));
let orderMessage, whatsappUrl, products;
try {
  for (const name of ['catalog', 'whatsapp']) {
    const source = readFileSync(new URL(`../lib/${name}.ts`, import.meta.url), 'utf8');
    writeFileSync(join(compiled, `${name}.cjs`), ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText.replace('require("./catalog")', 'require("./catalog.cjs")'));
  }
  const require = createRequire(import.meta.url);
  ({ orderMessage, whatsappUrl } = require(join(compiled, 'whatsapp.cjs')));
  ({ products } = require(join(compiled, 'catalog.cjs')));
} finally {
  rmSync(compiled, { recursive: true, force: true });
}

test('single-product order includes only the selected item and quantity', () => {
  const message = orderMessage([{ id: products[0].id, quantity: 3 }]);
  assert.ok(message.includes(products[0].name));
  assert.ok(message.includes('Weight: 125 g'));
  assert.ok(message.includes('Quantity: 3'));
  assert.ok(message.includes('Subtotal: Rs. 1,050'));
  assert.ok(!message.includes(products[1].name));
  assert.ok(!message.includes('CUSTOMER DETAILS'));
});

test('basket order encodes customer text and sums all selected products', () => {
  const message = orderMessage([{ id: products[0].id, quantity: 2 }, { id: products[1].id, quantity: 1 }], { name: ' Ali & Sara ', phone: '+923000000000', city: 'Karachi', address: 'House #5 & 6', note: 'مرچ کم' });
  const url = new URL(whatsappUrl('+92 329-2200447', message));
  assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/923292200447');
  assert.equal(url.searchParams.get('text'), message);
  assert.ok(message.includes('Name: Ali & Sara'));
  assert.ok(message.includes('Subtotal: Rs. 1,050'));
});

test('invalid items, quantities and destinations are rejected', () => {
  for (const quantity of [0, -1, 100, 1.5, NaN]) assert.throws(() => orderMessage([{ id: products[0].id, quantity }]));
  assert.throws(() => orderMessage([{ id: 'missing', quantity: 1 }]));
  assert.throws(() => orderMessage([]));
  for (const number of ['', 'abc', '0123456789', '92329oops2200447']) assert.equal(whatsappUrl(number, 'hello'), null);
});

test('all products have unique identifiers and positive sample prices', () => {
  assert.equal(new Set(products.map(p => p.id)).size, products.length);
  assert.ok(products.every(p => Number.isFinite(p.price) && p.price > 0));
});
