import { Configuration } from 'webpack';
import { resolve, join } from 'path';
import { AngularCompilerPlugin, PLATFORM } from '@ngtools/webpack';

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

    var tsconfigPath = require(root("tsconfig.server.json")).compilerOptions.paths;

    if(env.partner)
    {
        tsconfigPath["@bingo/partner"] = [ "src/partner/index.ts" ];
        tsconfigPath["@bingo/partner/*"] = [ "src/partner/*" ];
    }


    var common: Configuration = 
    {
        mode:"development",

        devtool: 'eval-source-map',

        entry:{
            'app' : [                
                './src/main.server.ts'  
            ]
        },

        resolve:{
            extensions: [".ts",".js"]
        },

        module:{
            rules:[
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },

                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    use: [ '@ngtools/webpack' ]
                },

                {
                    test: /\.scss$/,
                    use: [ 'raw-loader', 'sass-loader', 'sass-header' ]
                },

                {
                    test: /\.png$/,
                    include: [root('src','app')],
                    use: 'raw-loader'
                }
            ]
        },

        optimization:{
            removeEmptyChunks:true,
            mergeDuplicateChunks:true
        },

        output:{
            path: root('dist/dev_ssr'),
            filename: '[name].js',
            libraryTarget: 'commonjs'            
        },

        target:"node",
        node:false,

        plugins:[
            new AngularCompilerPlugin({
                tsConfigPath: root("tsconfig.server.json"),
                mainPath:"./src/main.server.ts",
                skipCodeGeneration: env.aot,
                compilerOptions:{
                    "paths":tsconfigPath
                },
                hostReplacementPaths:{
                    "env":"env.prod"
                },
                nameLazyFiles:true,
                platform: PLATFORM.Server
            })
        ],

        resolveLoader: {
            alias: {
                "sass-header": join(__dirname, "loaders/sass-header-loader.ts")
            }
        },

        externals: [
            /^@angular/,
            (_: any, request: any, callback: (error?: any, result?: any) => void) => {
                // Absolute & Relative paths are not externals
                if (request.match(/^\.{0,2}\//)) {
                  return callback();
                }
        
                try {
                  // Attempt to resolve the module via Node
                  const e = require.resolve(request);
                  if (/node_modules/.test(e)) {
                    // It's a node_module
                    callback(null, request);
                  } else {
                    // It's a system thing (.ie util, fs...)
                    callback();
                  }
                } catch {
                  // Node couldn't find it, so it must be user-aliased
                  callback();
                }
            }
        ]
    };

    return common;
};  