const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  devServer: {
    port: 8000,
    open: true,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'meco',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover',
        'application-name': 'testing software',
        description: 'robot control panel testing software',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
