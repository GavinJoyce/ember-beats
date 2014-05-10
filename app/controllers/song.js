import Song from "./../models/song";

export default Em.ObjectController.extend({
  updateUrl: function() {
    window.history.replaceState({ }, '', this.get('permalink'));
  }.observes('base64Compressed'),
  actions: {
    switchToPreset: function(preset) {
      this.set('model', Song.fromPreset(preset));
    },
    deleteChannel: function(channel) {
      this.get('channels').removeObject(channel);
    },
    addChannel: function() {
      this.get('model').addChannel('kick');
    },
  }
});
