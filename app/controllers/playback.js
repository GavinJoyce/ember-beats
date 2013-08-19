var App = require('app');

App.PlaybackController = Em.ObjectController.extend({
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
  display: function() {
    return this.get('bar') + ':' + this.get('beat') + ':' + this.get('sixteenth');
  }.property('tickCount'),

  interval: function() {
    return 1000 / (this.get('tempo') / 60 * 4);
  }.property('tempo'),

  start: function() {
    if(!this.get('isActive')) {
      this.set('isActive', true);
      this.tick();
    }
  },

  stop: function() {
    this.set('isActive', false);
    this.set('tickCount', null);
  },

  tick: function() {
    if(this.get('isActive')) {
      this.incrementProperty('tickCount');
      App.Hub.publish('tick', this.get('tickCount'));

      var self = this;
      setTimeout(function() {
        self.tick();
      }, this.get('interval'));
    }
  },

  increaseTempo: function() {
    this.set('tempo', this.get('tempo') + 5);
  },

  decreaseTempo: function() {
    if(this.get('tempo') > 5) {
      this.set('tempo', this.get('tempo') - 5);
    }
  }
});



