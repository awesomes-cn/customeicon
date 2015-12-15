var Promise = require("bluebird"),
    fs = Promise.promisifyAll(require("fs"));


var result = {}

function extractClassFromCss(data){
  data.replace(/\$fa-var-([\w-]+):\s+"\\(.+)?"/gi,function(){
    var key = parseInt(arguments[2],16).toString();
    (result[key] = result[key] || []).push(arguments[1]);
  })
  return result
}

function getIconList() {
  return fs.readFileAsync("./variables.scss","utf8").then(extractClassFromCss);
}


module.exports = getIconList;

