# CSS Motion Lab

A small, dependency-free collection of tactile CSS motion studies. Each effect includes a live preview and copy-ready source.

## Included effects

- **Folder Pocket** — layered documents and a restrained 3D pocket opening, with amber, graphite, and pearl themes.

## Development

From the project directory:

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

Create and inspect the production build with:

```bash
npm run build
npm run preview
```

## Cloudflare Pages

Import this GitHub repository into Cloudflare Pages and use:

```text
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: /
```

Node.js is pinned to `22.16.0` through `.node-version`. The project uses relative asset paths and includes both HTML entry points in the Vite build, so the index and `/effects/folder/` detail route work in the production output.

## Project structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── assets/
│   └── site.css
└── effects/
    └── folder/
        ├── index.html
        ├── page.css
        ├── folder.css
        └── app.js
```

The component itself lives in `effects/folder/folder.css`. The detail page uses a small amount of vanilla JavaScript for theme switching and clipboard access; the folder interaction remains pure CSS.

## References

- Folder animation study inspired by [Aditya Sur / Inspora](https://x.com/insporadesign/status/2084184561123017088).
- Source-panel interaction informed by [LDRS / UI Ball](https://uiball.com/ldrs/).
