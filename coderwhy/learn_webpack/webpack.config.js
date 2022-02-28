const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
module.exports = {
  mode: 'development',
  devtool: 'source-map', // 使错误可以定位到哪一行
  // watch: true, // 配置后不需要再执行npm run build,可刷新页面后更新
  entry: './src/main.js',
  output: {
    // path: 'D:/study/coderwhy/learn_webpack/build' // 必须写绝对路径
    path: path.resolve(__dirname, './build'), // __dirname获取webpack.config.js所在的绝对路径
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 正则表达式
        // 1.loader的写法(语法糖)
        // loader: 'css-loader'

        // 2.完整的写法
        use: [
          // { loader: 'css-loader' }
          // loader的执行顺序是从右往左(或者说从下到上),所以css-loader需要写在style-loader的后面,不然打包会报错
          'style-loader', // 将解析后的css插入到style标签中
          'css-loader', // 将css文件模块解析
          'postcss-loader' // 使用postcss.config.js配置文件
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         require('autoprefixer')
          //       ]
          //     }
          //   }
          // }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },

      // css和less的合并写法
      // {
      //   test: /\.(less|css)$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'less-loader'
      //   ]
      // }

      // 在解析图片时，使用了url-loader,file-loader可以不要了
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       // outputPath: 'img',
      //       name: 'img/[name]_[hash:6].[ext]'
      //     }
      //   }
      // },

      // webpack5以上的版本中不建议使用file-loader或url-loader了，因为内置了，不需要在装包了，直接使用asset
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       // outputPath: 'img',
      //       name: 'img/[name]_[hash:6].[ext]',
      //       limit: 50 * 1024 // 小于50kb的图片才会被转为base64
      //     }
      //   }
      // }

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name]_[hash:6][ext]' // 注意这里使用的是filename,并且后缀名不需要加.
        },
        parser: {
          dataUrlCondition: {
            maxSize: 50 * 1024
          }
        }
      },

      // 使用file-loader打包字体
      // {
      //   test: /\.(eot|ttf|woff2?)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: 'font/[name]_[hash:6].[ext]'
      //     }
      //   }
      // }

      // 使用asset打包字体
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource', // resource相当于使用file-loader
        generator: {
          filename: 'font/[name]_[hash:6][ext]'
        }
      },

      // 使用babel
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         ['@babel/preset-env']
      //       ]
      //     }
      //   }
      // }

      // 使用babel.config.js
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'learn webpack'
    }),
    new DefinePlugin({
      BASE_URL: "'./'",
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: './',
          globOptions: {
            ignore: [
              "**/index.html"
            ]
          }
        }    
      ]
    }),
    new VueLoaderPlugin()
  ]
}