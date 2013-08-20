var App = require('app');

App.SongController = Em.ObjectController.extend(Ember.Evented, {
  updateUrl: function() {
    window.history.replaceState({ }, "", this.get('permalink'));
  }.observes('base64Compressed'),

  switchToPreset: function(preset) {
    this.set('model', App.Song.fromPreset(preset));
  }
});
