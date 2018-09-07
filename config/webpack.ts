import { Configuration, ContextReplacementPlugin, ProvidePlugin } from 'webpack';
import { resolve, join } from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { AngularCompilerPlugin } from '@ngtools/webpack';

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function root(...args:string[]):string 
{
    var _root = resolve(__dirname, '..');
    return join(...[_root].concat(args));
}

const path = require('path');

export = function(env:any): Configuration
{
    env = env ? env : {};

    env.aot = env.aot ? true : false;
    env.partner = env.partner ? false : true;

    console.log(env);

    var tsconfigPath = require(root("tsconfig.json")).compilerOptions.paths;

    if(env.partner)
    {
        tsconfigPath["@bingo/partner"] = [ "src/partner/index.ts" ];
        tsconfigPath["@bingo/partner/*"] = [ "src/partner/*" ];
    }


    var common: Configuration = 
    {
        mode:"development",

        devtool: 'nosources-source-map',

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
                'jquery/dist/jquery.min.js'
            ],
            'polyfills': [
                './src/polyfills.ts'
            ],
            'app' : [                
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
                    exclude:root("src/index.html"),
                    use: 'html-loader'
                },

                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    use: [ '@ngtools/webpack' ]
                },

                {
                    test: /\.scss$/,
                    exclude: /styles\.scss$/, 
                    use: [ 'raw-loader', 'sass-loader', 'sass-header' ]
                },

                { 
                    test: /styles\.scss$/, 
                    use: [ MiniCssExtractPlugin.loader, "css-loader",'sass-loader', 'sass-header' ] 
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
            filename: '[name].js',
            chunkFilename: '[name].chunk.js'
        },

        plugins:[
            new AngularCompilerPlugin({
                tsConfigPath: root("tsconfig.json"),
                mainPath:"./src/main.ts",
                skipCodeGeneration: env.aot,
                compilerOptions:{
                    "paths":tsconfigPath
                },
                hostReplacementPaths:{
                    "env":"env.prod"
                },
                nameLazyFiles:true
            }),

            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
              }),

            new HtmlWebpackPlugin({
                title:"My Custom Title",
                template: 'src/index.html',
                inject: 'body',
                chunksSortMode: 'manual', 
                chunks: ['polyfills','vendor', 'styles', 'app']
            }),

            new ProvidePlugin({
                '$':          'jquery'
            }),

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