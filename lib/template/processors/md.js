var marked = require('marked').setOptions({ langPrefix: 'language-', headerPrefix: '' });
var DsSrvPreRenderError = require('../../error').DsSrvPreRenderError;
var marked = require('marked');
var renderer = new marked.Renderer();

// This overrides Marked’s default headings with IDs,
// since this changed after v0.2.9
// https://github.com/sintaxi/harp/issues/328
renderer.heading = function(text, level){
  return '<h' + level + '>' +  text + '</h' + level + '>';
};

module.exports = function(fileContents, options){

  return {
    compile: function(){
      return function (locals){
        return marked(fileContents.toString().replace(/^\uFEFF/, ''), {
          renderer: renderer
        });
      };
    },

    parseError: function(error){
      error.stack = fileContents.toString();
      return new DsSrvPreRenderError(error);
    }
  };

};
