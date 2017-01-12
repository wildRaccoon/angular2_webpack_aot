import * as webpack from 'webpack';
import { buildCommon } from './webpack.common';
import * as merge from 'webpack-merge';
import { root } from './helper';
var ExtractTextPlugin = require('extract-text-webpack-plugin');
import { AotPlugin } from '../node_modules/@ngtools/webpack/src';

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
                        loaders: ['@ngtools/webpack'], 
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
                new AotPlugin({
                    tsConfigPath: root('tsconfig.aot.json'),
                    entryModule: root('src/app/app.module#AppModule'),
                    mainPath: root('src/main.ts')
                }),
                new ExtractTextPlugin('[name].css')
            ]
        });
    
    return cfg;
};