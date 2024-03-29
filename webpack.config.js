const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  module: {
    //loaders
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    static: ["src"],
    compress: true,
    port: 9000,
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Development",
      template: path.resolve(__dirname, "src/public", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      // patterns: [
      //   {
      //     from: path.resolve(__dirname, "public/assets/imgs"),
      //     to: "img",
      //   },
      // ],
      patterns: [{ from: "./src/public/assets/imgs", to: "img" }],
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
