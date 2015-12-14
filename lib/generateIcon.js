var Promise = require("bluebird"),
    getSvgData = require("./getSvgData"),
    getIconList = require("./getIconList");


Promise.all([getSvgData(),getIconList()])
    .then(function(svgs,icons){
      
    })
    .map(function(){
      return {
        name: ,
        path: 
        horiz: 
      }
    })
