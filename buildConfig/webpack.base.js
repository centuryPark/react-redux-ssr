const webpackBase = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      /* {
        enforce: 'pre',
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, */
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // url-loader内置了file-loader,不同的是，当文件小于1024字节时，会转换为base64编码
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '1024',
              outputPath: 'img/',
              publicPath: '../img',
            },
          },
        ],
      },
    ]
  }
};

module.exports = webpackBase;

