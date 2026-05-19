# Om Bakhshi portfolio

A React, Tailwind CSS, and Framer Motion portfolio site inspired by the classic Windows XP blue screen aesthetic.

## Run Locally

Do not open `index.html` directly in Safari or another browser. This is a Vite app, so the source file needs to be served by the dev server.

```bash
npm install
npm run dev
```

Open the local URL that Vite prints, usually:

```text
http://127.0.0.1:5173/
```

If that port is busy, Vite will automatically choose another port.

## Production Build

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` type-checks and builds the production app.
- `npm run preview` serves the production build locally.
- `npm run lint` checks the code with ESLint.

## Notes

The app includes a fallback message in `index.html` for direct `file://` opens, but the actual React experience runs through Vite or a deployed static build.
