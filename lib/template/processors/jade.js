var jade = require('pug')
var DsSrvPreRenderError = require("../../error").DsSrvPreRenderError

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return jade.compile(fileContents, options)
    },

    parseError: function(error){

      var arr = error.message.split("\n")
      var path_arr = arr[0].split(":")
      error.lineno = error.message.split(":")[1]
      console.log(error.message,error.message.split(":")[1])
      // process.exit()
      error.lineno    = parseInt(error.lineno || path_arr[path_arr.length -1] || -1)
      error.message   = arr[arr.length - 1]
      error.name      = error.name
      error.source    = "Jade"
      error.dest      = "HTML"
      error.filename  = error.path || options.filename
      error.stack     = fileContents.toString()

      return new DsSrvPreRenderError(error)
    }
  }

}
