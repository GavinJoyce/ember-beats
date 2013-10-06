var App = require('app');

App.SongController = Em.ObjectController.extend({
  updateUrl: function() {
    window.history.replaceState({ }, "", this.get('permalink'));
  }.observes('base64Compressed'),
  actions:{
    switchToPreset: function(preset) {
      this.set('model', App.Song.fromPreset(preset));
    }	
  }
  
});
