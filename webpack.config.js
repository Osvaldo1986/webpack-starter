const HtmlWebpack          = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin           = require('copy-webpack-plugin');

module.exports = {
    output: {
        clean: true,
    },

     mode: 'development',

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
            }
            
        ]
     },

     optimization: {},

     plugins: [
         new HtmlWebpack({
             title: 'WebPack',
            // filename: 'index.html'
            template: './src/index.html'
         }),
         new MiniCssExtractPlugin({
             filename: 'nuevo-estilo.css', //[name].[fullhash].css
             ignoreOrder: false
         }),
         new CopyPlugin({
             patterns: [
                 { from: 'src/assets', to: 'assets/'}
             ]
         })
     ],
}