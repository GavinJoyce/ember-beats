export default Em.Component.extend({
  classNames: ['add-channel'],
  actions: {
    add: function() {
      this.sendAction();
    }
  }
});
