require("dotenv").config();
const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpack = require("html-webpack-plugin");
const CopyWebpack = require("copy-webpack-plugin");
const ProgressBar = require("progress-bar-webpack-plugin");
const ForkTsChecker = require("fork-ts-checker-webpack-plugin");

const { PORT = 8085 } = process.env;

module.exports = {
  stats: "minimal",

  mode: "development",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    hot: true,
    port: PORT,
    historyApiFallback: true,
    client: {
      logging: "none",
    },
  },

  entry: {
    main: "./src/index.tsx",
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: "file-loader?name=fonts/[name].[ext]",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.svg$/,
        use: ["svg-inline-loader"],
      },
      { 
        test: /\.css$/, 
        use: ["style-loader", "css-loader"] 
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".css"],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpack({
      template: "./src/index.html",
    }),
    new CopyWebpack({
      patterns: [
        {
          from: "./public",
          noErrorOnMissing: true
        },
      ],
    }),
    new ProgressBar(),
    new ForkTsChecker({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};
