var path = require('path');
var header:string = path.join(process.cwd(),'src/css/theme.scss');
var fs = require('fs');
 
function loader(text:any):any {
    //console.log(header);
    var contents = fs.readFileSync(header, 'utf8');
    //console.log(contents + '\r\n' + text);
    return contents + '\r\n' + text;
}

module.exports = loader;