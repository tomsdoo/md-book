#!/usr/bin/env node
import { Command } from "commander";

const program = new Command();
const commandname = "mdbook";

program
  .option("--serve", "serve document server")
  .option("-c --output <directory>", "path/to/directory")
  .option("--init", "initialize html file");

program.on("--help", () => {
  console.log("");
  console.log("Example call:");
  console.log(`  $${commandname} --help`);
  console.log(`  $${commandname} --init --output path/to/directory`);
  console.log(`  $${commandname} --serve`);
});

(async () => {
  ///

  program.parse(process.argv);

  const opts = program.opts();

  if (Object.values(opts).length === 0) {
    program.help();
  }

  if (opts.init as boolean) {
    console.log("init");
  } else if (opts.serve as boolean) {
    console.log("serve");
  }

  ///
})()
  .then(() => {})
  .catch(() => {});
