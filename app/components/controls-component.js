var Controls = Em.Component.extend({
  tickCount: null,
  isActive: false,
  sixteenth: function() {
    return (this.get('tickCount') % 4) + 1;
  }.property('tickCount'),
  beat: function() {
    return Math.floor((this.get('tickCount') / 4) % 4) + 1;
  }.property('sixteenth'),
  bar: function() {
    return Math.floor(this.get('tickCount') / 16) + 1;
  }.property('beat'),
  interval: function() {
    return 1000 / (this.get('song.tempo') / 60 * 4);
  }.property('song.tempo'),
  display: function() {
    var bar = this.get('bar'),
        beat = this.get('beat'),
        sixteenth = this.get('sixteenth');
    return '%@:%@:%@'.fmt(bar, beat, sixteenth);
  }.property('tickCount'),
  tick: function() {
    if(this.get('isActive')) {
      var tickCount = this.incrementProperty('tickCount');
      this.get('song').tick(tickCount);
      Em.run.later(this, this.tick, this.get('interval'));
    }
  },
  actions: {
    start: function() {
      if(!this.get('isActive')) {
        this.setProperties({
          tickCount: null,
          isActive: true
        });
        this.tick();
      }
    },
    stop: function() {
      this.set('isActive', false);
    },
    increaseTempo: function() {
      this.incrementProperty('song.tempo', 5);
    },
    decreaseTempo: function() {
      if(this.get('song.tempo') > 5) {
        this.decrementProperty('song.tempo', 5);
      }
    },
    switchToPreset: function(preset) {
      this.sendAction('switchToPreset', preset);
    }
  }
});

export default Controls;
