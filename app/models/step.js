import Em from 'ember';

let Step = Em.Object.extend({
  serialize() {
    return {
      velocity: this.get('velocity')
    };
  },
}).reopenClass({
  deserialize(data) {
    return Step.create({
      velocity: data.velocity
    });
  }
});

export default Step;
