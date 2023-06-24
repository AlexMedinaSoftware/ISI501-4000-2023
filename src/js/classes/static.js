const DIR_UP = 0;
const DIR_DOWN = 1;
const DIR_LEFT = 2;
const DIR_RIGHT = 3;


Object.freeze(DIR_UP);
Object.freeze(DIR_DOWN);
Object.freeze(DIR_LEFT);
Object.freeze(DIR_RIGHT);

function loadNameFiles(path, from, to, ext){
    var res = new Array();
    for(let i = from; i <= to; i++){
        res.push(path + i + "." + ext);
    }
    return res;
}

function loadNameFilesInversed(path, from, to, ext){
    var res = new Array();
    for(let i = from; i <= to; i++){
        res.push(path + i + "." + ext);
    }
    return res.reverse();
}