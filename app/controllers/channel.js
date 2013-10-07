var App = require('app');

App.ChannelController = Em.ObjectController.extend({
  init: function() {
    this._super();
    App.pubsub.subscribe('tick', this, this.onTick);
  },
  willDestroy: function() {
    this._super();
    App.pubsub.unsubscribe('tick', this, this.onTick);
  },
  class: function() {
    var classes = ["channel  " + this.get('sound')];
    if(!this.get('volume')) {
      classes.push('muted');
    }

    return classes.join(' ');
  }.property('sound', 'volume'),
  actions: {
    previous: function() {
      this.set('sound', App.Channel.previous(this.get('sound')));
      this.send('playSound');
    },
    next: function() {
      this.set('sound', App.Channel.next(this.get('sound')));
      this.send('playSound');
    },
    delete: function() {
      this.send('deleteChannel', this.get('model'));
    },
    playStep: function(step) {
      this.send('playSound', step.get('velocity'));
    },
    playSound: function(velocity) {
      if(velocity === undefined) {
        velocity = 1;
      }
      App.pubsub.publish('sound', {
        sound: this.get('sound'),
        velocity: velocity * this.get('volume'),
        pan: this.get('pan')
      });
    },
    mute: function() {
       this.set('volume', 0);
    },
    unmute: function() {
       this.set('volume', 1);
    },
  },
  onTick: function(tick) {
    var currentStepIndex = (tick-1) % this.get('stepCount');

    var steps = this.get('steps');
    steps.setEach('active', false);

    var step = steps.objectAt(currentStepIndex);
    step.set('active', true);

    if(step.get('enabled')) {
      this.send('playStep', step);
    }
  }
});
