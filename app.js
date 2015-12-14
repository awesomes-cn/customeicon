var fs= require('fs');  


// .fa-envelope-o:before{content:"\f003"}

var icons = {}
var html = "";
fs.readFile('font-awesome.min.css','utf-8',function(err,data){ 
  data.replace(/(\.fa-[\w\-,\.\:]+:before)+{content:"\\f(.+?)"/gi, function(){
    arguments[1].replace(/\.(fa-[\w,-]+):before/gi,function(er,da){
      html += '<svg class="fa"><use xlink:href="./font-awesome.svg#' + arguments[1] + '"></use></svg>\r\n'
    }) 
    
  })
  html = '\
    <!DOCTYPE html>\r\n\
      <html>\r\n\
        <head>\r\n\
          <style type="text/css">\r\n\
            .fa{width: 25px; height: 25px;}\r\n\
          </style>\r\n\
        </head>\r\n\
        <body style="height: 1000px;">'
        + html +
        '</body> \r\n\
  '
  fs.writeFile('index.html', html,function(){
    console.log("Success");
  })
})


