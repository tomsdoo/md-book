import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/bin/mdbook.ts"],
  clean: true,
  dts: false,
  splitting: false,
  minify: true,
  format: "esm",
  outDir: "bin",
  tsconfig: "tsconfig.bin.json",
});
