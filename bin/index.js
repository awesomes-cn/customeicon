#!/usr/local/bin/node


var program = require('commander'),
    fs= require('fs'); 

//  options

var options = {
  css: 'font-awesome.min.css',
  svg: 'fontawesome-webfont.svg',
  output: 'font-awesome.svg'
};


program
  .version(require('../package.json').version)
  .usage('[options] [css file] [svg file]')
  .option('-O, --output <str|path>', 'dis svg output file path,default is <font-awesome.svg>')
  .parse(process.argv);

if(!program.args.length){
  program.help();
}else{
  var keywords = program.args;
  options.css = keywords[0];
  options.svg = keywords[1];
  if (program.output) options.output = program.output;
  get_css();
}


function get_css () {
  console.log("Extract icon class name....");
  var icons = {}
  fs.readFile(options.css,'utf-8',function(err,data){ 
    data.replace(/(\.fa-[\w\-,\.\:]+:before)+{content:"\\f(.+?)"/gi, function(){
      var key = arguments[2]
      var val = []

      arguments[1].replace(/\.(fa-[\w,-]+):before/gi,function(er,da){
        val[val.length] = arguments[1]
      })

      icons[key] = val 
      
    })
    console.log(icons);
    //get_svg(icons);
  })
}


function get_svg(icons){
  console.log("Extract icon svg ....");
  var reg = /<glyph unicode="&#xf(.+?);"(\s+horiz-adv-x="\d+")?\s+d=(".+?")/gi;
  var str = '<svg xmlns="http://www.w3.org/2000/svg" style="width:0; height:0; visibility:hidden;">\r\n'
  fs.readFile(options.svg,'utf-8',function(err,data){  
    data.replace(reg, function(){
      console.log(arguments[1]);
      var nms = icons[arguments[1]];
      var d = arguments[3]
      nms.forEach(function(nm){
        str +='<symbol id="' + nm + '" viewBox="0 0 1792 1792">\r\n<path d=' + d + '/>\r\n</symbol>\r\n';
      })
    })
    str +='</svg>';
    fs.writeFile(options.output, str,function(){
      console.log("success minify font!");
    })

  }) 

}
