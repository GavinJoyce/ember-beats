import { Serializer, Deserializer } from './mixins/song-serialization';
import Channel from './channel';
import presets from './data/presets';

export default Em.Object.extend(Serializer, {
  name: 'Untitled',
  tempo: 100,
  channels: null,
  tick: function(tickCount) {
    this.get('channels').invoke('tick', tickCount);
  },
  addChannel: function(sound) {
    this.get('channels').pushObject(
      Channel.create({ sound: sound })
    );
  }

}).reopenClass(Deserializer, {
  fromPreset: function(preset) {
    return this.fromBase64Compressed(presets[preset]);
  }
});
