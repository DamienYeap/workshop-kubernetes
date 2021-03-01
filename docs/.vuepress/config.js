module.exports = {
  head: [["link", { rel: "icon", type: "image/png", href: "/favicon.png" }]],
  plugins: {
    sitemap: {
      hostname: "https://yeap-atelier-kubernetes.netlify.app",
      exclude: ["/404"],
      dateFormatter: (val) => {
        return new Date().toISOString();
      },
    },
    "vuepress-plugin-zooming": {
      selector: ".md-image",
      delay: 1000,
      options: {
        bgColor: "white",
        zIndex: 10000,
      },
    },
    "@silvanite/markdown-classes": {
      prefix: "md",
      rules: ["image"],
    },
    "vuepress-plugin-code-copy": {
      align: "top",
      staticIcon: false,
      backgroundTransition: true,
    },
  },
  locales: {
    "/": {
      lang: "fr-FR",
      title: "Ateliers Kubernetes",
      description: "Atelier pour découvrir kubernetes",
    },
  },
  themeConfig: {
    editLinkText: "Edit cette page sur Github",
    lastUpdated: "Mis à jour le",
    repo: "yeapAi/workshop-kubernetes",
    repoLabel: "Contribue !",
    docsRepo: "yeapAi/workshop-kubernetes",
    docsDir: "docs",
    docsBranch: "main",
    editLinks: true,
    locales: {
      "/": {
        selectText: "Languages",
        label: "Français",
        algolia: {
          apiKey: "852f323ddf7de2b586ba06a76963d00c",
          indexName: "formation",
        },
        nav: [
          { text: "Accueil", link: "/" },
          { text: "Prérequis", link: "/prerequis.md" },
          { text: "Concepts", link: "/concepts.md" },
          { text: "Ateliers", link: "/ateliers/" },
          { text: "Liens", link: "/liens.md" },
        ],
        sidebar: [
          {
            title: "Prérequis",
            path: "/prerequis",
            collapsable: true,
          },
          {
            title: "Concepts",
            path: "/concepts",
            collapsable: true,
          },
          {
            title: "Ateliers",
            path: "/ateliers/",
            collapsable: true,
            sidebarDepth: 0,
            children: [
              "/ateliers/kubeconfig/",
              "/ateliers/kubectl/",
              "/ateliers/namespace/",
              "/ateliers/apply/",
              "/ateliers/application/",
            ],
          },
        ],
      },
    },
  },
};
