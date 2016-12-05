import * as webpack from 'webpack';
import * as htmlWebpackPlugin from 'html-webpack-plugin';
import { root } from './helper';
import { SetEnv } from './loaders/shared_data';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var common: webpack.Configuration = {
    entry:{
        'polyfills': './src/polyfills.ts',
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
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module:{
        loaders:[
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.scss$/,
                include: root('src', 'app'),
                loaders: [ 'raw', 'sass', 'sass-header' ]
            },
            {
                test: /\.scss$/,
                exclude: root('src', 'app'),
                loader: ExtractTextPlugin.extract({
                        fallbackLoader: "style-loader",
                        loader: "css!sass!sass-header"
                    })
            },
            {
                test: /\.png$/,
                include: root('src', 'app'),
                loader: 'raw'
            }
        ]
    },

    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:[
                'app',
                'vendor',
                'polyfills'
            ]
        }),

        new htmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            __dirname
        ),
    ],

    resolveLoader: {
        alias: {
            "sass-header": path.join(__dirname, "loaders/sass-header-loader.ts")
        }
    }
};

export function buildCommon(env:any) 
{  
    SetEnv(env);
    return common; 
};