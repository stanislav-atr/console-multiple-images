const path = require("path");

module.exports = {
  entry : "./index.js",
  output : {
    path: path.resolve(__dirname, "dist"),
    filename: " bundle.js",
    clean: true,
  },
  mode: 'development',
//   watch: true,
//   watchOptions: {
//       ignored: '**/node_modules',
//   },
};