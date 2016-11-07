export function root(...args:string[]):string 
{
    var path = require('path');
    var _root = path.resolve(__dirname, '..');
    return path.join.apply(path, [_root].concat(args));
}