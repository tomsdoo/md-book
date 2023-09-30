import { join, relative } from "path";
import { writeFile } from "fs/promises";
import fg from "fast-glob";

async function getMdFiles(directoryPath: string): Promise<string[]> {
  return await fg(join(directoryPath, "**/*.md")).then((filePaths) =>
    filePaths.map((filePath) => "/" + relative(directoryPath, filePath))
  );
}

const defaultIndexedPaths = [
  "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/about.md",
  "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/getting_started.md",
  "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/customize_styles.md",
  "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/make_theme.md",
  "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/css_variables.md",
];

const defaulthiddenpaths = [
  "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/test_content.md",
];

function generateHtmlFileContent(
  indexedPaths: string[],
  hiddenPaths: string[]
): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tomsd/md-book/public/js/index.js"></script>
    <script>
      MdBook.start({
        mdFiles: {
          indexedPaths: ${JSON.stringify(indexedPaths)},
          hiddenPaths: ${JSON.stringify(hiddenPaths)}
        },
        header: { title: "md book" },
        footer: {
          text: "powered by ",
          link: {
            href: "https://www.npmjs.com/package/@tomsd/md-book",
            text: "md-book"
          }
        }
      });
    </script>
  </head>
  <body></body>
</html>
`;
}

export async function initializeHtmlFile(
  directoryPath: string,
  adhoc: boolean
): Promise<any> {
  const filePath = join(directoryPath, "./index.html");
  await writeFile(
    filePath,
    generateHtmlFileContent(
      adhoc ? await getMdFiles(directoryPath) : defaultIndexedPaths,
      adhoc ? [] : defaulthiddenpaths
    )
  );
}
