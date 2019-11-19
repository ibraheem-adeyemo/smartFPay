const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const glob = require("glob")

module.exports = {
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx"]
  },
  entry: {
    "bundle.js": glob.sync("build/static/?(js|css)/*.?(js|css)").map(f => path.resolve(__dirname, f)),
  },
  output: {
    filename: "../build/static/js/bundle.min.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new UglifyJsPlugin()],
}