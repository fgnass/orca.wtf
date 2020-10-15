const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const orca = require("./orca.deps");

// The absolute path of each orca module keyed by the name of its default export:
const modules = {};
orca.forEach(([file, name]) => {
  modules[name] = require.resolve(`./orca/desktop/sources/scripts/${file}`);
});

// Create a shimming rule for each Orca file:
const shimmingRules = orca.map(([file, name, ...imports]) => {
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
    orca: "./orca.js",
    pilot: "./pilot.js",
  },
  resolve: {
    // Browser implementations for Node.js modules
    fallback: {
      fs: require.resolve("./browser/fs"),
      dgram: require.resolve("./browser/dgram"),
      electron: require.resolve("./browser/electron"),
      "node-osc": require.resolve("./browser/node-osc"),
    },
  },
  output: {
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/",
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      ...shimmingRules,
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Use a simple Buffer mock
    new webpack.ProvidePlugin({
      Buffer: require.resolve("./browser/buffer"),
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
