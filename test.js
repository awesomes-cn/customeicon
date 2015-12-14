var Promise = require("bluebird"),
    getIconList = require("./lib/getIconList")


Promise.all([getIconList()]).spread(function(data){
  console.log(data);
})
