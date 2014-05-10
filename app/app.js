import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Em.Application.extend({
  location: 'hash',
  modulePrefix: 'emberbeats',
  Resolver: Resolver
});

loadInitializers(App, 'emberbeats');

export default App;
