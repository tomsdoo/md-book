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
            "https://raw.githubusercontent.com/tomsdoo/endecoder/main/README.md",
          ],
          hiddenPaths: [
            "https://raw.githubusercontent.com/tomsdoo/endecoder/main/README.md",
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
