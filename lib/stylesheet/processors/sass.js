var sass = require('node-sass');
var DsSrvPreRenderError = require('../../error').DsSrvPreRenderError;

exports.compile = function(filePath, dirs, fileContents, callback){
  sass.render({
    file: filePath,
    includePaths: dirs,
    outputStyle: 'compressed',
    sourceMap: true,
    sourceMapEmbed: false,
    sourceMapContents: true,
    outFile: filePath,
    omitSourceMapUrl: true
  }, function (e, css) {
    if (e) {
      var error = new DsSrvPreRenderError ({
        source: 'Sass',
        dest: 'CSS',
        lineno: e.line || 99,
        name: 'Sass Error',
        message: e.message,
        filename: e.file || filePath,
        stack: fileContents.toString()
      });
      return callback(error);
    }

    callback(null, css.css, css.map.toString());
  });
};
