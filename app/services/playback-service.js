import Ember from 'ember';

export default Ember.Service.extend({
  tickCount: 0,

  next() {
    this.incrementProperty('tickCount');
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
