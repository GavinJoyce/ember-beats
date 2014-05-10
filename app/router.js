var Router = Ember.Router.extend({
  location: 'auto'
});

Router.map(function() {
  this.route('song', { path: 'song/:base64' });
});

export default Router;
