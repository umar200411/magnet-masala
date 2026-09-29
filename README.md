# Magnet Masala

React/TypeScript storefront using Next App Router conventions on the existing Vinext/Vite and Cloudflare runtime. Orders are sent through WhatsApp; there is no order database or payment processor.

## Configure the store

- **Prices:** edit the numeric `price` fields in `lib/catalog.ts`. All 14 products now have sample PKR prices; replace these before launch. Cards, product pages, basket totals, sorting and WhatsApp messages use the same catalog.
- **WhatsApp:** defaults to **+923292200447** in `lib/config.ts`. Override with `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` or your build environment (see `.env.example`). Digits only or common phone formatting are accepted. Restart development or rebuild/redeploy after changes. This is public contact information, not a secret.
- **Business content:** edit `lib/config.ts` and `lib/information.ts` for contact details, delivery and policies.
- **Theme:** follows the visitor’s system setting initially. The header toggle switches light/dark mode and saves the choice in browser storage.

## Orders

“Order on WhatsApp” opens a new tab with that product’s name, weight, selected quantity, unit price and subtotal pre-filled. Product cards order one jar; product pages use the quantity selector. Direct orders do not add or include other basket items.

For multiple products, add items to the basket and use checkout. The final WhatsApp link includes the basket and entered delivery details. Customers must press Send and receive confirmation in chat; opening WhatsApp is not a completed order. Checkout details stay in memory, while the basket persists locally. Invalid WhatsApp configuration disables direct ordering and offers a copy-message fallback at checkout.

## Run and verify

Use Node.js 22.13+ (Node.js 24 recommended by this project's tooling requirements) and the pnpm version in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start
```

Development listens on port 5173. `pnpm start` previews the compiled Cloudflare worker locally; it does not deploy the site. The tests verify single-item ordering, basket totals, message encoding, invalid quantities and catalog prices.

## Deployment

Keep the existing Sites deployment integration when publishing the existing Site. `.openai/hosting.json` identifies that Site; do not reuse its project ID for a separate project. The build emits `dist/server/wrangler.json` and client assets. For independently managed Cloudflare hosting, configure your account/worker settings and deploy the generated worker with Wrangler; other hosts require adapting this runtime first. This is not a plain static export or a stock `next start` project.

Before launch, replace sample prices, review the outstanding business policy/returns/delivery copy in `lib/information.ts`, and verify a real WhatsApp order on your phone. Supply environment overrides at build time. No live deployment or actual WhatsApp message is performed by local validation.
