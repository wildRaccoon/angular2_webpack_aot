import { Configuration, loader, optimize, DllPlugin } from 'webpack';
import { resolve, join } from 'path';

function root(...args:string[]):string 
{
    var _root = resolve(__dirname, '..');
    return join(...[_root].concat(args));
}

export = function(env:any): Configuration
{
    var common: Configuration = 
    {
        entry: {
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
                'zone.js',
                'core-js'
            ],
            // 'polyfills' : [
            //     './src/polyfills.ts' 
            // ]
          }, 

          resolve:{
              extensions: ['.js', '.ts']
          },
         
         output: { 
            filename: '[name].js', 
            path: root('dist/dll'), 
            library: '[name]'
          }, 

          module:{
            loaders:[
                {
                    test: /\.ts$/,
                    use: ['ts-loader'], 
                    exclude: [/\.(spec|e2e|d)\.ts$/]
                }
            ]
          },
          
          plugins: [ 
            new DllPlugin({ 
              name: '[name]', 
              path: join(root('dist/dll'), '[name].json')
            })
          ]
    };

    return common;
};