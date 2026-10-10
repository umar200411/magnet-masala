# Magnet Masala

React/TypeScript storefront using Next.js 16 static export for GitHub Pages. Vinext/Vite remains the development toolchain. Orders are sent through WhatsApp; there is no order database or payment processor.

## Configure the store

- **Products and prices:** edit the variant records in `lib/catalog.ts`. Each masala has one product entry; its 125g and optional 250g variants carry their own exact prices, image and stock. Cards, product pages, basket totals, sorting and WhatsApp messages use the same catalog.
- **WhatsApp:** defaults to **+923292200447** in `lib/config.ts`. Override with `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` or your build environment (see `.env.example`). Digits only or common phone formatting are accepted. Restart development or rebuild/redeploy after changes. This is public contact information, not a secret.
- **Business content:** edit `lib/config.ts` and `lib/information.ts` for contact details, delivery and policies.
- **Theme:** defaults to dark. The header toggle switches light/dark mode and saves the choice in browser storage; the mobile menu includes the same appearance control.

## Orders

“Order on WhatsApp” opens a new tab with that product’s name, weight, selected quantity, unit price and subtotal pre-filled. Product cards order one jar; product pages use the quantity selector. Direct orders do not add or include other basket items.

For multiple products, add items to the basket and use checkout. The final WhatsApp link includes the basket and entered delivery details. Customers must press Send and receive confirmation in chat; opening WhatsApp is not a completed order. Checkout details stay in memory, while the basket persists locally. Invalid WhatsApp configuration disables direct ordering and offers a copy-message fallback at checkout.

## Run and verify

Use Node.js 22.13+ and the pnpm version in `package.json`. GitHub Actions installs Node 22 and the pinned pnpm version.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm preview
```

Development listens on port 5173. `pnpm preview` serves only the static `out/` folder at http://127.0.0.1:4173. `pnpm start` is an alias for this optional local preview; production never needs a server process. The tests verify single-item ordering, basket totals, message encoding, invalid quantities and catalog prices.

## Deployment

`npm run build` uses the installed Next.js exporter with `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`. All 17 product routes are generated from `lib/catalog.ts`; the five information routes come from `lib/information.ts`. Shop query parameters are handled in the browser. Each page has an `index.html`, so direct navigation works without SPA rewrites. Local product images use prebuilt responsive WebP assets with their original `/products/...jpg` URLs retained as fallbacks.

Deploy **only `out/`**. It contains HTML, CSS, browser JavaScript, images, and static navigation data. `.next/` is a build workspace; any old `dist/server/` output belongs to the previous vinext build and must not be uploaded. No Node, Wrangler, Cloudflare Worker, image optimizer, API, database, or request-time rendering runs in production.

The installed vinext beta exporter returns HTTP 308 responses during prerendering with directory-style routes. The production command therefore uses Next.js directly; vinext/Vite is retained for development. Cloudflare-related dependencies and legacy helper scripts are retained for compatibility but are not invoked by the build, preview, or Pages workflow. The unused ChatGPT auth and D1 database helpers have been removed.

The build finishes by checking every expected HTML page, sitemap coverage, robots directives, original image bytes, `.nojekyll`, the branded `404.html`, and the absence of server artifacts from `out/`.

Product photography also has prebuilt responsive WebP versions in `public/products/optimized/`, with 360px, 720px and full-size choices. `ProductImage` selects these locally, preserves lazy loading below the fold, and falls back to the original JPEG if an optimized image fails. After replacing product photographs, run `node scripts/optimize-product-images.mjs` to regenerate the images and `lib/product-image-widths.json`. The script uses Next's existing sharp dependency. No runtime image service or new dependency is required.

Follow [GITHUB-PAGES.md](GITHUB-PAGES.md) to enable GitHub Actions publishing and point the Hostinger domain to GitHub Pages. `.github/workflows/deploy-pages.yml` installs the locked pnpm dependencies, typechecks, builds, uploads only `out/`, and deploys on pushes to `main` or a manual run. Existing `.openai/hosting.json` is historical metadata and is not used by this deployment.

Set `SITE_URL` to your exact production origin (default: `https://magnetmasala.com`) in `.env.local` or as a GitHub Actions repository variable. This generates static SEO files at build time; it does not configure DNS or the Pages custom domain. There is no repository-name base path or asset prefix.

Contact opens WhatsApp/email. Reviews prepare a WhatsApp/email message and require manual publication; they do not automatically appear on the website. Checkout generates its order message entirely in the browser. No external form backend is required. A customer must press Send in WhatsApp and receive confirmation from the business.

Before launch, review business policy/returns/delivery copy in `lib/information.ts` and verify the WhatsApp destination. Preserve approved catalog prices and weights. Local validation does not send actual WhatsApp messages.

## Bundles

Curated sets live in `lib/bundles.ts`. Their estimated totals use the current catalog prices, with no extra discount; adding a set adds one of each listed product.

The homepage keeps the product collection, curated sets and ordering guidance. Empty customer reviews and repeated menu links are not displayed. Customers can send feedback through the contact page.

Search engines receive static `/robots.txt` and `/sitemap.xml`, generated using `SITE_URL`. Basket and checkout pages carry `noindex` metadata.
