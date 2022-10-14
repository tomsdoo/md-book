function getThemeNames(): string[] {
  return ["chestnut", "dark", "forest", "halloween", "mint"];
}

function getCssPath(name: string): string {
  return `https://cdn.jsdelivr.net/npm/@tomsd/md-book/public/css/${name}.css`;
}

function applyTheme(name: string): void {
  const linkTag = document
    .getElementsByTagName("head")[0]
    .appendChild(document.createElement("link"));
  linkTag.setAttribute("rel", "stylesheet");
  linkTag.setAttribute("href", getCssPath(name));
}

export const theme = {
  apply: applyTheme,
  getCssPath,
  getNames: getThemeNames,
};
