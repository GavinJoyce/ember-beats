import Step from './../step';

var Serializer = Em.Mixin.create({
  lastUpdated: function() {
    return new Date();
  }.property('sound', 'steps.@each.lastUpdated'),
  serialize: function() {
    return {
      sound: this.get('sound'),
      volume: this.get('volume'),
      steps: this.get('steps').invoke('serialize')
    };
  }
});

var Deserializer = Em.Mixin.create({
  deserialiseArray: function(data) {
    var self = this;
    return Em.A(
      data.map(function(item) {
        return self.create({
          sound: item.sound,
          volume: item.volume,
          steps: Step.deserialiseArray(item.steps)
        });
      })
    );
  }
});

export { Serializer, Deserializer };
