var Step = Em.Object.extend({
  active: false,
  velocity: 0,
  setup: function() {
    this.get('lastUpdated');
  }.on('init'),
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
        return Step.create(item);
      })
    );
  }
});

export default Step;
