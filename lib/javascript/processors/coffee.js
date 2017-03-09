var cs = require('coffee-script');
var DsSrvPreRenderError = require('../../error').DsSrvPreRenderError;

exports.compile = function(filePath, fileContents, callback){
  var script, errors;
  try{
    errors = null;
    script = cs.compile(fileContents.toString(), { bare: true });
  }catch(e){
    errors = e;
    errors.source = 'CoffeeScript';
    errors.dest = 'JavaScript';
    errors.filename = filePath;
    errors.stack = fileContents.toString();
    errors.lineno = parseInt(errors.location.first_line ? errors.location.first_line + 1 : -1);
    script = null;
    var error = new DsSrvPreRenderError(errors);
  }finally{
    callback(error, script);
  }
};
