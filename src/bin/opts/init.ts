import { join } from "path";
import { writeFile } from "fs/promises";

const htmlFileContent = `<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/npm/@tomsd/md-book/public/js/index.js"></script>
    <script>
      MdBook.start({
        mdFiles: {
          indexedPaths: [
            "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/about.md",
            "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/getting_started.md",
            "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/customize_styles.md",
            "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/make_theme.md",
            "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/css_variables.md"
          ],
          hiddenPaths: [
            "https://raw.githubusercontent.com/tomsdoo/md-book/main/public/md/test_content.md"
          ]
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

export async function initializeHtmlFile(directoryPath: string): Promise<any> {
  const filePath = join(directoryPath, "./index.html");
  await writeFile(filePath, htmlFileContent);
}
