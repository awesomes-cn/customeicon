var Promise = require("bluebird"),
    fs = Promise.promisifyAll(require("fs")),
    parseXml= Promise.promisifyAll(require('xml2js'));


function getSvgData() {
  return fs.readFileAsync("./fontawesome-webfont.svg","utf8")
    .then(parseXml.parseStringAsync)
    .then(function(result){
      return result.svg.defs[0].font[0].glyph;
    })
    .filter(function(glyph){
      return glyph.$.d
    })
    .map(function(glyph){
      return {
        code: glyph.$.unicode.charCodeAt(0),
        path: glyph.$.d,
        horiz: glyph.$['horiz-adv-x']
      }
    })
}

module.exports = getSvgData;

