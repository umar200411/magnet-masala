# Deploy Magnet Masala to GitHub Pages

The website is a static Next.js export. Hostinger manages the domain/DNS; GitHub Pages serves the website. No Cloudflare service or paid Hostinger hosting is needed.

## Build and preview

Use Node 22.13+ and the pnpm version pinned in `package.json`:

```sh
pnpm install --frozen-lockfile
npm run typecheck
npm test
npm run build
npm run preview
```

Preview: http://127.0.0.1:4173. The preview server reads files from `out/`, redirects directories to their trailing slash, and serves `404.html` for missing files. It does not execute application/server code or use a homepage fallback.

Upload only **`out/`**:

```text
out/
  index.html
  404.html
  .nojekyll
  robots.txt
  sitemap.xml
  shop/index.html
  cart/index.html
  checkout/index.html
  contact/index.html
  about/index.html
  delivery/index.html
  faq/index.html
  privacy/index.html
  terms/index.html
  products/<every-catalog-slug>/index.html
  products/*.jpg
  logo.jpg
  _next/...
```

Keep all exported navigation data alongside the HTML and JavaScript. Next.js produces static data files used for client navigation; they do not require an RSC/SSR server.

## Enable deployment

1. Push these changes to `main` in `umar200411/magnet-masala`.
2. In the repository, open **Settings → Pages** and select **GitHub Actions** as the source.
3. Under **Settings → Secrets and variables → Actions → Variables**, set `SITE_URL` to the exact production origin, such as `https://magnetmasala.com`. The example is the build default; change it if the purchased domain differs. Optionally set `NEXT_PUBLIC_WHATSAPP_NUMBER` to override the current number.
4. Run **Deploy Magnet Masala to GitHub Pages**, or push to `main`. The workflow installs Node 22 and the project-pinned pnpm, installs with the frozen lockfile, runs typecheck, builds and verifies `out/`, uploads it, then deploys with the official Pages Actions.
5. Set the purchased domain under **Settings → Pages → Custom domain**. The Actions publishing method uses this setting and does not require a `CNAME` file in the export.

The workflow uses `contents: read`, `pages: write`, and `id-token: write`, with the `github-pages` deployment environment. A repository with environment approval rules may require its configured approval.

Source: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Point the Hostinger domain to Pages

After setting the custom domain in GitHub, open the domain's DNS records in Hostinger. For an apex domain (the domain without `www`), set these records:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | umar200411.github.io |

Replace conflicting website A/AAAA/CNAME records at those same names; retain unrelated mail and verification records. The `www` target is the GitHub account hostname, without a repository path. Once GitHub's DNS check and certificate setup finish, enable **Enforce HTTPS** in Pages settings. DNS/certificate changes may take up to 24 hours.

Use the final domain for browser testing: asset URLs begin at `/`, as requested. The default project URL with `/magnet-masala/` is not the configured deployment root.

Source: [GitHub custom-domain setup and DNS values](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Features and limits

Product variants, prices, filters, Quick View, quantity controls, related/recent products, cart storage, and checkout run locally. Contact and review feedback use WhatsApp/email handoffs. Checkout details stay in memory; cart contents persist in browser storage. Customers send the generated order through WhatsApp themselves.

Automatic publication of reviews would need an external service; the existing review handoff explicitly promises manual handling. No new backend has been introduced.

Prices and weights are unchanged. The supplied catalog currently contains 125g and 250g variants; no 135g variant exists in the source catalog. Adding products to the central catalog automatically adds their static routes and sitemap entries on the next build.

The unused legacy authentication and D1 helper files were removed. Legacy Cloudflare dependencies/helper scripts remain outside the active build/deployment path. Do not deploy old `dist/server/` or `.next/` build artifacts.

## Conversion and validation report

| Changed files | Purpose |
| --- | --- |
| `next.config.ts`, `vite.config.ts`, `package.json`, `scripts/run-framework.mjs` | Enable Next static export, retain vinext development, remove active Cloudflare plugins/Wrangler commands, add static preview/build verification. |
| `app/products/[slug]/page.tsx`, `app/[info]/page.tsx` | Generate all 17 products and five information pages from central data; disable unknown dynamic parameters. |
| `app/shop/page.tsx`, `components/shop.tsx` | Render static shop HTML and process search/category query parameters in the browser. |
| `components/store.tsx`, `components/shopping-tools.tsx` | Keep active navigation and basket-bar behavior correct with trailing slashes. |
| `app/robots.ts`, `app/sitemap.ts`, `lib/site-url.ts`, `.env.example` | Generate SEO files using the build-time production origin. Replace the request-dependent `app/robots.txt/route.ts` and `app/sitemap.xml/route.ts`. |
| `app/not-found.tsx`, `public/.nojekyll` | Branded Pages 404 with Home/Shop links and static asset compatibility. |
| `scripts/verify-static-export.mjs`, `scripts/preview-static.mjs` | Check the export and serve only static files for local verification. |
| `.github/workflows/deploy-pages.yml` | Install Node 22/pinned pnpm, typecheck, test, build, upload `out/`, and deploy to Pages on `main`. |
| `app/chatgpt-auth.ts`, `db/index.ts` (removed) | Remove unused request headers/auth redirects and Cloudflare database access. |
| `README.md`, `START-HERE.md`, `GITHUB-PAGES.md` | Document the actual static build and deployment setup. |

Local validation passed on 2026-10-05:

- Node **22.23.3**: `npm run typecheck`, `npm run build`, and all **seven** existing order/catalog tests passed. Changed implementation files also passed targeted ESLint; `git diff --check` passed.
- The build verifier found **27 required pages**, **17 product routes**, **29 original image assets**, static robots/sitemap, `.nojekyll`, and branded `404.html`.
- Headless Chrome verified all 27 direct routes on the plain static preview, query-string links, search/suggestions, filters/sorting, desktop card expansion, all **28** catalog variants' images/prices, Quick View, adding to cart, quantity/removal, reload persistence, checkout message contents, contact links, related products, recently viewed, and 404 links.
- Browser checks at **375px, 768px, and 1440px** found no horizontal overflow. Touch layouts exposed purchase controls without hover; desktop controls remained collapsed initially.
- No browser exceptions, failed asset responses, or `/_next/image` requests occurred during those checks.
- Catalog data, product-card CSS/components, image fallback logic, checkout behavior, and WhatsApp formatting were preserved. No actual WhatsApp message was sent.

The workflow is created locally. Live GitHub Actions execution, Pages settings, and Hostinger DNS changes have not been performed by these local checks.
