import { Configuration, loader, optimize, ContextReplacementPlugin, DefinePlugin } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { AngularCompilerPlugin } from '@ngtools/webpack';

var uglifyjs = require('uglifyjs-webpack-plugin');
var TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

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
        mode:"production",

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
            'app' : './src/main.ts'            
        },

        resolve:{
            extensions: [".js", ".ts"],

            alias: {
                "packageName" : root("./src/modules/partner/index.ts" ),
            }
        },

        module:{
            rules:[
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },

                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    use: ['@ngtools/webpack' ,'angular-router-loader'], 
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

        optimization:{
            removeEmptyChunks:true,
            mergeDuplicateChunks:true,
            splitChunks:{
                chunks:"all",
                name:"vendor"
            }
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
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),

            new AngularCompilerPlugin({
                tsConfigPath: root("tsconfig.json"),
                hostReplacementPaths: {
                    "packageName":root("src/modules/partner/index.ts")
                },
                //mainPath:root("src"),
                //replaceExport: true,
                skipCodeGeneration: true,
                // compilerOptions:{
                //     paths:{
                //         "packageName": [ "src/modules/package/index.ts" ],
                //         "@a_package/*" : [ "src/modules/package/*" ]
                //     }
                // }        
            }),


            new DefinePlugin({
                __ADD_PARTNER_ROUTE__:true
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