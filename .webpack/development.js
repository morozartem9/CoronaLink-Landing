const merge = require("webpack-merge");
const common = require("./common.js");

module.exports = () => merge(common(), {
  mode: "development",
  devServer: {
    port: 3000,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
});
