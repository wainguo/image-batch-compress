const path = require('path');

const assetsPath = path.join(__dirname, "dist");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    // filename: 'bundle.js',
    // path: path.resolve(__dirname, 'dist')
    path: assetsPath
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        use:[
          {
            loader: 'file-loader',
            options: {
              hash: "sha512",
              digest: "hex",
              name: "[name].[hash:8].[ext]"
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};
