import Song from './../models/song';

export default Ember.Route.extend({
  model: function(params) {
    return Song.fromBase64Compressed(params.base64);
  }
});
