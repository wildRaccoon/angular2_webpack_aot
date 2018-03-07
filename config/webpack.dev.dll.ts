import { Configuration, loader, optimize, ContextReplacementPlugin, IgnorePlugin } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { WebpackCompilerHost } from '@ngtools/webpack/src/compiler_host';
import * as webpack from 'webpack';
var uglifyjs = require('uglifyjs-webpack-plugin');
var TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        devtool: 'eval-source-map',

        entry:{
            'app' : './src/main.ts',
            'polyfills' : './src/polyfills.ts'
        },

        resolve:{
            extensions: [".js", ".ts"],

            plugins: [
                new TsConfigPathsPlugin({ configFileName: "./tsconfig.json" })
              ],

            alias: {
                "@a_package" : root("./src/modules/package/index.ts" ),
                "packageName" : root("./src/modules/partner/index.ts" ),
            }
        },

        module:{
            loaders:[
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
                    use: [ 'raw-loader', 'sass-loader', 'sass-header' ]
                },

                {
                    test: /\.png$/,
                    include: root('src', 'app'),
                    use: 'raw-loader'
                },

                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    use: 'file-loader?name=assets/[name].[hash].[ext]'
                }
            ]
        },

        output:{
            path: root('dist/dev'),
            publicPath: 'http://localhost:8080/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        devServer: {
            historyApiFallback: true,
            stats: 'minimal',
            contentBase: root('dist/dev')
        },

        plugins:[
            new HtmlWebpackPlugin({
                template: 'src/index.dll.html',
            }),

            new optimize.CommonsChunkPlugin({
                names:[
                    'app',
                    'polyfills'
                ]
            }),

            new webpack.DefinePlugin({
                __ADD_PARTNER_ROUTE__:true
            }),
            
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(root('dist/dll/vendor.json')),
                //sourceType: 'commonjs'
              }),

            // new webpack.DllReferencePlugin({
            //         context: '.',
            //         manifest: require(root('dist/dll/polyfills.json')),
            //         //sourceType: 'commonjs'
            //     }),

            new CopyWebpackPlugin([
                // {
                //     from: root('dist/dll/polyfills.js'),
                //     to: root('dist/dev/polyfills.js'),
                // },
                {
                    from: root('dist/dll/vendor.js'),
                    to: root('dist/dev/vendor.js'),
                }
            ]),

            new ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './client')),
            //new uglifyjs()
        ],

        resolveLoader: {
            alias: {
                "sass-header": join(__dirname, "loaders/sass-header-loader.ts")
            }
        }
    };

    return common;
};  