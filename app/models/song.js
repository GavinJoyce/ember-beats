var App = require('app');

App.Song = Ember.Object.extend({
  name: '',
  tempo: 100,
  channels: Em.A(),

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
}).reopenClass({
  deserialise: function(data) {
    return App.Song.create({
      name: data.name,
      tempo: data.tempo,
      channels: App.Channel.deserialiseArray(data.channels)
    });
  },
  fromBase64Compressed: function(base64) {
    base64 = decodeURIComponent(base64);
    var json = LZString.decompressFromBase64(base64);
    return App.Song.deserialise(JSON.parse(json));
  },
  fromPreset: function(preset) {
    return App.Song.fromBase64Compressed(
      App.Song.presets[preset]
    );
  },
  default: function() {
    return App.Song.fromPreset('default');
  },
  presets: {
    'default': 'N4IgdghgtgpiBcIQBoQBcZQA4HsEEYAGQ1AYwAsIwwYAbAZwQG1R6cBXMAEwRAGsAlqT4oQANxy12sAqnoYsjeC3F0cpAWgCeBAL7JQYtRu0JC%2Bw8c0745g6trrrZiw6enbro45M27ln2dPe293Py8rD3wIwI9%2FN189EMjw5NjUgLCXNKzgzMTPAF1XNk4eRHpIACc4VAkpGXh8OQUlFVCC%2BI6grpTs%2FJ6Y3OiczqGx0cHJuPGpgZnpjISgkfml7oW1l2L7Uu5ecgFKNAB9Ukd6GB46yWk4JpaYRWYt2wA6AFZZzeWo7%2FW%2Bu8vot%2Br8bKswaCNn5Pv8oYCIdD4ekzLCQXlIU04UVdMUgAA%3D%3D',
    '15step': 'N4IgdghgtgpiBcICMBWABAZQC4wA5oAoAlCAEwEsB7ACxjIEoQAaEHKXShAThRYGNqEMGBgAbAM4IA2qHGUArmFIIQAa3J9VzEADdKo%2BbARIW4nLknwZusZT7ksAT2MBfJqB237ThAAY3Hl4OzvD%2B7jaidsF%2BARFRPqGxnpHeIWGBKdGhAHQoSUEJvrn5mYUl8WkuALqxcorKiOKQAE5wLHoGRvAmIGZ4ltbJFTHhQ6kjGcOJowUhSOXj05OL8zOllWtT6XErC1n%2BNeF1SirU5IJYAPp8keIwyu36hnDdpuYDy%2Ft7ZZuLRXm%2FL6AwrFYEbT4JVYQ8E7fag6ExQ6yBQnRA3CC4bQdZ7GN79aQIpawn6E%2F7fGFjOEA0nkvzw4kU2Z06kMiasomUkns7actL03lsgUcpk5FlCnkiiXrRHVFxAAA',
    'sundaybloodysunday': 'N4IgdghgtgpiBcIDKBXMATCBPABAIQBsB7I9XVDbHACgFUAmAShxABoQAXGKAByIQCMABiHsAxgAsIYMDAIBnBAG1Q8omnQIQ8yACc47AG5ECKWIPbyuPRfBUhDcomICWHLAiEA6AKwBfVlBHYld3QQCgp1CPeCEIhyi3GLjAhJCk8NTg5wzY%2BOzoz3zEsLyskuTi9NKUyOrK8vqixpyaqtaGuo7PX3bC%2BAE%2B3Nq07rKu%2FpGC4aG2lsnZ5N753MGVuYmZ9c7Rhe3mzY3d4eXDmLWznv99gcWD46Pp0ouHnae3ivv3r8%2Fx15%2Bmn9vkDflNQad%2FrcbmDATCxnC9pcQbC7rEIcCXsCEVskdjHqDUXiltdcX4ALrxNQaLQAaxcYhpbAcJjMcAGlmstnsWPRBOhhMJvJR%2FJFuKF8IFosh3hJ0slpIpqSpGC0EhcUg4AH0xMR5DBNEYWeZ2dpOcokZjwbKedarajLbDxZMnSdbYCHfCXTUvcT7YK3Z6A87%2FBSKUAA%3D',
    'sexualhealing': 'N4IgdghgtgpiBcIDKMAeBXCAbABACRmwEswBzHACgFkIAnANxJwHEIBPGAShABoQAXGFAAOAewQBOAKx8AxgAsIYMDCwBnBAG1Qa0ejAATBCADWRWSd4h6orOlgIAjHzWDhG%2BNuurRsovzYnAF8eUHofPwCEAAYQsIj%2FQPhY0O8sX0SYuLSMqOTs8PTIpJT4osz81MLcpMcChLzogDopevLGtprgqoaSzuLusq7KoYGRnLG6nvba%2ForSifm5junhheqx9d6s1cnlvt2lw5XRo9OTxYuNs8vZgF1s3X0jRDVIWjg%2BGzsHeGcQVwwdxac4HUE7cHja5XbZQ2FbGYQ25I6Fg5FwxHJFr7QbohFrHEYgnHNGolHwwn4zaUynYkkxOmQqkVKZMwmsvG01r0onUh6pJ6GYzyIiKfgAfVk6TUMCMX1s9jgfxcbg8XjJWO5bJ5zS1nJ1jP1TMNGuZjRNFINetNXJpVtt9p1Du1xutltddo9jq9LrxFsxZpK%2FrW2P5Oj0QsQIrF4tEwhgYCs30VThVQLVvptTuzmfdfrdAc9RuLWdzhZzJbzpfzRerdfhwepFfr5Z9lYDjZuNrDAIjLxAUogwiTCt%2B%2F0BwM8ZeJ06bkI5LZn7aXi7ny7Xq67FJ7gv7g%2FCI5%2BSvHqpBNebVYbBZXl9b59nW7vm5hT9vN47143b82nZf75Dn6Pv%2BX4frW37zL%2BpLbo8fbGPwohQOKIqHimyoAqeU7rkBP6AX%2BIHAdhhF4URUGvmRBHER0O6wYg8GIVARBytYo7Hmmk7quBlGkRR3H4XxJHkuR%2FFcYJPGicJvECbyUmBuJUkLpxkkidJymySpfTUc8cEIeK6QAO4oWObEZlhqlgUJMnmWJ6lyWZF4WXZD6OaZSmubZbk2Z5akKQ5sxOg8DxAAAA%3D',
    'juicy': 'N4IgdghgtgpiBcIQBoQBcZQA4HsEE4AOVAYwAsIwwYAbAZwQG1Q6cBXMAEwRAGsBLErxQgAbjhptYCAIyo6GLA3jMxtHCX5oAnrIC%2ByUKPWadCAAwGjJrbviXDamhtsWrTl2fgz3x56bsHa39Xb18bLyCPAIsAOgBWcJDIpM9A1Jj7DNCovzS3RzzM3Ij0gF13Vg5uRDpIACc4VHFJaW95RWVVIpzslMLSguD8sIHk9LGR8wS%2BieHi2aHo3smF1ZX5nJn1%2Fs3d5ZSKxyquHjJ%2BCjQAfRJnOhhuZokpOHaQBRglJj27Hx25g4Anr7YFAwZZf5LUFuI4sdinRC3CBYEQtF6yDqfLo%2FKHgkrjXEEiE44mAwlTRak6FUvGU%2FEUyE0on0tYklkbMlMhlsum8xnskG0%2Fl8nn87aiiWcywVCpAAAA%3D%3D'
  }
});
