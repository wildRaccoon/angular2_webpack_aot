import * as webpack from 'webpack';
import { buildCommon } from './webpack.common';
import * as merge from 'webpack-merge';
import { root } from './helper';
var ExtractTextPlugin = require('extract-text-webpack-plugin');

export = function(env:any)
{
    var cfg:webpack.Configuration = merge(
    buildCommon(env),
    {
        devtool: 'cheap-module-eval-source-map',

        module:{
            loaders:[
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript-loader', 'angular2-template-loader','angular2-router-loader'], 
                    exclude: [/\.(spec|e2e|d)\.ts$/]
                }
            ]
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
            new ExtractTextPlugin('[name].css')
        ]
    });

    return cfg;
}