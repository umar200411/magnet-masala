# Magnet Masala — source code handoff

This archive contains the implemented storefront, all 14 supplied product photos, the brand logo, configuration, and the dependency lockfile.

## Run locally

Requirements: Node.js 22.13 or newer and the pnpm version specified by packageManager in package.json.

1. Extract the ZIP and open the magnet-masala folder in VS Code or a terminal.
2. Install dependencies: `pnpm install --frozen-lockfile`
3. Copy `.env.example` to `.env.local`.
4. The WhatsApp number defaults to +923492287799. Change `NEXT_PUBLIC_WHATSAPP_NUMBER` if needed.
5. Run `pnpm dev` and open http://localhost:5173.

## Edit the store

- `lib/catalog.ts`: product names, categories, weights, descriptions and prices. All products have editable sample PKR prices; replace them with final prices before launch.
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

The source uses Next.js App Router conventions and React/TypeScript, running through Vinext/Vite with the Sites Cloudflare integration. This is the actual implementation, not a standalone stock Next.js export. For another hosting platform, adapt the runtime/deployment configuration to that platform; uploading these source files directly to ordinary static hosting will not run the application.

The included `.openai/hosting.json` identifies the existing private Magnet Masala Site. Preserve it when continuing that Site; do not reuse its project ID for a different Site.

## Before taking orders

Confirm the WhatsApp number, review business policies and delivery details, and replace sample prices. The website prepares a message; the customer must send it and the business must confirm the order in WhatsApp. No payments or orders are stored by the website. Basket contents are stored only in the customer's browser.

Dependencies, Git history, generated builds, runtime caches and credentials are excluded from this archive. The included .env.example documents the public WhatsApp number. See README.md for theme, direct ordering and deployment details.
