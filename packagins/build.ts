import * as vfs from 'vinyl-fs';
import { replace_template } from './template-loader';
import { router_template } from './router-loader';
import { connect } from 'tls';
import { Buffer } from 'buffer';
import { removeSync, existsSync } from 'fs-extra';
import { dest } from 'vinyl-fs';

var map = require('map-stream');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var packageFolder = "./src/@a_package";
var packageName = '@a_package';

var destination = './dist/' + packageName;
var npm_destination = './node_modules/' + packageName;

var to_npm = true;



function main()
{
  try {
    console.log('Start Building Packages.');

    if(existsSync(destination))
    {
      console.log('Clean folder:' + destination);
      removeSync(destination);
    }

    if(existsSync(npm_destination))
    {
      console.log('Clean folder:' + npm_destination);
      removeSync(npm_destination);
    }

    // if(0 == 0)
    // {
    //   return;
    // }

    var tsProject = ts.createProject(packageFolder + '/tsconfig.json',{
      declaration: true,
      sourceMap: true
    });

    console.log('Compile typescript files.');
    //compile typescipt
    vfs.src([packageFolder + '/**/*.ts'])
      
      .pipe(map(replace_template))
      .pipe(sourcemaps.init())
      
      .pipe(tsProject())
      
      .pipe(map(router_template))
      
      .pipe(sourcemaps.write('./'))
      .pipe(vfs.dest(destination))
      .pipe(vfs.dest(npm_destination));

    console.log('Copy assets.');
    
    //copy source files
    vfs.src([
        packageFolder + '/**/*.html',
        packageFolder + '/**/*.scss',
        packageFolder + '/**/package.json',
      ])
      .pipe(vfs.dest(destination))
      .pipe(vfs.dest(npm_destination));

  } catch (error) {
    console.error('Error while build packages.');
    console.error(error);
  }

  console.log('Completed Building Packages.');
}


//entry point
main();
