import { Configuration, loader, optimize, ContextReplacementPlugin, IgnorePlugin } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackCompilerHost } from '@ngtools/webpack/src/compiler_host';
import * as webpack from 'webpack';
var uglifyjs = require('uglifyjs-webpack-plugin');
var TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

function root(...args:string[]):string 
{
    var _root = resolve(__dirname, '..');
    return join(...[_root].concat(args));
}

const path = require('path');

export = function(env:any): Configuration
{
    var common: Configuration = 
    {
        mode:"development",
        devtool: 'eval-source-map',

        entry:{
            'polyfills' : './src/polyfills.ts',
            'app' : './src/main.ts'            
        },

        resolve:{
            extensions: [".js", ".ts"],

            plugins: [
                new TsConfigPathsPlugin({ configFile: "./tsconfig.json" })
              ],

            alias: {
                "@bingo/partner":root("./src/modules/partner/index.ts")
            }
        },

        module:{
            rules:[
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },

                {
                    test: /\.ts$/,
                    use: ['ts-loader','angular2-template-loader', 'angular-router-loader'], 
                    exclude: [/\.(spec|e2e|d)\.ts$/]
                },

                {
                    test: /\.scss$/,
                    exclude: /styles\.scss$/, 
                    use: [ 'raw-loader', 'sass-loader', 'sass-header' ]
                },

                { 
                    test: /styles\.scss$/, 
                    use: ExtractTextPlugin.extract([ 'raw-loader', 'sass-loader', 'sass-header' ]) 
                },
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader',
                    options: {
                        name:'[name].[ext]',
                        useRelativePath:true,
                        emitFile:false,
                        context:root("src")
                    }
                }
            ]
        },

        optimization:{
            removeEmptyChunks:true,
            mergeDuplicateChunks:true
        },

        output:{
            path: root('dist/dev'),
            publicPath: 'http://localhost:8080/',
            filename: '[name].js',
            chunkFilename: '[id].js'
        },

        devServer: {
            historyApiFallback: true,
            stats: 'minimal',
            contentBase: root('src')
        },

        plugins:[
            new HtmlWebpackPlugin({
                template: 'src/index.html',
            }),
            
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(root('dist/dll/vendor.json')),
                name:"vendor"
              }),

            new ExtractTextPlugin("styles.css"),

            new CopyWebpackPlugin([
                {
                    from: root('dist/dll/vendor.js'),
                    to: root('dist/dev/vendor.js'),
                }
            ]),

            new HtmlWebpackIncludeAssetsPlugin({ 
                assets: [ "vendor.js" ], 
                append: false,
                publicPath:true
            }),

            new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './client')),
        ],

        resolveLoader: {
            alias: {
                "sass-header": join(__dirname, "loaders/sass-header-loader.ts")
            }
        }
    };

    return common;
};  