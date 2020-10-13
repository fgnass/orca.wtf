const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const orca = require("./orca.deps");

// The absolute path of each orca module keyed by the name of its default export:
const modules = {};
orca.forEach(([file, name]) => {
  modules[name] = require.resolve(`./orca/desktop/sources/scripts/${file}`);
});

// Create a shimming rule for each Orca file:
const rules = orca.map(([file, name, ...imports]) => {
  const use = [
    {
      loader: "exports-loader",
      options: {
        type: "module",
        exports: {
          syntax: "default",
          name,
        },
      },
    },
  ];
  if (imports.length) {
    use.push({
      loader: "imports-loader",
      options: {
        imports: imports.map((name) => ({
          name,
          moduleName: modules[name],
        })),
      },
    });
  }
  return {
    test: require.resolve(`./orca/desktop/sources/scripts/${file}`),
    use,
  };
});

module.exports = {
  entry: {
    index: "./index.js",
    orca: "./orca.js",
    pilot: "./pilot.js",
  },
  mode: "development",
  devtool: "inline-source-map",
  resolve: {
    // Browser implementations for Node.js modules
    fallback: {
      fs: require.resolve("./browser/fs"),
      dgram: require.resolve("./browser/dgram"),
      electron: require.resolve("./browser/electron"),
      "node-osc": require.resolve("./browser/node-osc"),
    },
  },
  module: {
    rules,
  },
  plugins: [
    // Use a simple Buffer mock
    new webpack.ProvidePlugin({
      Buffer: require.resolve("./browser/buffer"),
    }),
    new CopyPlugin({
      patterns: [
        { from: "public" },
        { from: "orca/desktop/sources/links", to: "orca/links" },
        { from: "pilot/desktop/sources/links", to: "pilot/links" },
        { from: "pilot/desktop/sources/media", to: "pilot/media" },
      ],
    }),
  ],
};
