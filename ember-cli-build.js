/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('bower_components/howler.js/dist/howler.core.min.js');
  app.import('bower_components/lz-string/libs/lz-string.min.js');

  return app.toTree();
};
