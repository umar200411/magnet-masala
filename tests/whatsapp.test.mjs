import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync, mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createRequire } from 'node:module';
import ts from 'typescript';

const compiled = mkdtempSync(join(tmpdir(), 'magnet-order-tests-'));
let orderMessage, whatsappUrl, products, getSelectedVariant, discountPercent, bundles, bundleProducts, bundleTotal;
try {
  for (const name of ['catalog', 'whatsapp', 'bundles']) {
    const source = readFileSync(new URL(`../lib/${name}.ts`, import.meta.url), 'utf8');
    writeFileSync(join(compiled, `${name}.cjs`), ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText.replace('require("./catalog")', 'require("./catalog.cjs")'));
  }
  const require = createRequire(import.meta.url);
  ({ orderMessage, whatsappUrl } = require(join(compiled, 'whatsapp.cjs')));
  ({ products, getSelectedVariant, discountPercent } = require(join(compiled, 'catalog.cjs')));
  ({ bundles, bundleProducts, bundleTotal } = require(join(compiled, 'bundles.cjs')));
} finally { rmSync(compiled, { recursive: true, force: true }); }

test('one catalog entry represents each masala, with unique variants', () => {
  assert.equal(products.length, 17);
  assert.equal(new Set(products.map(product => product.id)).size, products.length);
  assert.equal(products.filter(product => product.name.toLowerCase().includes('biryani')).length, 1);
  assert.deepEqual(products.find(product => product.id === 'biryani-masala').variants.map(variant => variant.weight), ['125g', '250g']);
  assert.equal(products.find(product => product.id === 'coriander-powder').variants[0].weight, '125g');
  assert.ok(products.every(product => product.variants.every(variant => ['125g', '250g'].includes(variant.weight))));
  assert.ok(products.every(product => product.variants.every(variant => variant.inStock)));
});

test('manual variant prices are exact and missing large sizes stay unavailable', () => {
  const expected = {
    'biryani-masala': [[400, 320], [690, 550]],
    'seekh-kabab-masala': [[400, 320], [650, 520]],
    'cheese-powder': [[440, 352], [760, 610]],
    'red-chilli-powder': [[200, 160], [350, 280]],
    'turmeric-powder': [[250, 200], [450, 360]],
    'garlic-powder': [[435, 348], [800, 640]],
    'chaat-masala': [[230, 184], [380, 300]],
    'fish-masala': [[375, 300], [600, 480]],
    'garam-masala': [[550, 440], [1050, 840]],
    'chicken-tikka-masala': [[445, 356], [690, 550]],
    'salan-masala': [[360, 288], [680, 550]],
  };
  for (const [id, prices] of Object.entries(expected)) assert.deepEqual(products.find(product => product.id === id).variants.map(({ originalPrice, salePrice }) => [originalPrice, salePrice]), prices);
  for (const id of ['macaroni-masala-powder', 'black-pepper-powder', 'cumin-powder', 'coriander-powder', 'fries-masala', 'ginger-powder']) assert.equal(products.find(product => product.id === id).variants.length, 1);
});

test('default and selected variants resolve independently', () => {
  const biryani = products.find(product => product.id === 'biryani-masala');
  assert.equal(getSelectedVariant(biryani).salePrice, 320);
  assert.equal(getSelectedVariant(biryani, 'biryani-250').salePrice, 550);
  assert.equal(getSelectedVariant(biryani, 'missing').id, 'biryani-125');
  const seekh = products.find(product => product.id === 'seekh-kabab-masala');
  assert.equal(getSelectedVariant(seekh, 'seekh-kabab-125').inStock, true);
  assert.equal(getSelectedVariant(seekh, 'seekh-kabab-250').inStock, true);
  assert.equal(discountPercent(getSelectedVariant(seekh, 'seekh-kabab-250')), 20);
});

test('WhatsApp orders include each size, unit price, line subtotal and customer details', () => {
  const message = orderMessage([{ id: 'biryani-masala', variantId: 'biryani-250', quantity: 2 }, { id: 'cheese-powder', variantId: 'cheese-125', quantity: 1 }], { name: ' Ali & Sara ', phone: '+923000000000', city: 'Karachi', address: 'House #5 & 6', note: 'مرچ کم' });
  assert.ok(message.includes('Magnet Biryani Masala\n   Pack: 250g\n   Qty: 2\n   Price: Rs. 550 each\n   Subtotal: Rs. 1,100'));
  assert.ok(message.includes('Magnet Cheese Powder\n   Pack: 125g\n   Qty: 1\n   Price: Rs. 352 each\n   Subtotal: Rs. 352'));
  assert.ok(message.includes('Order Total: Rs. 1,452'));
  assert.ok(message.includes('Name: Ali & Sara'));
  assert.ok(message.includes('Please confirm availability, prices, delivery charges'));
  const url = new URL(whatsappUrl('+92 329-2200447', message));
  assert.equal(url.pathname, '/923292200447');
  assert.equal(url.searchParams.get('text'), message);
});

test('invalid orders and WhatsApp destinations are rejected', () => {
  for (const quantity of [0, -1, 100, 1.5, NaN]) assert.throws(() => orderMessage([{ id: 'biryani-masala', variantId: 'biryani-125', quantity }]));
  assert.throws(() => orderMessage([{ id: 'missing', variantId: 'missing', quantity: 1 }]));
  assert.throws(() => orderMessage([]));
  for (const number of ['', 'abc', '0123456789', '92329oops2200447']) assert.equal(whatsappUrl(number, 'hello'), null);
});

test('catalog image files exist and all listed variants are available', () => {
  for (const product of products) for (const variant of product.variants) if (variant.image) assert.ok(existsSync(new URL(`../public${variant.image}`, import.meta.url)), `${variant.image} should exist`);
  assert.ok(products.flatMap(product => product.variants).every(variant => variant.inStock));
});

test('bundle totals use default variants and WhatsApp can list every bundle item', () => {
  for (const bundle of bundles) {
    const selected = bundleProducts(bundle.ids);
    assert.equal(bundleTotal(bundle.ids), selected.reduce((sum, product) => sum + getSelectedVariant(product).salePrice, 0));
    const message = orderMessage(selected.map(product => ({ id: product.id, variantId: getSelectedVariant(product).id, quantity: 1 })));
    for (const product of selected) assert.ok(message.includes(product.name));
  }
  assert.throws(() => bundleProducts(['not-a-product']));
});
