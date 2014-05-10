import Step from './step';
import Audio from './audio';
import sounds from './data/sounds';
import { Serializer, Deserializer } from './mixins/channel-serialization';

export default Em.Object.extend(Serializer, {
  sound: 'kick',
  volume: 1,
  steps: null,
  setup: function() {
    if(this.get('steps') === null) {
      this.set('steps', Em.A());
      this.addSteps(16);
    }
    this.get('lastUpdated');
  }.on('init'),
  tick: function(tickCount) {
    var stepIndex = (tickCount-1) % this.get('steps.length');
    var steps = this.get('steps');
    steps.setEach('active', false);

    var step = steps.objectAt(stepIndex);
    step.set('active', true);

    if(step.get('enabled')) {
      var volume = step.get('velocity') * this.get('volume');
      Audio.play(this.get('sound'), volume);
    }
  },
  addStep: function(data) {
    this.get('steps').pushObject(Step.create(data));
  },
  addSteps: function(n) {
    for(var i=0; i<n; i++) {
      this.addStep();
    }
  },
  removeStep: function() {
    this.get('steps').popObject();
  },
  previousSound: function() {
    this.set('sound', this.previous(this.get('sound')));
    this.previewSound();
  },
  nextSound: function() {
    this.set('sound', this.next(this.get('sound')));
    this.previewSound();
  },
  previewSound: function() {
    Audio.play(this.get('sound'), this.get('volume'));
  },
  previous: function(sound) {
    var index = sounds.indexOf(sound);
    if(index === 0) {
      index = sounds.length;
    }
    return sounds[index - 1];
  },
  next: function(sound) {
    var index = sounds.indexOf(sound);
    if(index === sounds.length - 1) {
      index = -1;
    }
    return sounds[index + 1];
  }
}).reopenClass(Deserializer);
