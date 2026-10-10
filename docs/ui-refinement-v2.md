Magnet Masala — UI/UX refinement V2

Completed locally on 11 October 2026. The existing storefront was refined in place. Product records, exact variant prices, discount calculations, bundle totals, WhatsApp destinations and messages, routes, theme persistence and static deployment configuration remain intact. No publishing or deployment was performed.

The audit prioritized mobile hero height, inconsistent product rows, shopping controls that depended on hover, cached photographs staying faded, drawer focus restoration and light-theme notification contrast. Shared surfaces, typography hierarchy, promotional balance, pack selection, checkout readability and responsive images followed. Decorative changes were limited to spacing, quieter rings and badges, and restrained shadows.

The light theme retains warm ivory, white cards and burnt-orange actions. Complementary cream surfaces now distinguish featured products, quick seasonings, editorial content and the footer. Peach gradients are more balanced, product backdrops are softer, and card shadows are delicate. The dark theme uses warm charcoal and espresso layers, controlled bronze photography backdrops, softer borders and orange accents. The existing orange italic-serif treatment of “flavour.” is preserved.

| Design role | Light theme | Dark theme |
| --- | --- | --- |
| Page background | #FFFAF5 | #11100F |
| Product cards and interactive panels | #FFFFFF | #1C1916 |
| Editorial panels | #FFF5EC | #211D19 |
| Complementary section/footer surface | #F8F0E7 | #191411 |
| Primary text | #2C241E | #F8F4EF |
| Secondary text | #746254 | #C1B7AD |
| Primary accent | #BD4218 | #FF8B3D |
| Dividers and card borders | #E7D8CA | #43392F |
| Strong control borders | #A38B77 | #7F6A59 |
| Accent borders | #CD7546 | #A86C43 |
| Action text | #FFFFFF | #211105 |
| Primary action hover | #A93612 | #FFA363 |
| Sale badge | #B82D25 with white text | #C83329 with white text |
| Error surface/text | #FFF0EC / #A12D1A | #42221E / #FFB4A4 |

The font system remains Arial, Helvetica and sans-serif, with the existing Georgia/serif treatments retained where they give the dark theme its character. Light-theme headings remain bold sans-serif. Product titles, section labels, descriptions, prices and pack labels have consistent weights and line heights. No font dependency or external font request was added. Form text stays at 16px, and prices use tabular numerals.

The hero retains the heading, one 20% OFF / Limited Offer highlight, three jars, the arch, rings, product labels, the 100% flavour badge and existing shopping links. The discount sits directly below the heading with a soft surface, rounded corners and a smaller supporting label. The 100% badge is quieter and separated from jar labels. Tablet layouts use two columns; small screens stack the copy and showcase. No countdown was added because the project has no offer deadline or expiration behavior.

Product cards now stretch evenly within each row. Reserved title and description space keeps prices aligned, and purchase controls remain visible on desktop, touch devices and keyboard focus. Pack states use clear contrast, a checkmark and a subtle outline. The original product photography and product-specific scale adjustments are retained. The media areas share consistent proportions and warm backdrops. Desktop quick-seasoning cards use an image-and-copy layout, giving that section a distinct rhythm. Each card retains its existing single Add to Basket action and quick view.

The homepage still contains Shop by Occasion, Featured Blends, Curated Bundles, Everyday Essentials, Quick Seasonings and Ordering Steps. Warm surfaces separate sections without adding new content. Editorial photography remains large, bundle imagery uses coordinated peach, herb and saffron tones, and headings and section links have clearer spacing. Ordering cards are more compact. Footer text, dividers, links and contact actions use shared theme tokens.

Navigation has balanced logo sizing, icon alignment, active underlines and clearer mobile hierarchy. Bundles is highlighted when the section is in view instead of appearing active across the homepage. Main and mobile navigation have labels and current-page indicators. The mobile menu and basket drawer return keyboard focus when closed. Existing search suggestions, filtering, sorting, gallery zoom, basket notifications and mobile purchase controls are preserved.

