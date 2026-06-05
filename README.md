# Welcome to your Lovable project

## Project info

This repository is the GitHub copy for **Cosmic Remedies by Sia**.

Open the matching Lovable project from your Lovable dashboard and use the chat there to make changes. When the project is connected to this repository in Lovable's GitHub settings, changes made in Lovable are committed here automatically, and changes pushed to the active synced branch are reflected back in Lovable.

> Add the Lovable project URL here when you have it:
>
> `https://lovable.dev/projects/<project-id>`

## How can I edit this code?

There are several ways of editing the application.

**Use Lovable**

Open the matching Lovable project and start prompting in chat. Changes made via Lovable are committed automatically to this repository when GitHub sync is connected.

**Use your preferred IDE**

If you want to work locally, clone this repository and push changes to the branch currently selected in Lovable. Pushed changes to the active synced branch will also be reflected in Lovable.

The only requirement is having Node.js and npm installed.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project details

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
