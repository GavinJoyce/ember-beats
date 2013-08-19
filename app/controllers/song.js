var App = require('app');

App.SongController = Em.ObjectController.extend(Ember.Evented, {
  permalink: function() {
    return location.protocol + "//" + location.host + "/#/song/" + this.get('base64Compressed');
  }.property('base64Compressed'),

  updateUrl: function() {
    window.history.replaceState({ }, "", this.get('permalink'));
  }.observes('base64Compressed'),

  switchToPreset: function(preset) {
    this.set('model', App.Song.fromPreset(preset));
  }
});

