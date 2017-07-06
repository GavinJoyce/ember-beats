import Em from 'ember';
import Channel from './channel';

let Song = Em.Object.extend({
  channels: null,

  init() {
    this._super(...arguments);
    this.set('channels', Em.A());
  },

  setTick(tickCount) {
    this.get('channels').invoke('setTick', tickCount);
  },

  getCurrentNotes() {
    let notes = [];
    this.get('channels').forEach(channel => {
      let playingSteps = channel.get('steps').filter(step => {
        return step.get('isPlaying');
      });

      playingSteps.forEach(step => {
        let volume = channel.get('volume') * step.get('velocity');
        if(volume > 0) {
          notes.push({
            sound: channel.get('sound'),
            volume
          });
        }
      });
    });

    return notes;
  },

  serialize() {
    return {
      name: this.get('name'),
      tempo: this.get('tempo'),
      channels: this.get('channels').invoke('serialize')
    };
  },

  toEncodedBase64() {
    let data = this.serialize();
    let json = JSON.stringify(data);
    let base64Data = LZString.compressToBase64(json);

    return encodeURIComponent(base64Data);
  }
}).reopenClass({
  fromEncodedBase64(encodedBase64Data) {
    let base64Data = decodeURIComponent(encodedBase64Data);
    let json = LZString.decompressFromBase64(base64Data);
    let data = JSON.parse(json);

    return this.deserialize(data);
  },

  deserialize(data) {
    let song = Song.create({
      name: data.name,
      tempo: data.tempo
    });

    let channels = song.get('channels');

    data.channels.forEach((channelData) => {
      let channel = Channel.deserialize(channelData);
      channels.pushObject(channel);
    });

    return song;
  }
});

export default Song;
