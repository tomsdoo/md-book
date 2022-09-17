import { join } from "path";
import { serveDocuments } from "./src/bin/opts/serve";

(async () => {
  ///
  await serveDocuments(join(__dirname, "./public"));

  ///
})()
  .then(() => {})
  .catch(() => {});
