import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/bin/mdbook.ts"],
  clean: true,
  dts: false,
  minify: true,
  format: "esm",
  outDir: "bin",
  tsconfig: "tsconfig.bin.json",
  target: false,
  outputOptions: {
    codeSplitting: false,
  },
});
