var App = require('app');

App.SoundPlayer = Ember.Object.create({
    init: function() {
        var self = this;
        App.pubsub.subscribe('sound', function(sound) {
          self.howl.play(sound.sound, function(soundID) {
            self.howl.volume(sound.velocity, soundID);
            self.howl.pos3d({x: sound.pan }, soundID);
          });
        });
    },
    howl: new Howl({
        urls: ['sprite.mp3','sprite.ogg'],
        sprite: {
            cowbell: [0, 300],
            conga_hi: [400, 300],
            cymbal: [807, 3640],
            conga_mid: [4455, 202],
            conga_low: [4863, 343],
            hihat_open: [5268, 706],
            tom_hi: [6277, 206],
            maracas: [6684, 53],
            tom_mid: [7092, 263],
            hihat_closed: [7496, 90],
            tom_low: [7903, 370],
            clave: [8307, 44],
            clap: [8712, 208],
            snare: [9116, 137],
            rim: [9521, 36],
            kick: [9929, 390]
        }
    })
});
