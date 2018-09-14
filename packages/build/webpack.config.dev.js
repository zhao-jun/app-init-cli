const path = require('path')
const webpack = require('webpack')
const basicConfig = require('./webpack.config.base')
const webpackMerge = require('webpack-merge')

const isDev = process.env.NODE_ENV === 'development'

// // css module开发和生产命名区分
// const localIdentName = isDev
// ? '[path][name]-[local]-[hash:base64:5]'
// : '[hash:base64:5]'

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = webpackMerge(basicConfig, {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // vue-start
                    'vue-style-loader',
                    // vue-end
                    // 原来vue-loader css-module配置移到这
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]-[local]-[hash:base64:5]',
                            camelCase: true // 驼峰
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
                include: [resolve('client'), resolve('test'), resolve('vue')]
            }
        ]
    },
    devServer: {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        historyApiFallback: {
            index: '/public/index.html'
        },
        proxy: {
            '/api': 'http://127.0.0.1:3030'
        }
    },
    plugins: [
        // webpack-dev-server hot
        new webpack.HotModuleReplacementPlugin(),
    ]
})
