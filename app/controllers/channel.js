var App = require('app');

App.ChannelController = Em.ObjectController.extend(Ember.Evented, {
  init: function() {
    this._super();
    App.pubsub.subscribe('tick', this, this.onTick);
  },
  willDestroy: function() {
    console.log('willDestory ChannelController');
    this._super();
    App.pubsub.unsubscribe('tick', this, this.onTick);
  },
  class: function() {
    return "channel  " + this.get('sound');
  }.property('sound'),

  previous: function() {
    this.set('sound', App.Channel.previous(this.get('sound')));
    this.preview();
  },
  next: function() {
    this.set('sound', App.Channel.next(this.get('sound')));
    this.preview();
  },
  preview: function() {
    this.playStep(
      this.get('steps').objectAt(0)
    );
  },
  delete: function() {
    this.send('deleteChannel', this.get('model'));
  },
  playStep: function(step) {
    App.pubsub.publish('sound', {
      sound: this.get('sound'),
      velocity: step.get('velocity') * this.get('volume'),
      pan: this.get('pan')
    });
  },
  onTick: function(tick) {
    var currentStepIndex = (tick-1) % this.get('stepCount');

    var steps = this.get('steps');
    steps.setEach('active', false);

    var step = steps.objectAt(currentStepIndex);
    step.set('active', true);

    if(step.get('enabled')) {
      this.playStep(step);
    }
  },
});


