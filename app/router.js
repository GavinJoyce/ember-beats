var App = require('app');

App.IndexRoute = Em.Route.extend({
  model: function() {
    return App.Song.default();
  }
});

App.SongRoute = Em.Route.extend({
  model: function(params) {
    console.log('existing model?: ' + this.get('model'));
    console.log(params);
    return App.Song.fromBase64Compressed(params.base64);
  }
});

App.Router.map(function(){
    this.route('index', { path:'/' });
    this.route('song', { path: '/song/:base64' });
});
