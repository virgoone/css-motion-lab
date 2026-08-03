# CSS Motion Lab

A small, dependency-free collection of tactile CSS motion studies. Each effect includes a live preview and copy-ready source.

## Included effects

- **Folder Pocket** — layered documents and a restrained 3D pocket opening, with amber, graphite, and pearl themes.

## Run locally

From the project directory:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Project structure

```text
.
├── index.html
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
