import Ember from 'ember';

export default Ember.Service.extend({
  audioService: Ember.inject.service(),

  tickCount: 0,
  song: null,
  isPlaying: false,
  tempo: Ember.computed.alias('song.tempo'),

  next() {
    let tickCount = this.incrementProperty('tickCount');
    this.playTick(tickCount);
  },

  play() {
    this.setProperties({
      isPlaying: true,
      tickCount: 0
    });
    this.tick();
  },

  stop() {
    this.set('isPlaying', false);
  },

  tick() {
    if(this.get('isPlaying')) {
      let tickCount = this.incrementProperty('tickCount');
      this.playTick(tickCount);

      Ember.run.later(this, this.tick, this.get('tickInterval'));
    }
  },

  playTick(tickCount) {
    let song = this.get('song');
    song.setTick(tickCount);
    let notes = song.getCurrentNotes();

    let audioService = this.get('audioService');
    audioService.playNotes(notes);
  },

  tickInterval: Ember.computed('song.tempo', function() {
    let beatsPerSecond = this.get('song.tempo') / 60;
    let sixteenthsPerSecond = beatsPerSecond * 4;
    let tickInterval = 1000 / sixteenthsPerSecond;
    return tickInterval;
  }),

  display: Ember.computed('bars', 'beats', 'sixteenths', function() {
    let bars = this.get('bars');
    let beats = this.get('beats');
    let sixteenths = this.get('sixteenths');

    return `${bars}:${beats}:${sixteenths}`;
  }),

  bars: Ember.computed('tickCount', function() {
    return Math.floor(this.get('tickCount') / 16) + 1;
  }),

  beats: Ember.computed('tickCount', function() {
    return (Math.floor((this.get('tickCount')) / 4) % 4) + 1;
  }),

  sixteenths: Ember.computed('tickCount', function() {
    return (this.get('tickCount') % 4) + 1;
  })
});
