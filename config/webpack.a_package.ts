import { Configuration, loader, optimize } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

function root(...args:string[]):string 
{
    var _root = resolve(__dirname, '..');
    return join(...[_root].concat(args));
}

export = function(env:any): Configuration
{
    var common: Configuration = 
    {
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
                'rxjs/Rx',
                'zone.js',
                '@a_package'
            ],
            'index' : './src/@a_package/index.ts'
        },

        resolve:{
            extensions: [".js",".ts"]
        },

        module:{
            loaders:[
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },

                {
                    test: /\.ts$/,
                    use: ['raw-loader', 'angular2-template-loader'], 
                    exclude: [/\.(spec|e2e|d)\.ts$/]
                },

                {
                    test: /\.scss$/,
                    use: [ 'raw-loader' ]
                }
            ]
        },

        output:{
            path: root('dist/@a_package'),
            publicPath: 'http://localhost:8080/',
            filename: '[name].js',
            chunkFilename: '[id].chunk.js'
        },

        devServer: { 
            historyApiFallback: true,
            stats: 'minimal',
            contentBase: root('dist/@a_package')
        },

        plugins:[
            new optimize.CommonsChunkPlugin({
                names:[
                    'index',
                    'vendor'
                ]
            })
        ]
    };

    return common;
};