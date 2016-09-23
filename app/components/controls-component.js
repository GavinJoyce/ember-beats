import Ember from 'ember';

export default Ember.Component.extend({
  playbackService: Ember.inject.service(),

  actions: {
    next() {
      this.get('playbackService').nextTick();
    },
    play() {
      this.get('playbackService').play();
    },
    stop() {
      this.get('playbackService').stop();
    }
  }
});
