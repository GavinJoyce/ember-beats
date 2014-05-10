export default Em.Component.extend({
  tagName: 'li',
  classNameBindings: ['step'],
  velocityClass: function() {
    var velocity = this.get('step.velocity');
    if(velocity === 0.5) {
      return 'velocity50';
    } else if(velocity === 1) {
      return 'velocity100';
    }
  }.property('step.velocity'),
  actions: {
    click: function() {
      var velocity = this.get('step.velocity');
      if(velocity === 0) {
        this.set('step.velocity', 0.5);
        this.send('play');
      } else if(velocity === 0.5) {
        this.set('step.velocity', 1);
        this.send('play');
      } else {
        this.set('step.velocity', 0);
      }
    },
    play: function() {
      this.sendAction('previewStep', this.get('model'));
    }
  }
});
