var Promise = require("bluebird"),
    getSvgData = require("./lib/getSvgData")


Promise.all([getSvgData()]).spread(function(data){
  console.log(data.length);
})
