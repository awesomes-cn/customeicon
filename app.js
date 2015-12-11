var fs= require('fs');  

var config = {
  size: 25
}


// .fa-envelope-o:before{content:"\f003"}

var icons = {}

fs.readFile('font-awesome.min.css','utf-8',function(err,data){ 
  data.replace(/\.(.+?):.+?{content:"\\f(.+?)"/gi, function(){
     icons[arguments[2]] = arguments[1]
  })
  //console.log(icons)
  get_svg();
  
})

function get_svg(){
  var reg = /<glyph unicode="&#xf(.+?);" .+d=(".+?")/gi;
  var str = '<svg xmlns="http://www.w3.org/2000/svg" style="width:0; height:0; visibility:hidden;">\r\n'
  fs.readFile('fontawesome-webfont.svg','utf-8',function(err,data){  
    data.replace(reg, function(){
      var nm = icons[arguments[1]];
      str +='<symbol id="'+nm+'" viewBox="0 0 1792 1792">\r\n<path d='+arguments[2]+'/>\r\n</symbol>\r\n';
    })

    str +='</svg>'

    console.log(str);




  }) 

}




