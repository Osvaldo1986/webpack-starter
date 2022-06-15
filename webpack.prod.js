const HtmlWebpack          = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require('copy-webpack-plugin');

const CssMinimizer         = require('css-minimizer-webpack-plugin');
const Terser               = require('terser-webpack-plugin');

module.exports = {
    output: {
        clean: true,
        filename: 'main.[contenthash].js' //Cambia el nombredel archvio en el dist y lo cifra
    },

     mode: 'production',

     module: {

        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test:/\.css$/,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                 }
                }
            }
            
        ]
     },

     optimization: {
         minimize: true,
         minimizer: [
             new CssMinimizer(),
             new Terser()
         ]
     },

     plugins: [
         new HtmlWebpack({
             title: 'WebPack',
            // filename: 'index.html'
            template: './src/index.html'
         }),
         new MiniCssExtractPlugin({
             filename: '[name].[fullhash].css',
             ignoreOrder: false
         }),
         new CopyPlugin({
             patterns: [
                 { from: 'src/assets', to: 'assets/'}
             ]
         })
     ],
}