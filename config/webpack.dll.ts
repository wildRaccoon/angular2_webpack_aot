import { Configuration, loader, optimize, DllPlugin } from 'webpack';
import { resolve, join } from 'path';

function root(...args: string[]): string {
    var _root = resolve(__dirname, '..');
    return join(...[_root].concat(args));
}

export = function (env: any): Configuration {
    var common: Configuration =
        {
            mode: "production",

            entry: {
                'polyfills': [
                    'zone.js',
                    'core-js',
                    'core-js/es6/symbol',
                    'core-js/es6/object',
                    'core-js/es6/function',
                    'core-js/es6/parse-int',
                    'core-js/es6/parse-float',
                    'core-js/es6/number',
                    'core-js/es6/math',
                    'core-js/es6/string',
                    'core-js/es6/date',
                    'core-js/es6/array',
                    'core-js/es6/regexp',
                    'core-js/es6/map',
                    'core-js/es6/set',
                    'core-js/es6/reflect',
                    'core-js/es7/reflect',
                ],
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
                ]
            },

            resolve: {
                extensions: ['.js', '.ts']
            },

            optimization: {
                removeEmptyChunks: true,
                mergeDuplicateChunks: true,
                // splitChunks: {
                //     chunks: "all",
                //     name: "vendor"
                // }
            },

            output: {
                filename: '[name].js',
                path: root('dist/dll'),
                library: '[name]'
            },

            module: {
                rules: [
                    {
                        test: /\.ts$/,
                        use: ['ts-loader'],
                        exclude: [/\.(spec|e2e|d)\.ts$/]
                    },

                    {
                        test:"/jquery/",
                        use:'script-loader'
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