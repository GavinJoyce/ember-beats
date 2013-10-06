var App = require('app');

App.ChannelsController = Em.ArrayController.extend({
  itemController: 'channel',
  actions: {
     addChannel: function(sound) {
       var channel = App.Channel.create({ sound: sound });
       channel.addSteps(16);
       this.get('model').pushObject(channel);
      },

     deleteChannel: function(channel) {
      this.get('model').removeObject(channel);
     }
  }
});
