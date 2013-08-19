var App = require('app');

App.StepController = Em.ObjectController.extend({
  buttonClass: function() {
    var classes = ['step-button ribbon'];

    if(this.get('active')) {
      classes.push('active');
    } else {
      classes.push('inactive');

    }

    var velocity = this.get('velocity');
    if(velocity == 0.5) {
      classes.push('velocity50');
    } else if(velocity == 1) {
      classes.push('velocity100');
    }

     return classes.join(' ');
  }.property('velocity', 'active'),

  click: function() {
    var velocity = this.get('velocity');
    var model = this.get('model');
    if(velocity === 0) {
      this.set('velocity', 0.5);
      this.play();
    } else if(velocity === 0.5) {
      this.set('velocity', 1);
      this.play();
    } else {
      this.set('velocity', 0);
    }
  },

  play: function() {
    this.send('playStep', this.get('model'));
  }
});