Basket subtotals have stronger visual weight. Quantity buttons expose their full 44px touch targets, with a focus outline around the control. Basket quantities sit below prices, and product quantity labels have a clear gap before their controls. Checkout fields have clearer labels and themed surfaces. Invalid fields are connected to the alert message through aria-invalid and aria-describedby. Validation rules and order calculations remain unchanged.

| Before | After |
| --- | --- |
| 390px dark hero: approximately 932px tall; main showcase box starts at y=718px | Approximately 818px tall; showcase starts at y=596px |
| 390px light hero: approximately 952px tall; showcase starts at y=738px | Approximately 831px tall; showcase starts at y=609px |
| 768px hero: approximately 1133px dark / 1153px light | Approximately 560px dark / 574px light |
| 390px featured-card heights: 530, 530, 549, 530px | Uniform 588px cards with shopping controls consistently available |
| Desktop shopping controls hidden until hover/focus, with changing card presentation | Stable card heights and visible pack, basket and quick-view controls |
| Cached native photos could remain at loading opacity | Cached loads and early failures are handled after hydration |
| Light notification link had a dark hardcoded background and insufficient contrast | Theme-aware notification background, link and dismiss control |
| Quantity buttons were clipped by a 38px basket control | 46px container exposes the complete 44px buttons |
| Canonicals, sharing images and product schema missing | Canonicals and sharing metadata on 25 indexed routes; Product schema on 17 product pages |

Responsive photographs are prebuilt at 360px, 720px and full size, creating 87 WebP assets from the 29 existing JPEGs. Image proportions were verified. Hero and initial product-gallery images load eagerly with high priority; below-the-fold imagery remains lazy. Browser srcset/sizes selects the suitable asset, with original JPEGs and the existing generic fallback retained. The entire 360px asset set is 535,392 bytes versus 4,617,802 bytes for the originals, an 88.4% reduction for that size set. This is an asset-size comparison, not a measured page-speed score.

Static SEO preserves existing titles, descriptions, slugs, sitemap and robots directives. Metadata adds canonical URLs, Open Graph and Twitter sharing images using existing brand assets. Product JSON-LD describes the default pack shown on initial load, with its exact catalog price, SKU, weight and availability. Basket and checkout remain noindex. The static exporter still generates directory routes and needs no runtime image optimizer or server.

| File changed or added | Purpose |
| --- | --- |
| app/globals.css | Shared theme surfaces, hero, cards, responsive layouts, navigation, panels, forms and quantity controls; removed conflicting collapsed-card rules |
| app/page.tsx | Existing offer, decorative accessibility, responsive hero image sizes, quick-seasoning section class and homepage canonical |
| app/layout.tsx | Metadata base and inherited sharing metadata |
| app/shop/page.tsx | Shop canonical and sharing metadata |
| app/products/[slug]/page.tsx | Product canonical/sharing metadata, catalog-backed JSON-LD and breadcrumb label |
| app/[info]/page.tsx | Information-page canonical and sharing metadata |
| app/contact/page.tsx | Contact description, canonical and sharing metadata |
| components/store.tsx | Active navigation, mobile menu hierarchy and accessibility, menu/drawer focus restoration |
| components/theme.tsx | Theme-toggle pressed-state feedback |
| components/checkout.tsx | Accessible invalid-field and validation-message association |
| components/product-card.tsx | Responsive product-image sizing |
| components/product-gallery.tsx | Priority loading for the initial photograph |
| components/product-image.tsx | Responsive local WebP assets, cached-load handling, early-failure and JPEG fallback |
| lib/seo.ts | Shared static page-metadata helper |
| lib/product-image-widths.json | Generated image-width manifest |
| public/products/optimized/ | 87 responsive WebP assets |
| scripts/optimize-product-images.mjs | Offline asset generation using Next's existing sharp dependency |
| README.md | Correct dark-default documentation and image-regeneration instructions |
| docs/ui-refinement-v2.md | This design and verification report |

