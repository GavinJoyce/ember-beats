import Channel from './../channel';

var Serializer = Em.Mixin.create({
  setup: function() {
    this.get('lastUpdated');
  }.on('init'),
  json: function() {
    return JSON.stringify(this.serialize());
  }.property('lastUpdated', 'channels.@each.lastUpdated'),
  base64Compressed: function() {
    var base64 = LZString.compressToBase64(this.get('json'));
    return encodeURIComponent(base64);
  }.property('json'),
  permalink: function() {
    return location.protocol + "//" + location.host + "/#/song/" + this.get('base64Compressed');
  }.property('base64Compressed'),
  lastUpdated: function() {
    return new Date();
  }.property('name', 'tempo'),
  serialize: function() {
    return {
      name: this.get('name'),
      tempo: this.get('tempo'),
      channels: this.get('channels').invoke('serialize')
    };
  }
});

var Deserializer = Em.Mixin.create({
  deserialise: function(data) {
    return this.create({
      name: data.name,
      tempo: data.tempo,
      channels: Channel.deserialiseArray(data.channels)
    });
  },
  fromBase64Compressed: function(base64) {
    base64 = decodeURIComponent(base64);
    var json = LZString.decompressFromBase64(base64);
    return this.deserialise(JSON.parse(json));
  },
});

export { Serializer, Deserializer };
