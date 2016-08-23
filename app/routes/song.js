import Ember from 'ember';
import Song from 'ember-beats/models/song';

export default Ember.Route.extend({
  model(params) {
    return Song.fromEncodedBase64(params.data);
  }
});
