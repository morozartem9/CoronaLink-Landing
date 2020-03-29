const path = require("path");
const merge = require("webpack-merge");
const common = require("./common.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    publicPath: "./",
    path: path.join(__dirname, "../dist"),
    filename: "bundle.[contenthash].js",
  },
});
