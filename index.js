/**
 * Module dependencies
 */
var path = require("path");

/**
 * Expose plugin
 */
module.exports = function(options) {
  options = options || {};
  var property = options.property || "json";

  return function(builder) {
    builder.hook('before scripts', function(pkg){

      var files = pkg.conf[property];
      if (!files) return;

      var jsonFiles = [];

      files.forEach(function(file){
        var ext = path.extname(file);
        if (ext != ".json") return;

        jsonFiles.push(file);

        var json = require(pkg.path(file));

        var js = "module.exports = JSON.parse('"+JSON.stringify(json)+"');";

        pkg.addFile('scripts', file, js);
      });

      jsonFiles.forEach(function(file) {
        pkg.removeFile(property, file);
      });
    });
  };
};
