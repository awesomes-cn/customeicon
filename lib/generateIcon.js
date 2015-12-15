var Promise = require("bluebird"),
  getSvgData = require("./getSvgData"),
  getIconList = require("./getIconList");


var arr = []

function generateIcon() {
  return Promise.all([getSvgData(),getIconList()])
  .then(function(svgs,icons){
    for(var svg in svgs){
      for(var name in (icons[svg.code] || []))
      arr.push({ 
        name: name,
        path: svg.path,
        horiz: svg.horiz,
      })
    }
    return arr;
  })
}


module.exports = generateIcon;