Verification passed: npm run lint, npm run typecheck, all seven existing catalog/WhatsApp/bundle tests, npm run build, static-export verification and git diff --check. A clean final build replaced stale CSS from the incremental cache, and the exported quantity styles were checked directly. The export contains 27 pages, including all 17 products, with original image files, sitemap, robots and the branded 404.

Browser review used local headless Chrome with dark and light themes at 360, 390, 430, 768, 1024 and 1440px. All 84 page/theme/width combinations passed checks for page overflow, main-heading count, visible image loading, uniform product rows, aligned prices and visible shopping controls. The affected product, basket and checkout pages were checked again after the final quantity-spacing change. Bundles, editorial content, quick seasonings and the footer were captured as homepage sections. Forty-eight final page/section screenshots are available, alongside 22 interaction-state screenshots and four gallery screenshots.

Interaction checks passed in both themes at desktop and mobile sizes: default theme and preference persistence, keyboard search selection, no-result recovery, category filters, sorting, pack prices, quick-view focus trapping and restoration, add-to-basket announcements, basket persistence, quantity updates, removal/empty states, checkout validation, review-heading focus, and exact WhatsApp message content. Additional checks passed for bundle totals, drawer focus restoration, gallery thumbnails and zoom, direct-order messages, cached images, deliberately blocked-WebP fallback and reduced-motion behavior. No runtime exceptions were recorded. Actual WhatsApp messages were not sent.

The contrast check found zero failures across 2,148 sampled text records on solid surfaces. Gradient and photographic areas were visually inspected. This review is not a full independent WCAG certification. Browser testing covered Chrome; Safari, Firefox, physical devices and production Core Web Vitals were not measured. No blocking implementation issue remains from the local checks. Product-image updates should be followed by node scripts/optimize-product-images.mjs and a rebuild.

| Review artifact | Location |
| --- | --- |
| Final layout records | [metrics.json](/private/tmp/magnet-v2-final/metrics.json) |
| Shopping and contrast checks | [report.json](/private/tmp/magnet-v2-flows/report.json) |
| Gallery, bundles, drawer focus and touch targets | [report.json](/private/tmp/magnet-v2-extras/report.json) |
| Dark desktop hero | [Before](/private/tmp/magnet-v2-baseline/dark-1440-home.png) · [After](/private/tmp/magnet-v2-final/dark-1440-home.png) |
| Light desktop hero | [Before](/private/tmp/magnet-v2-baseline/light-1440-home.png) · [After](/private/tmp/magnet-v2-final/light-1440-home.png) |
| Dark mobile hero | [Before](/private/tmp/magnet-v2-baseline/dark-390-home.png) · [After](/private/tmp/magnet-v2-final/dark-390-home.png) |
| Light mobile hero | [Before](/private/tmp/magnet-v2-baseline/light-390-home.png) · [After](/private/tmp/magnet-v2-final/light-390-home.png) |
| Product cards | [Dark](/private/tmp/magnet-v2-final/dark-1440-featured.png) · [Light](/private/tmp/magnet-v2-final/light-1440-featured.png) |
| Mobile basket | [Dark](/private/tmp/magnet-v2-final/dark-390-cart.png) · [Light](/private/tmp/magnet-v2-final/light-390-cart.png) |
| Mobile navigation | [Dark](/private/tmp/magnet-v2-flows/dark-390-navigation.png) · [Light](/private/tmp/magnet-v2-flows/light-390-navigation.png) |
| Checkout validation | [Dark](/private/tmp/magnet-v2-flows/dark-390-checkout-validation.png) · [Light](/private/tmp/magnet-v2-flows/light-390-checkout-validation.png) |

Screenshot and browser-check artifacts are local files in /private/tmp. The storefront preview remains available at http://127.0.0.1:4173. The final static site is in out/. Source changes are left uncommitted for review.
