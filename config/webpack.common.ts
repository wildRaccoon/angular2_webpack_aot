import { Configuration, loader, optimize, ContextReplacementPlugin } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
var uglifyjs = require('uglifyjs-webpack-plugin');

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
            'vendor': [
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                '@angular/upgrade',
                'rxjs',
                'zone.js',
                '@a_package'
            ],
            'app' : './src/main.ts',
            'polyfills' : './src/polyfills.ts'
        },

        resolve:{
            extensions: [".js", ".ts"]
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
            path: root('dist/app'),
            publicPath: 'http://localhost:8080/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        devServer: {
            historyApiFallback: true,
            stats: 'minimal',
            contentBase: root('dist/app')
        },

        plugins:[
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),

            new optimize.CommonsChunkPlugin({
                names:[
                    'app',
                    'vendor',
                    'polyfills'
                ]
            }),

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