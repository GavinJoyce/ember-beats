import Ember from 'ember';
import Song from 'ember-beats/models/song';

export default Ember.Route.extend({
  queryParams: {
    data: {
      refreshModel: true
    }
  },
  model(params) {
    return Song.fromEncodedBase64(params.data);
  }
});
