var App = require('app');

App.StepsController = Em.ArrayController.extend({
  itemController: 'step',
  actions: {
    addStep: function() {
      this.get('model').pushObject(
        App.Step.create()
      );
    },
    removeStep: function() {
      this.get('model').popObject();
    }
  }
});
