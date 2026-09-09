# CozyNest

A complete React + Vite rebuild of the original CozyNest storefront. The original photography, existing product names, and customer review excerpts are reused in an ivory, olive-espresso, and warm neutral editorial design. The old Tailwind/vanilla application has been removed. The original Apache license is retained.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
npm run build
npm run preview
npm test
```

On Windows PowerShell with script execution restricted, use `npm.cmd` instead of `npm`.

## Structure

- `src/components/`: header, search, native dialog overlays, product cards/details, cart drawer, newsletter, footer, WhatsApp, icons.
- `src/pages/`: home, URL-driven shop, login/register, journal articles, account, checkout preview, store information and 404.
- `src/data/`: single product catalog, categories, journal content and asset lookup.
- `src/hooks/`: separate cart, wishlist and auth contexts with reusable hook exports.
- `src/utils/`: safe browser storage, cart validation and currency-safe totals, WhatsApp URL generation.
- `src/config/store.js`: store name, currency/locale, WhatsApp number, social URLs.
- `src/index.css`: design tokens and responsive layouts, focus states and reduced-motion support.
- `tests/`: state utility tests and browser regression coverage.

## Features

React Router routes include `/`, `/shop`, `/product/:id`, `/cart`, `/wishlist`, `/login`, `/register`, `/account`, `/orders`, `/checkout`, `/journal`, `/journal/:id`, `/about`, `/contact`, `/shipping`, `/privacy`, `/terms`, and a fallback 404.

Cart and wishlist persist on this browser. Quantities range from 1–99 and cart totals use integer cents. Search covers product names, categories and descriptions. Filters and sort live in URL query parameters, including new arrivals and sale. Dialogs use the browser's modal focus handling, Escape close, outside-click close, focus restoration and scroll locking.

## Before a real launch

1. Set `VITE_WHATSAPP_NUMBER` in `.env` (see `.env.example`) or edit `src/config/store.js`. Use international digits only, with no `+`, spaces or punctuation. Restart/rebuild after changes. Add actual social URLs in the same config.
2. Replace the explicitly labeled local demo auth adapter in `StoreProvider.jsx` with a real authentication provider. The demo accepts any valid email and a made-up password of 8+ characters. It does not verify credentials, create server accounts, or store passwords. Registration validates fields but only stores a demo profile. Remember me uses localStorage; otherwise the session uses sessionStorage. Google and password recovery intentionally explain that no provider is connected.
3. Connect server-side inventory, authoritative pricing, shipping, taxes, payment and order creation. `/checkout` is only a preview. It never collects payment details or places orders.
4. Review all catalog content. Existing $25.75 prices are retained; newly named pieces and sample crossed-out prices need merchant approval. Ratings remain empty because no verified per-product ratings were supplied. Existing review excerpts are retained, not newly verified. Material, shipping and return information requests confirmation rather than inventing specifications. The gallery supports multiple images but only one unique image per product was supplied.
5. Connect an email subscription service. Current newsletter saves only on this device, and its confirmation says so. No emails are sent.
6. Publish actual privacy, terms, shipping and return policies, contact details and product availability. Current information pages explain the preview status.
7. Configure the production host to serve `index.html` for non-asset routes (SPA fallback), and set a production absolute Open Graph image URL/canonical domain. Fonts are bundled locally, with readable system font fallbacks.

## Browser checks

`npm run test:e2e` runs Playwright against installed Chrome and Edge. Firefox runs when its Playwright browser is installed (`npx playwright install firefox`). Tests start the Vite server automatically and use isolated test contexts. Reports are written under `test-results/` and are ignored by Git.
