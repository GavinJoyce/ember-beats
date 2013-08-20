var App = require('app');

App.Step = Ember.Object.extend({
  active: false,
  velocity: 0,
  enabled: function() {
    return this.get('velocity') !== 0;
  }.property('velocity'),
  lastUpdated: function() {
    return new Date();
  }.property('velocity'),
  serialize: function() {
    return {
      velocity: this.get('velocity')
    };
  }

}).reopenClass({
  deserialiseArray: function(data) {
    return Em.A(
      data.map(function(item) {
        return App.Step.create(item);
      })
    );
  }
});
