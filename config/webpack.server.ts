import { Configuration, ContextReplacementPlugin } from 'webpack';
import { resolve, join } from 'path';


function root(...args:string[]):string 
{
    var _root = resolve(__dirname, '..');
    return join(...[_root].concat(args));
}

export = function(env:any): Configuration
{
    return {
        entry:{ 
            "server": './ssr_server.ts',
            "boot-server" : './boot-server.ts'
        },

        resolve: { 
            extensions: ['.js', '.ts'] 
        },

        module: {
            rules: [
              { test: /\.ts$/, loader: 'ts-loader' },
              { test: /\.html$/, loader: "raw-loader" }
            ]
        },
        
        plugins: [
            // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
            // for 'WARNING Critical dependency: the request of a dependency is an expression'
            new ContextReplacementPlugin(
              /(.+)?angular(\\|\/)core(.+)?/,
              join(__dirname, 'src'), // location of your src
              {} // a map of your routes
            ),
            new ContextReplacementPlugin(
              /(.+)?express(\\|\/)(.+)?/,
              join(__dirname, 'src'),
              {}
            )
        ],

        //webpack build options for server side running

        target: 'node',
        mode: 'none',

        // this makes sure we include node_modules and other 3rd party libraries
        //externals: [/node_modules/],

        output:{
            libraryTarget: 'commonjs',
            path: root('dist'),
            filename: '[name].js'
        }
    };
}