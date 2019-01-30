const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.js');

const DIST_PATH = path.resolve(__dirname, '../dist');

function getScssRules(mode) {
  let scssRules = {};
  if (mode === 'development') {
    scssRules = {
      test: /\.scss$/,
      // loader处理顺序从下往上
      use: [
        {
          loader: 'style-loader', // 将 JS 字符串生成为 style 节点
        },
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
      ],
    };
    return scssRules;
  }
  if (mode === 'production') {
    scssRules = {
      test: /\.scss$/,
      // loader处理顺序从下往上
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            // 指定一个 publicPath
            // 默认使用 webpackOptions.output中的publicPath
            // publicPath: '../css/'
          },
        },
        {
          loader: 'css-loader', // 将 CSS 转化成 CommonJS 模块
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: false,
            config: {
              path: 'postcss.config.js',  // 项目根目录创建此文件
            },
          },
        },
        {
          loader: 'sass-loader', // 将 Sass 编译成 CSS
        },
      ],
    }
  }
  return scssRules;
}

function getPlugins(mode) {
  let plugins = [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, '../src/server/server.template.ejs'),
      filename: 'server.ejs'
    })
  ];
  if (mode === 'development') {
    // todo 开发环境，使用模块的路径，而不是数字标识符构建hash，使未更改的模块，hash不变
    const { HashedModuleIdsPlugin } = webpack;
    plugins.push(new HashedModuleIdsPlugin());
    return plugins;
  }
  if (mode === 'production') {
    const { HashedModuleIdsPlugin, DefinePlugin } = webpack;
    plugins.push(
      // 压缩js
      new UglifyJSPlugin({
        exclude: /\.min\.js$/,
        extractComments: false, // 移除注释
        cache: true, // 开启缓存
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
        sourceMap: true,
        parallel: true, // 使用多进程并行运行来提高构建速度。 默认并发运行数os.cpus().length - 1
      }),

      // 提取css
      new MiniCssExtractPlugin({
        // 类似 webpackOptions.output里面的配置 可以忽略
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
      }),

      // 压缩css
      new OptimizeCssAssetsPlugin({
        /* assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true }, // 防止cssnano把浏览器前缀去掉
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true */
      }),

      // 当使用 process.env.NODE_ENV === 'production' 时，
      // 一些 库 可能针对具体用户的环境进行代码优化，
      // 从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),

      // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 用于生产环境。
      // 使未更改的模块，hash不变
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
    )
  }

  return plugins;
}

const webpackClientConfig = env => {
  const {NODE_ENV, mode} = env;
  console.log('mode: ', mode);
  console.log('NODE_ENV: ', NODE_ENV);
  const scssRules = getScssRules(mode);
  const plugins = getPlugins(mode);
  const webpackConfig = merge(base, {
    mode: mode,
    devtool: mode === 'production' ? 'none' : 'eval-source-map',
    entry: {
      app: './src/client/index.js',
    },
    output: {
      // 多入口输出，加hash，利用缓存，但是两次相同代码的build可能会产生不同的hash
      // 因为 webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest 导致hash改变。
      // 输出可能会因当前的 webpack 版本而稍有差异。新版本不一定有和旧版本相同的 hash 问题，但我们需要提取模板，以防万一。
      pathinfo: true,
      filename: 'js/[name].[chunkhash].js',
      path: DIST_PATH,
      publicPath: mode === 'production' ? '/public/' : '/', // publicPath 总是以斜杠(/)开头和结尾。
      // chunkFilename: '[name].js'
    },

    module: {
      rules: [
        scssRules
      ],
    },
    plugins: plugins,
    // 处理重复模块代码，提取到单独的chunk,CommonsChunkPlugin 已经从 webpack v4（代号 legato）中移除。
    // 把库提取到 vender 中，使得浏览器能使用缓存
    optimization: {
      runtimeChunk: 'single', // 提取模版，runtime到单独的chunk
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
  });

  if (mode === 'development') {
    webpackConfig.devServer = {
      contentBase: '../dist',
      compress: true, // 一切服务都启用gzip 压缩
      // publicPath: '/assets/',
      port: 9009,
      host: '127.0.0.1',
      overlay: true,
      historyApiFallback: {
        disableDotRule: true,
        /*rewrites: [
          { from: /^\/!*$/, to: '/assets/index.html' },
        ]*/
      },
    }
  }
  return webpackConfig;
};


module.exports = webpackClientConfig;
