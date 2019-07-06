const path = require('path')
const Fiber = require('fibers')
const rootPath = path.resolve(__dirname, '../')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: Fiber
            }
          }
        ]
      },
      // この設定は .ts ファイル、.tsx ファイルと .vue ファイルの <script lang='ts'> ブロック両方に適用される
      // see: http://tyru.hatenablog.com/entry/2018/05/18/015231
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      // Nuxtのデフォルトアセットローダー
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1kB
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1kB
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@': rootPath,
      '~': rootPath,
      vue$: 'vue/dist/vue.esm.js'
    }
  }
}
