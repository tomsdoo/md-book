const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const USE_CACHE = false;

module.exports = {
  // devtool: "inline-source-map",
  // mode: "development",
  mode: "production",
  plugins: [new VueLoaderPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          configFile: path.join(__dirname, "tsconfig.client.json"),
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".vue"],
    modules: ["node_modules"],
    alias: {
      vue: "vue/dist/vue.cjs.js",
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  entry: {
    index: "./src/client/use-index.ts",
  },
  output: {
    path: path.join(__dirname, "public/js"),
    filename: "[name].js",
  },
  ...(USE_CACHE
    ? {
        cache: {
          type: "filesystem",
          buildDependencies: {
            config: [__filename],
          },
        },
      }
    : {}),
};
