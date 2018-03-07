var path = require('path');
var header:string = path.join(process.cwd(),'src/assets/css/theme.scss');
var fs = require('fs');
 
function loader(text:any):any {
    
    console.log("\n" + this.resourcePath + "\n");
    

    var contents = fs.readFileSync(header, 'utf8');
    return contents + '\r\n' + text;
}

module.exports = loader;