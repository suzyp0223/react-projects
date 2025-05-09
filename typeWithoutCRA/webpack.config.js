const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development", // 또는 "production"
  devtool: prod ? "hidden-source-map" : "eval",
  entry: "./src/index.tsx", // 앱의 진입점
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // 생략 가능한 확장자
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // TypeScript 처리
        use: ["babel-loader", "ts-loader"],
        // exclude: /node_modules/,
      },
      {
        test: /\.css$/, // CSS 처리
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // 이미지 로더
        type: "asset/resource",
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // 이전 빌드 결과 삭제
  },

  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html", // public 폴더 안에 있는 HTML 템플릿
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true, // SPA 라우팅 지원
    port: 3000,
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },

    open: true, //개발 서버 실행 시 브라우저가 자동으로 열림.
  },
};
