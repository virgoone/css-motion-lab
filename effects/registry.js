export const effects = [
  {
    id: "001",
    slug: "folder",
    title: "Folder Pocket",
    shortTitle: "Folder",
    category: "3D interaction",
    description: "Layered paper and a restrained pocket opening, built with HTML and CSS.",
    href: "./effects/folder/",
    themes: ["Amber", "Graphite", "Pearl"],
    status: "Ready"
  },
  {
    id: "002",
    slug: "value-cards",
    title: "Value Card Fan",
    shortTitle: "Value Cards",
    category: "Card interaction",
    description: "An overlapping stack that parts around the hovered or focused value card.",
    href: "./effects/value-cards/",
    themes: ["Pastel"],
    status: "Ready"
  },
  {
    id: "003",
    slug: "document-folder",
    title: "Document Folder",
    shortTitle: "Document Folder",
    category: "3D collection",
    description: "A three-stage archive that opens, raises its documents, and fans the rear stamp.",
    href: "./effects/document-folder/",
    themes: ["Archive Green"],
    status: "Ready"
  },
  {
    id: "004",
    slug: "theme-switcher",
    title: "Glass Theme Switcher",
    shortTitle: "Theme Switcher",
    category: "Theme control",
    description: "A light and dark switch driven by one moving glass lens and a warm light pool.",
    href: "./effects/theme-switcher/",
    themes: ["Light", "Dark"],
    status: "Ready"
  }
];

export const getEffect = (slug) => effects.find((effect) => effect.slug === slug);
