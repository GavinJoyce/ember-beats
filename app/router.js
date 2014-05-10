var Router = Ember.Router.extend({
  location: 'hash'
});

Router.map(function() {
  this.route('song', { path: 'song/:base64' });
});

export default Router;
