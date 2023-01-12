const path = require("path");

module.exports = {
  entry: "./public/js/script.js",
  output: {
    filename: "script.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
};
