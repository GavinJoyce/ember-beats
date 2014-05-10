import presets from './../models/data/presets';

export default Em.Route.extend({
  beforeModel: function() {
    this.transitionTo('song', presets.default);
  }
});
