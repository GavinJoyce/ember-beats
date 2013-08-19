var App = require('app');

App.Channel = Ember.Object.extend(Ember.Evented, {
  sound: 'kick',
  volume: 1,
  pan: 1,
  steps: null,
  init: function() {
    this._super();

    if(this.get('steps') === null) {
      this.set('steps', Em.A());
    }
  },
  stepCount: function() {
    return this.get('steps').length;
  }.property('steps.length'),

  addStep: function(data) {
    this.get('steps').pushObject(
      App.Step.create(data)
    );
  },
  addSteps: function(n) {
    for(var i=0; i<n; i++) {
      this.addStep();
    }
  },

  lastUpdated: function() {
    return new Date();
  }.property('sound', 'steps.length', 'steps.@each.lastUpdated'),


  serialize: function() {
    return {
      sound: this.get('sound'),
      volume: this.get('volume'),
      steps: this.get('steps').invoke('serialize')
    };
  }

}).reopenClass({
  sounds: [
    'cowbell',
    'conga_hi',
    'cymbal',
    'conga_mid',
    'conga_low',
    'hihat_open',
    'tom_hi',
    'maracas',
    'tom_mid',
    'hihat_closed',
    'tom_low',
    'clave',
    'clap',
    'snare',
    'rim',
    'kick'
  ],

  previous: function(sound) {
    var index = this.sounds.indexOf(sound);
    if(index === 0) {
      index = this.sounds.length;
    }
    return this.sounds[index - 1];
  },
  next: function(sound) {
    var index = this.sounds.indexOf(sound);
    if(index == this.sounds.length - 1) {
      index = -1;
    }
    return this.sounds[index + 1];
  },
  deserialiseArray: function(data) {
    return Em.A(
      data.map(function(item) {
        return App.Channel.create({
          sound: item.sound,
          volume: item.volume,
          steps: App.Step.deserialiseArray(item.steps)
        });
      })
    );
  }
});


