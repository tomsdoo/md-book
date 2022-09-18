#!/usr/bin/env node
import { Command } from "commander";

import { cwd } from "process";
import { join } from "path";
import { stat } from "fs/promises";

import { initializeHtmlFile, serveDocuments } from "./opts/";

const program = new Command();
const commandname = "mdbook";

program
  .option("--directory <directory>", "path/to/directory")
  .option("--serve", "serve document server")
  .option("--init", "initialize html file");

program.on("--help", () => {
  console.log("");
  console.log("Example call:");
  console.log(`  $${commandname} --help`);
  console.log(`  $${commandname} --init --directory path/to/directory`);
  console.log(`  $${commandname} --serve --directory path/to/directory`);
});

(async () => {
  ///

  program.parse(process.argv);

  const opts = program.opts();

  if (Object.values(opts).length === 0) {
    program.help();
  }

  const getDirectoryPath = async (): Promise<string | false | undefined> => {
    const directoryPath =
      (opts.directory as boolean) && join(cwd(), opts.directory as string);
    return (
      Boolean(directoryPath) &&
      (await stat(directoryPath as string)
        .then((r) => (r.isDirectory() ? directoryPath : undefined))
        .catch((e) => undefined))
    );
  };

  const directoryPath = await getDirectoryPath();

  if ((opts.init as boolean) && Boolean(directoryPath)) {
    await initializeHtmlFile(directoryPath as string);
  } else if ((opts.serve as boolean) && Boolean(directoryPath)) {
    await serveDocuments(directoryPath as string);
  } else {
    program.help();
  }

  ///
})()
  .then(() => {})
  .catch(() => {});
