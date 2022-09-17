#!/usr/bin/env node
import { Command } from "commander";

import { cwd } from "process";
import { join } from "path";
import { stat } from "fs/promises";

import { initializeHtmlFile } from "./opts/";

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

  const getDirectoryPath = async () => {
    const directoryPath = opts.directory && join(cwd(), opts.directory as string);
    return directoryPath && await stat(directoryPath)
      .then(r => r.isDirectory() ? directoryPath : undefined)
      .catch(e => undefined);
  };

  const directoryPath = await getDirectoryPath();

  if (opts.init as boolean && directoryPath) {
    await initializeHtmlFile(directoryPath);
  } else if (opts.serve as boolean && directoryPath) {
    console.log(directoryPath);
    console.log("serve");
  }else{
    program.help();
  }

  ///
})()
  .then(() => {})
  .catch(() => {});
