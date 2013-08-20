window.App = require('app');

require('templates/application');
require('templates/index');
require('templates/channels');
require('templates/partials/_channel');
require('templates/partials/_share');
require('templates/song');
require('templates/playback');
require('templates/steps');

require('models/pubsub');
require('models/song');
require('models/step');
require('models/channel');
require('models/soundPlayer');

require('controllers/channels');
require('controllers/channel');
require('controllers/steps');
require('controllers/step');
require('controllers/song');
require('controllers/playback');

require('views/inplace-editor');

require('router');

App.initialize();
