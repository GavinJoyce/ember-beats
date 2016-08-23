import Em from 'ember';
import Step from './step';

let Channel = Em.Object.extend({
  steps: null,

  init() {
    this._super(...arguments);
    this.set('steps', Em.A());
  },

  serialize() {
    return {
      sound: this.get('sound'),
      volume: this.get('volume'),
      steps: this.get('steps').invoke('serialize')
    };
  }
}).reopenClass({
  deserialize(data) {
    let channel = Channel.create({
      sound: data.sound,
      volume: data.volume,
    });

    let steps = channel.get('steps');

    data.steps.forEach((stepData) => {
      let step = Step.deserialize(stepData);
      steps.pushObject(step);
    });

    return channel;
  }
});

export default Channel;
