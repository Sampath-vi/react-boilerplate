import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
import Dotenv from 'dotenv-webpack';
import HtmlWebpack from 'html-webpack-plugin';
import CopyWebpack from 'copy-webpack-plugin';
import ProgressBar from 'progress-bar-webpack-plugin';
import ForkTsChecker from 'fork-ts-checker-webpack-plugin'

const { PORT = 8085 } = process.env;
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default {
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
