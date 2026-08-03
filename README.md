# CSS Motion Lab

A small, dependency-free collection of tactile CSS motion studies. Each effect includes a live preview, an element inspector, documentation, and copy-ready source.

## Included effects

- **Folder Pocket** — layered documents and a restrained 3D pocket opening, with amber, graphite, and pearl themes.
- **Value Card Fan** — overlapping equal-width cards that part around the hovered or keyboard-focused value.

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

Node.js is pinned to `22.16.0` through `.node-version`. The project uses relative asset paths. Vite automatically discovers every `effects/*/index.html` entry, so new effect routes are included in production without manually editing the build config.

## Project structure

```text
.
├── index.html
├── package.json
├── vite.config.js
├── assets/
│   ├── index.js
│   └── site.css
└── effects/
    ├── registry.js
    ├── shared/
    │   ├── docs-shell.css
    │   └── docs-shell.js
    ├── folder/
        ├── index.html
        ├── page.css
        ├── folder.css
        └── app.js
    └── value-cards/
        ├── index.html
        ├── page.css
        ├── value-cards.css
        └── app.js
```

The component itself lives in `effects/folder/folder.css`. Shared documentation behavior lives in `effects/shared/`: Preview / Code / Docs tabs, clipboard access, pixel rulers, and live element measurements. The folder interaction remains pure CSS.

## Adding an effect

1. Add an item to `effects/registry.js`.
2. Create `effects/<slug>/index.html`, the effect stylesheet, a page stylesheet, and an ESM controller.
3. Import `setupEffectDocs` from `effects/shared/docs-shell.js` to reuse tabs, copying, and Inspect.
4. Run `npm run build`; Vite discovers the new HTML entry automatically.

## References

- Folder animation study inspired by [Aditya Sur / Inspora](https://x.com/insporadesign/status/2084184561123017088).
- Value-card interaction study inspired by [Ana Arsonist / Inspora](https://x.com/insporadesign/status/2084136446617702499).
- Source-panel interaction informed by [LDRS / UI Ball](https://uiball.com/ldrs/).
- Documentation and inspector information architecture informed by [Fluid Functionalism](https://www.fluidfunctionalism.com/docs/table), which is available under the MIT license.
