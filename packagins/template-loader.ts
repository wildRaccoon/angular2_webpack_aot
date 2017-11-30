
import * as File from 'vinyl';

// using: regex, capture groups, and capture group variables.
var templateUrlRegex = /templateUrl\s*:(\s*['"`](.*?)['"`]\s*([,}]))/gm;
var stylesRegex = /styleUrls *:(\s*\[[^\]]*?\])/g;
var stringRegex = /(['`"])((?:[^\\]\\\1|.)*?)\1/g;
var styleProperty = 'styles';
var templateProperty = 'template';

function replaceStringsWithRequires(content:string) : string 
{
    return content.replace(stringRegex, function (match, quote, url) 
    {
      if (url.charAt(0) !== ".") {
        url = "./" + url;
      }
      return "require('" + url + "')";
    });
}


function template_loader(source:string) : string
{
    var newSource = source.replace(templateUrlRegex, function (match, url) {
        // replace: templateUrl: './path/to/template.html'
        // with: template: require('./path/to/template.html')
        return templateProperty + ":" + replaceStringsWithRequires(url);
    })
    .replace(stylesRegex, function (match, urls) {
        // replace: stylesUrl: ['./foo.css', "./baz.css", "./index.component.css"]
        // with: styles: [require('./foo.css'), require("./baz.css"), require("./index.component.css")]
        return styleProperty + ":" + replaceStringsWithRequires(urls);
    });

    return newSource;
}

export function replace_template(file:File, cb:any) {
    if (file.isNull()) {
      return cb(null, file);
    }
  
    if (file.isStream()) {
      throw new Error("Stream file type not handled:" + file.path);
    }
  
    if(file.isBuffer())
    { 
      var newContent = template_loader(String(file.contents));
      file.contents = new Buffer(newContent);
  
      return cb(null, file);
    }
  
    cb(null, file);
  };