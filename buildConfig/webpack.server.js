const path = require('path');
// 引入的node包例如express，不打包到bundle里面，保持引用
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const webpackBase = require('./webpack.base');

const DIST_PATH = path.resolve(__dirname, '../public');

const serverConfig = {
  target: 'node',
  mode: 'production',
  entry: ['@babel/polyfill', './src/server/index.js'],
  output: {
    filename: 'server.bundle.js',
    path: DIST_PATH,
    publicPath: '/',
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js', // 项目根目录创建此文件
              },
            },
          },
          {
            loader: 'sass-loader', // 将 Sass 编译成 CSS
          },
        ]
      }
    ]
  },
  plugins: []
};

module.exports = merge(webpackBase, serverConfig);
