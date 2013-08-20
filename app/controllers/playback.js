var App = require('app');

App.PlaybackController = Em.ObjectController.extend({
  tickCount: null,
  isActive: false,
  shareVisible: false,
  sixteenth: function() {
    return (this.get('tickCount') % 4) + 1;
  }.property('tickCount'),
  beat: function() {
    return Math.floor((this.get('tickCount') / 4) % 4) + 1;
  }.property('sixteenth'),
  bar: function() {
    return Math.floor(this.get('tickCount') / 16) + 1;
  }.property('beat'),
  interval: function() {
    return 1000 / (this.get('tempo') / 60 * 4);
  }.property('tempo'),
  display: function() {
    return this.get('bar') + ':' + this.get('beat') + ':' + this.get('sixteenth');
  }.property('tickCount'),
  start: function() {
    if(!this.get('isActive')) {
      this.set('isActive', true);
      this.tick();
    }
  },
  stop: function() {
    this.set('isActive', false);
    this.set('tickCount', null);
  },
  tick: function() {
    if(this.get('isActive')) {
      this.incrementProperty('tickCount');
      App.pubsub.publish('tick', this.get('tickCount'));

      var self = this;
      setTimeout(function() {
        self.tick();
      }, this.get('interval'));
    }
  },
  increaseTempo: function() {
    this.set('tempo', this.get('tempo') + 5);
  },
  decreaseTempo: function() {
    if(this.get('tempo') > 5) {
      this.set('tempo', this.get('tempo') - 5);
    }
  },
  toggleShare: function() {
    this.toggleProperty('shareVisible');
  },
  encodedPermalink: function() {
    return encodeURIComponent(this.get('permalink'));
  }.property('permalink'),
  emailPermalink: function() {
    return "mailto:?subject=Check Out These Beats&body=" + this.get('encodedPermalink');
  }.property('permalink'),
  googlePermalink: function() {
    return 'https://plus.google.com/share?url=' + this.get('encodedPermalink');
  }.property('permalink'),
  facebookPermalink: function() {
    return 'http://www.facebook.com/sharer.php?u=' + this.get('encodedPermalink');
  }.property('permalink'),
  twitterPermalink: function() {
    return 'http://twitter.com/share?url=' + this.get('encodedPermalink') + '&text=Check%20out%20these%20beats%20';
  }.property('permalink')
});

