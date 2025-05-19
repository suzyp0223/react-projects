const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8000,
    open: true,
    watchFiles: ['src/**/*', 'index.html'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'project',
      template: './index.html',
      inject: 'body',
      favicon: './favicon.ico',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // ✅ JS 파일에도 babel-loader 적용
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource', // 또는 asset/inline, 필요 시 구분
      },
      // {
      //   test: /\.worker\.js$/,
      //   use: { loader: 'worker-loader' },
      // },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
