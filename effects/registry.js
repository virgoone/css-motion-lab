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
  }
];

export const getEffect = (slug) => effects.find((effect) => effect.slug === slug);
