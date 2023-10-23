const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./index.tsx",

  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundel.[fullhash].js",
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new ReactRefreshPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
