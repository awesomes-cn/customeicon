var Promise = require("bluebird"),
    _ = require('underscore'),
    fs = Promise.promisifyAll(require("fs"));


var arr = [] 

function extractClassFromCss(data){
  data.replace(/\$fa-var-([\w-]+):\s+"\\(.+)?"/gi,function(){
    arr.push({
      name: arguments[1],
      code: parseInt(arguments[2],16)
    })
  })
  return _.indexBy(arr,'code');
}

function getIconList() {
  return fs.readFileAsync("./variables.scss","utf8").then(extractClassFromCss);
}


module.exports = getIconList;

