module.exports = {
    mode: '',
    enrty: {
      index1: '',
      index2: ''
    },
    output: {
        filename: '',
        path: ''
    },
    module: {
        rules: [
            {
                test: /\.js/ig,
                loader: ['babel-loader'],
                include: '',
                exclude: ''
            }, 
            {
                test: /\.css/ig,
                loader: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({})
    ],
    optimization: {
      minimizer: [
        new terserJSPlugin({}),
        new OptimizeCSSAssetsPlugin
      ],
      // 分割代码
      splitChunks: {
        // initial 异步文件不处理 async 只处理异步文件 all 都处理
        chunks: 'all',
        //  缓存分组拆分
        cacheGroups: {
            vender: {
                name: '',
                priority: 1, //  权限更高 同样文件先拆这里
                test: /node_modules/,
                minSize: 0,
                minChunks: 1 // 复用几次
            },
            common: {

            }
        }
      }
    },
    devServer: {
        port: '',
        progress: true,
        contentBase: '',
        compress: true,
        proxy: {
          '/api': ''
        }
    }
}