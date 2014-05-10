export default Em.Component.extend({
  classNameBindings: [':channel', 'channel.sound', 'channel.volume::muted'],
  actions: {
    previous: function() {
      this.get('channel').nextSound();
    },
    next: function() {
      this.get('channel').previousSound();
    },
    mute: function() {
      this.set('channel.volume', 0);
    },
    unmute: function() {
      this.set('channel.volume', 1);
    },
    delete: function() {
      this.sendAction('deleteChannel', this.get('channel'));
    },
    addStep: function() {
      this.get('channel').addStep();
    },
    removeStep: function() {
      this.get('channel').removeStep();
    },
    previewStep: function() {
      this.get('channel').previewSound();
    }
  }
});
