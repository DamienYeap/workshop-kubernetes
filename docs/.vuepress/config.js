module.exports = {
  plugins: {
    sitemap: {
      hostname: "https://yeap-atelier-kubernetes.netlify.com",
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
        algolia: {},
        nav: [
          { text: "Accueil", link: "/" },
          { text: "Prérequis", link: "/prerequis.md" },
          { text: "Concepts", link: "/concepts.md" },
          { text: "Ateliers", link: "/ateliers/" },
          { text: "Liens", link: "/liens.md" },
        ],
        sidebar: [
          {
            title: "Concepts",
            path: "/concepts",
            collapsable: true,
          },
          {
            title: "Ateliers",
            path: "/ateliers/",
            collapsable: true,
            sidebarDepth: 1,
            children: ["/ateliers/kubeconfig/"],
          },
        ],
      },
    },
  },
};
