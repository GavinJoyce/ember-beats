var App = require('app');

App.Hub = Ember.Object.createWithMixins(Ember.Evented, {
  publish: function() {
    return this.trigger.apply(this, arguments);
  },

  subscribe: function() {
    return this.on.apply(this, arguments);
  },

  unsubscribe: function() {
    return this.off.apply(this, arguments);
  }
});
