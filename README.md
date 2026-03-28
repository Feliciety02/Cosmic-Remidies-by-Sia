# Cosmic Remedies by Sia

Next.js storefront and admin dashboard for Cosmic Remedies by Sia.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Homepage Content Editing

The homepage storefront copy is persisted in:

```text
.content/homepage.json
```

The admin content editor at `/admin/content` updates that file through:

```text
/api/content/homepage
```

At the moment, the live content connection is implemented for the homepage editor only. Other admin content pages still need to be wired to their storefront routes.
