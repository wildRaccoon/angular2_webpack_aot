import * as webpack from 'webpack';
import { common } from './webpack.common';
import * as merge from 'webpack-merge';
import { root } from './helper';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
import { AotPlugin } from '../node_modules/@ngtools/webpack/src';

var cfg:webpack.Configuration = merge(
    common,
    {
        devtool: 'cheap-module-eval-source-map',

        module:{
                loaders:[{
                    test: /\.ts$/,
                    loaders: ['@ngtools/webpack'], 
                    exclude: [/\.(spec|e2e|d)\.ts$/]
                }]
        },
        
        output:{
            path: root('dist'),
            publicPath: 'http://localhost:8080/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        devServer: {
            historyApiFallback: true,
            stats: 'minimal',
            contentBase:root('dist')
        },

        plugins: [
            new AotPlugin({
                //basePath:root('dist'),
                tsConfigPath: './tsconfig.aot.json',
                entryModule: 'src/app/app.module#AppModule',
                //genDir:".aot",
                mainPath: 'src/main.ts'
            }),
            new ExtractTextPlugin('[name].css')
        ]
    });

export = cfg;