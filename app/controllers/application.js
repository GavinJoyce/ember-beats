import Em from 'ember';

export default Em.Controller.extend({
  audioService: Em.inject.service(),
  actions: {
    play(sound) {
      this.get('audioService').play(sound);
    }
  }
});
