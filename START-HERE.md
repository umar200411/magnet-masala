# Magnet Masala — source code handoff

This archive contains the implemented storefront, supplied product photos (including available 250g pack images), the brand logo, configuration, and the dependency lockfile.

## Run locally

Requirements: Node.js 22.13 or newer and the pnpm version specified by packageManager in package.json.

1. Extract the ZIP and open the magnet-masala folder in VS Code or a terminal.
2. Install dependencies: `pnpm install --frozen-lockfile`
3. Copy `.env.example` to `.env.local`.
4. The WhatsApp number defaults to +923292200447. Change `NEXT_PUBLIC_WHATSAPP_NUMBER` if needed and confirm it before launch.
5. Run `pnpm dev` and open http://localhost:5173.

## Edit the store

- `lib/catalog.ts`: product names, categories, 125g/250g variants, descriptions, exact PKR prices, variant images and stock.
- `lib/config.ts`: business details, delivery text, social links and WhatsApp configuration.
- `lib/information.ts`: about, FAQ, privacy, terms and delivery copy.
- `app/page.tsx`: homepage.
- `app/globals.css`: responsive styles, typography and brand colors.
- `components/store.tsx`: cart state, header, footer and basket drawer.
- `components/checkout.tsx`: customer form, review and order summary.
- `lib/whatsapp.ts`: WhatsApp message formatting and URL encoding.
- `public/products/`: supplied product images.

Restart development after editing environment variables. Rebuild before publishing environment-variable changes.

## Validation

`pnpm lint`
`pnpm exec tsc --noEmit`
`pnpm build`

## Runtime and hosting

Run `npm run build` to generate **`out/`**, the complete static website for GitHub Pages. Run `npm run preview` to verify it on a plain static HTTP server at http://127.0.0.1:4173. No Wrangler or production server is required.

Production uses Next.js static export. Development retains Vinext/Vite. All product and information pages are built ahead of time; browser state handles shopping and checkout. See [GITHUB-PAGES.md](GITHUB-PAGES.md) for the workflow, Hostinger DNS records, and custom-domain setup.

The included `.openai/hosting.json` is legacy metadata. GitHub Pages does not read it. Set `SITE_URL` to your production origin for static robots/sitemap output; URLs assume domain-root hosting.

## Before taking orders

Confirm the WhatsApp number, review business policies and delivery details, and preserve the approved catalog prices and weights. The website prepares a message; the customer must send it and the business must confirm the order in WhatsApp. No payments or orders are stored by the website. Basket contents are stored only in the customer's browser.

Dependencies, Git history, generated builds, runtime caches and credentials are excluded from this archive. The included .env.example documents the public WhatsApp number. See README.md for theme, direct ordering and deployment details.
