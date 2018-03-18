import { Configuration, loader, optimize, ContextReplacementPlugin, DefinePlugin } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
var uglifyjs = require('uglifyjs-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
                'zone.js'
            ],
            'app' : './src/main.ts',
            
        },

        resolve:{
            extensions: [".js", ".ts"],

            alias: {
                "@bingo/config":root("./src/config/config.ts"),
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

        optimization:{
            removeEmptyChunks:true,
            mergeDuplicateChunks:true,
            splitChunks:{
                chunks:"all",
                name:"vendor"
            }
        },

        output:{
            path: root('dist/app'),
            publicPath: 'http://localhost:8080/',
            filename: '[name].js',
            chunkFilename: '[name].js'
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

            new ExtractTextPlugin("styles.css"),

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