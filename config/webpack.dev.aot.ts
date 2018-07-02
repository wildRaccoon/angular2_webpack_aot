import { Configuration, loader, optimize, ContextReplacementPlugin, DefinePlugin, DllReferencePlugin } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { AngularCompilerPlugin } from '@ngtools/webpack';
import { NodeJsSyncHost } from '@angular-devkit/core/node/host';

var uglifyjs = require('uglifyjs-webpack-plugin');
var TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

function root(...args:string[]):string 
{
    var _root = resolve(__dirname, '..');
    return join(...[_root].concat(args));
}

const path = require('path');

export = function(env:any): Configuration
{
    var tsconfigPath = require(root("tsconfig.json")).compilerOptions.paths;
    tsconfigPath["@bingo/partner"] = [ "src/modules/partner/index.ts" ];

    var _host = new NodeJsSyncHost();

    var common: Configuration = 
    {
        mode:"development",

        devtool: 'eval-source-map',

        entry:{
            'app' : [
                './src/polyfills.ts',
                './src/main.ts'  
            ]
        },

        resolve:{
            extensions: [".js", ".ts"]
        },

        module:{
            rules:[
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },

                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    use: [ '@ngtools/webpack' ], 
                    exclude: [/\.(spec|e2e|d)\.ts$/]
                },

                {
                    test: /\.js|\.ts/,
                    use: [ 'angular-router-loader'], 
                    include: [root('src')]
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
                    test: /\.png$/,
                    include: [root('src','app')],
                    use: 'raw-loader'
                },

                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    use: 'file-loader?name=assets/[name].[hash].[ext]'
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
            contentBase: root('dist/dev')
        },

        plugins:[
            new CopyWebpackPlugin([
                {
                    from: root('dist/dll/polyfills.js'),
                    to: root('dist/dev/polyfills.js'),
                },
                {
                    from: root('dist/dll/vendor.js'),
                    to: root('dist/dev/vendor.js'),
                }
            ]),

            new DllReferencePlugin({
                context: '.',
                manifest: require(root('dist/dll/vendor.json')),
                name:"vendor"
            }),

            new DllReferencePlugin({
                context: '.',
                manifest: require(root('dist/dll/polyfills.json')),
                name:"polyfills"
              }),

            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),

            new HtmlWebpackIncludeAssetsPlugin({ 
                assets: [ "polyfills.js" ,"vendor.js" ], 
                append: false,
                publicPath:true
            }),

            new AngularCompilerPlugin({
                tsConfigPath: root("tsconfig.json"),

                skipCodeGeneration: true,
                compilerOptions:{
                    "paths":tsconfigPath
                },
                hostReplacementPaths:{
                    "env":"env.prod"
                },
                host:_host                
            }),

            new ExtractTextPlugin("styles.css"),

            new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './client'))
        ],

        resolveLoader: {
            alias: {
                "sass-header": join(__dirname, "loaders/sass-header-loader.ts")
            }
        }
    };

    return common;
};  