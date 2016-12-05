import { GetEnv } from './shared_data';
var path = require('path');
var header:string = path.join(process.cwd(),'src/css/theme.scss');
var fs = require('fs');
 
function loader(text:any):any {
    var contents = fs.readFileSync(header, 'utf8');
    return contents + '\r\n' + text;
}

module.exports = loader;