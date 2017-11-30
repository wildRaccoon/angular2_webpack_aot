import * as File from 'vinyl';
import { makeDecorator } from '@angular/core/src/util/decorators';

var loadChildrenRegex = /["']?loadChildren["']?[\s]*:[\s]*['|"](.*?)['|"]/gm;
var moduleDataRegex = /(.*)\#(.*)/gm

function replaceStringsWithImport(content:string) : string 
{
    return content.replace(moduleDataRegex, function (match, module_path, module_name) 
    {
      return "function() { return import(\"" + module_path + "\").then(module => module[\"" + module_name +"\"],() => { throw({ loadChunkError: true }); }); }";
    });
}

function router_loader(source:string) : string
{
    var newSource = source.replace(loadChildrenRegex, function (match, path) {
        //replace: loadChildren: "./subroute/sub.module#SubModule"
        //with : loadChildren: function() { return import("./subroute/sub.module").then(module => module["SubModule"],() => { throw({ loadChunkError: true }); }); }
    
        return "loadChildren: " + replaceStringsWithImport(path) + (match.endsWith(",") ? "," : "");
    });

    return newSource;
}

export function router_template(file:File, cb:any) {
    if (file.isNull()) {
      return cb(null, file);
    }

    if(!file.path.endsWith(".js"))
    {
      //console.log(file.path);
      return cb(null, file);
    }
  
    if (file.isStream()) {
      throw new Error("Stream file type not handled:" + file.path);
    }
  
    if(file.isBuffer())
    { 
      //console.log(file.path);
      var newContent = router_loader(String(file.contents));
      //console.log(newContent);
      file.contents = new Buffer(newContent);
  
      return cb(null, file);
    }
  
    cb(null, file);
  };