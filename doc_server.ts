import { join, dirname } from "path";
import { serveDocuments } from "./src/bin/opts/serve";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(new URL(import.meta.url)));

(async () => {
  ///
  await serveDocuments(join(__dirname, "./public"));

  ///
})()
  .then(() => {
    // nop
  })
  .catch(() => {
    // nop
  });
