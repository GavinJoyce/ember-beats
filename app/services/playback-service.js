import Ember from 'ember';

export default Ember.Service.extend({
  song: null,
  tickCount: 0,
  isPlaying: false,

  tempo: Ember.computed.reads('song.tempo'),

  tickInterval: Ember.computed('song.tempo', function() {
    let beatsPerSecond = this.get('song.tempo') / 60;
    let sixteenthsPerSecond = beatsPerSecond * 4;
    let tickInterval = 1000 / sixteenthsPerSecond;
    return tickInterval;
  }),

  next() {
    this.incrementProperty('tickCount');
  },

  play() {
    this.setProperties({
      tickCount: 0,
      isPlaying: true
    });
    this.tick();
  },

  stop() {
    this.set('isPlaying', false);
  },

  tick() {
    if(this.get('isPlaying')) {
      this.next();
      Ember.run.later(this, this.tick, this.get('tickInterval'));
    }
  },

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
