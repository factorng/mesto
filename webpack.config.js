const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = (env) => {
  const cssLoader = [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1
      }
    }
  ]
  const rules = [{
      test: /\.(png|woff|svg|woff2|jpg)$/,
      loader: 'file-loader'
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      test: /\.css$/,
      loader: cssLoader
    }
  ]
  let sourceMap = 'source-map';
  if (env.mode === 'production') {
    cssLoader.push('postcss-loader');
    sourceMap = 'cheap-module-source-map';
    rules.push({
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    });
  }

  return {
    entry: {
      main: './src/pages/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]-[chunkhash].js'
    },
    devServer: {
      port: 8089,
    },
    devtool: sourceMap,
    mode: env.mode,
    module: {
      rules: rules
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      })
    ]
  }
}
