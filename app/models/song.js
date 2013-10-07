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
    '15step': 'N4IgdghgtgpiBcICMBWABAZQC4wA5oAoAlCAEwEsB7ACxjIEoQAaEHKXShAThRYGNqEMGBgAbAM4IA2qHGUArmFIIQAa3J9VzEADdKo%2BbARIW4nLknwZusZT7ksAT2MBfJqB237ThAAY3Hl4OzvD%2B7jaidsF%2BARFRPqGxnpHeIWGBKdGhAHQoSUEJvrn5mYUl8WkuALqxcorKiOKQAE5wLHoGRvAmIGZ4ltbJFTHhQ6kjGcOJowUhSOXj05OL8zOllWtT6XErC1n%2BNeF1SirU5IJYAPp8keIwyu36hnDdpuYDy%2Ft7ZZuLRXm%2FL6AwrFYEbT4JVYQ8E7fag6ExQ6yBQnRA3CC4bQdZ7GN79aQIpawn6E%2F7fGFjOEA0nkvzw4kU2Z06kMiasomUknsslgtmcxnrZm0jlMkWCnIs%2FmI6ouIAA%3D%3D',
    'nude': 'N4IgdghgtgpiBcIByBXAJjABAWkwJQjQEsB7ACxkJABoQAXGKABxIQCYAWAVloGMyIYMDAA2AZwQBtUGJIowaBCADWRXspogAbiREpYCAIy0xDJhPjTtokryJ0AnkYC%2B1UFpt3HCAAyv3nvZO8H5u1iK2Qb7%2B4ZHeITEeEV7BoQHJUQlhSXGpiYHxabEp0dkFeWUZhflVFem5pfUlWU2ZRTnN7eWNxW01DS291ZUDPgB0XP2dU30jzYYzw61LQ3WrPR2zy2ubK7s73YP7G4ddtSfnR6eLB5dnozcXD3Nb6yETj1d3zgC6MbLyRSIMhEAR0AD6vAiYhgiloOj0BngxhAphg5ik2ye0xee2uuNuzyxXyJb3GkwJ2NexxJOOJ5M%2B9zpZI%2BlNp1Px9MZ3LZTI5315PK5gpFwvprLFZKFUtFMslNIZsoV0uVSs5Ur%2BYQBCiUYkgACc4PDdPo4MiTGYLFZVfL1Ta5Q77U67S6Bba3Y7XaTnR6fd6vcy%2FYHDgs1b6A%2Fz%2FeHo1HY8GY%2FHRhLPQnI4n02nM3jU9U%2Fn8gA',
    'idioteque': 'N4IgdghgtgpiBcICSATAlgewC4wI4Fc4AaEHKABwwQEYAWAVhIGMALCMMGAGwGcEBtUDwz4wKBCADWaJpJAkAbhi75YNEjxzk%2B8QSAXcMTNFgCeNAL5FQBrkZPn4ABis3DxswhfX97h19dfOw9Hbzdg%2F2dA23tPKJ8YkICEvziwoNjQ6NTHamyItPzM5PDi%2BNKk%2BDyUgqyasuqKyPTE5qLKlpySjMrGnrb6jvbIvtbCwYGm8am6me6x2f7ppcWF%2Ba6q4eW18pX12ssJ7Y3Rjc6D3Z3zsuverdWziwBdQOFRcUQeSAAnYn1lVRwKoaLQ6PRXe77G6Qy4nGG3SZ7WEXBHHFHwmGndFHB7YubI6E4qFDImbUmo3GE%2FEU4mIiGkrFUpE0gkk6kY8mYjnszm8nn85lcvmCzkvHxvMQSFhoNhYAD6TDsPBg4kUALUwJAmhg2gEAvp%2BMZbJF%2BrhwoNJqRRrpj3NttNeMtO2taKZFud3Kd9q9jvd3r9vv9QYuLspxoDbuDkcDIaFDujDS5YqEIkliCgEG%2BECYED4apUGuoIJ1YPj4aj5ZjCcr1ZtVZrDbrtddjZbTdbYfbXbbPc7vdp%2FdZ3b7I4Ho6Hg5ZU89EY7h0NM4rIyTr1THxAiog5Hk%2FwLQKLWtBep9zfHU4AdPRF%2FXh2O7xOz5fr6eAi8XkAAAA%3D%3D',
    'weirdfishes': 'N4IgdghgtgpiBcIDuMCWAnAJgAgGaoGcALGAkAGhABcYoAHAewQEYAWAVkoGMiIwwYAGzLwA2qAIMArmEwIQAa1RcFFEADcGgqbBaUCNOiPEahDLqioBPFgF9yodWYvWEABnuPnlm%2FDcA6dk9TQXMfd2CnUJdfDwcQsNc%2FSO8kuK9o8OT4qMTYlMy0gryInNT8ssKKjJLsmpjS%2Bqz0hIb4ZmK2ltyuzua%2Bosra7vLG1v6h3smJpsHZ6vG5xYWemeWIgF1gyRk5RAJIdDhKTW1ddv1DY3mx1aW7ldG69faBx6rbp4Cg6fuvt8%2BH2eDzsv3ewwBfkCkJGQNhELBgOG0MRwP%2BqO%2BMKxGOxN1eOIJeMxW3iO1k8iIqF4VAA%2BlxQgQYHITlodHALiADDAjAgTCCoT8iTCUUKMSKXvCuuL%2BZLmtL0UT5XDhYKJSqsVstkA',
    'imightbewrong': 'N4IgdghgtgpiBcICSACAsgSwOYAsAuKAQjCgOoBOA9mFiADQh4xQAOlCAjBwAwMDGOCGDAwANgGcEAbVDjKAVzAATBCADWGPmvogAbpVHzYnBuKYtJ8GXrGU%2BGPAE9OAXzqhdt%2B04Tc3HrwdneD93G1E7IN9%2FcMifEJjPCO9g0IDkqISwpLjUxMD4tNiU6OyCvLKMwvyqivTc10qGrPqShIBdGLlFFURxSHI4Bn1DY3gOU3NLaxy2otnM%2BfLS1sWa5o51ua21prbNvd3V6sOT47rizIPzlcuzu7zOsO7lVRwMQTwAfT4I8RgVMMDEY4ONJjALNIbi0HrcFvFrrCYfCLijfAA6ACsOwRONRy2RBKWtUa0OJzXJ21OwURaI6XQUr0Q70%2BX0oLBgYB0IxBJhAZgh0zJeLhRJFhJJISx4spRyR3Gl1NFktl9zpqvxKpl2s6nSAAA',
    'identikit': 'N4IgdghgtgpiBcICSATGYAuBLA1ljIANCBjFAA4D2CAjAMwCsxAxgBYRhgwA2AzggG1QvSgFcwKBCDzMcREADdK3UbFrFepcv3hDFPSs3wBPWgF9CoBQaMZT8AAwWrNkwieX93Q28fOvPnbu%2FtbetvYeLmG%2BDgB0DCGuQX6eoYERidHJkQHh5qlJGQVZRVHpwcXlKWV5fgC6%2FiLikoi8kABOcMRKKmrwNBpaOnpptTmjMZlV44UVNZOVY1NLiwvzyTTLa7nbE9lb%2B6uH6%2FabRxkNnk0SUqxY7BgA%2BszevDCS3cqqcP2DMNqCE5zHbHEEReIHcEJc7uCEw6pg2HQoEIvZQyHAtGY2aonFxZGI3ElJEY%2BqNMQ3RAvCDkeQ9b7qECaf7DFEzYlE6ak9lc%2BE8lZs0lnQV87li0USwWXYQUlogKAQdoQZgQfifXo%2FAZMoaAwn83Z47lwkUmwnCvXi01YzkCs2Wi2ihoNIAA%3D%3D',
    'ingenue': 'N4IgdghgtgpiBcICSYDmMwFc4BoQBcYoAHAewQEYAGKvAYwAsIwwYAbAZwQG1QPTMYACYIQAawCWdMSDwA3Um0yxKeDoWJd4vEHPak6E%2FAE9KAXxyg9bA0dPwqFq%2FsMmEVAHQBWJ7pd33b19rWzcHYP8wx0s%2FG1d7aOc4gIcgmJD49wjkqOzQhLSk%2FMCfdMiEvMzwspyKmuLwgF1ffkERRA5IACdcXUVlOHgKNQ0tHQyUxNiGqYnc%2BqrZ8pLKydX5osX1us21hb3djemqim2s%2FaO5iuaY1uFRBgkmfAB9OhsOGBF5fpUhkZgmh4hwKpRB53BQzO1UhnjBxwOCMuyxhSNB0KWtXMFx2aJWOIheKhBKaLQE90QUAgXQgdAgXB%2BSj%2BwxA6kBY1hhSJcIxXKu%2BM58P5qSFKJ5JPFgt5oqxIul8olfLFStlPJufHJ7RA7wgelkfSZgxZbKB2ilEoVsMt3JVM1ti3tiOFkptMpm1udGK96tZmtEXQkUH1CkNqlZo2B3I9Yujqq9FoT5qtidd8eT6ajPruWp1xGDvyNANN4xjKc9ZdLkNOFbjNfdda2JOrGfLVqzfsQj2eL1IxAw%2BdD%2F3D7MjrajDadlfHLanY7ns4XqsdyKXbq2zWaQAAA',
    'blackswan': 'N4IgdghgtgpiBcIQBoQBcZQA4HsEEYAGQ1AYwAsIwwYAbAZwQG1R6cBXMAEwRAGsAlqT4oQANxy12sAqnoYsjeC3F0cpAWgCeBAL7JQYtRu0JC%2Bw8c074%2BC6trrrZ%2B0ccmb5gw6enbrqz8vS3dneGCfDxdvN19PANCghLi9GMD4tMSbO0yU8OSo%2FwBdezZOHkR6SAAnOFQJKRlbOQUlFVjCiI6wrvTokLzerNSBzoKe8aTcsemwnNGJ2amFv3nIxZWMzZcS7zLuXnIBSjQAfVJHehgeeslpOGaQeRhFZm38pa315e%2Bv7p%2F%2Fn8%2Bh93mtAf1fhDwSDITDoUNBpMgcN8rtWBwDogoBBqhBSBBGLdGg98C0Xm13oQAHQAViRZlp9PCjM%2BDLprOZ7MpLO5XNh1L58J5%2FOFQsFwIFTMlHOlvKljJKJSAA%3D',
    'lotusflower': 'N4IgdghgtgpiBcIQBoQBcZQA4HsEEYBmABlQGMALCMMGAGwGcEBtUBnAVzABMEQBrAJZl%2BKEADccdDrAKoGGLE3isJ9HGUFoAngQC%2ByUOPWadCYgaMmtu%2BPktq6Gm%2BYfGnp2xcOPnZ%2BN5WHi4Bbtb%2Bgb6e%2Bj7ufl5hwf72seEJqUnpQfGuGTmhedGhALoO7Fy8iAyQAE5wqJLSsnbyisqqcUWRnSHdabnZXYn5fZkDUSEpg73DQ4Uz8xGzC9PJy0uLWRMRAHQArHqlPuU8fBSCVGgA%2BmRODDC8DVIycC0gCjBKLKte%2B%2BtbPV2B0240Bv2BP1B%2FQCfxBBUhMIh2wB0OIsIRoxG6ORULGiP%2BrlKpSAAA%3D%3D',
    'sundaybloodysunday': 'N4IgdghgtgpiBcIDKBXMATCBPABAIQBsB7I9XVDbHACgFUAmAShxABoQAXGKAByIQCMABiHsAxgAsIYMDAIBnBAG1Q8omnQIQ8yACc47AG5ECKWIPbyuPRfBUhDcomICWHLAiEA6AKwBfVlBHYld3QQCgp1CPeCEIhyi3GLjAhJCk8NTg5wzY%2BOzoz3zEsLyskuTi9NKUyOrK8vqixpyaqtaGuo7PX3bC%2BAE%2B3Nq07rKu%2FpGC4aG2lsnZ5N753MGVuYmZ9c7Rhe3mzY3d4eXDmLWznv99gcWD46Pp0ouHnae3ivv3r8%2Fx15%2Bmn9vkDflNQad%2FrcbmDATCxnC9pcQbC7rEIcCXsCEVskdjHqDUXiltdcX4ALrxNQaLQAaxcYhpbAcJjMcAGlmstnsWPRBOhhMJvJR%2FJFuKF8IFosh3hJ0slpIpqSpGC0EhcUg4AH0xMR5DBNEYWeZ2dpOcokZjwbKedarajLbDxZMnSdbYCHfCXTUvcT7YK3Z6A87%2FBSKUAA%3D',
    'sexualhealing': 'N4IgdghgtgpiBcIDKMAeBXCAbABACRmwEswBzHACgFkIAnANxJwHEIBPGAShABoQAXGFAAOAewQBOAKx8AxgAsIYMDCwBnBAG1Qa0ejAATBCADWRWSd4h6orOlgIAjHzWDhG%2BNuurRsovzYnAF8eUHofPwCEAAYQsIj%2FQPhY0O8sX0SYuLSMqOTs8PTIpJT4osz81MLcpMcChLzogDopevLGtprgqoaSzuLusq7KoYGRnLG6nvba%2ForSifm5junhheqx9d6s1cnlvt2lw5XRo9OTxYuNs8vZgF1s3X0jRDVIWjg%2BGzsHeGcQVwwdxac4HUE7cHja5XbZQ2FbGYQ25I6Fg5FwxHJFr7QbohFrHEYgnHNGolHwwn4zaUynYkkxOmQqkVKZMwmsvG01r0onUh6pJ6GYzyIiKfgAfVk6TUMCMX1s9jgfxcbg8XjJWO5bJ5zS1nJ1jP1TMNGuZjRNFINetNXJpVtt9p1Du1xutltddo9jq9LrxFsxZpK%2FrW2P5Oj0QsQIrF4tEwhgYCs30VThVQLVvptTuzmfdfrdAc9RuLWdzhZzJbzpfzRerdfhwepFfr5Z9lYDjZuNrDAIjLxAUogwiTCt%2B%2F0BwM8ZeJ06bkI5LZn7aXi7ny7Xq67FJ7gv7g%2FCI5%2BSvHqpBNebVYbBZXl9b59nW7vm5hT9vN47143b82nZf75Dn6Pv%2BX4frW37zL%2BpLbo8fbGPwohQOKIqHimyoAqeU7rkBP6AX%2BIHAdhhF4URUGvmRBHER0O6wYg8GIVARBytYo7Hmmk7quBlGkRR3H4XxJHkuR%2FFcYJPGicJvECbyUmBuJUkLpxkkidJymySpfTUc8cEIeK6QAO4oWObEZlhqlgUJMnmWJ6lyWZF4WXZD6OaZSmubZbk2Z5akKQ5sxOg8DxAAAA%3D',
    'juicy': 'N4IgdghgtgpiBcIQBoQBcZQA4HsEE4AOVAYwAsIwwYAbAZwQG1Q6cBXMAEwRAGsBLErxQgAbjhptYCAIyo6GLA3jMxtHCX5oAnrIC%2ByUKPWadCAAwGjJrbviXDamhtsWrTl2fgz3x56bsHa39Xb18bLyCPAIsAOgBWcJDIpM9A1Jj7DNCovzS3RzzM3Ij0gF13Vg5uRDpIACc4VHFJaW95RWVVIpzslMLSguD8sIHk9LGR8wS%2BieHi2aHo3smF1ZX5nJn1%2Fs3d5ZSKxyquHjJ%2BCjQAfRJnOhhuZokpOHaQBRglJj27Hx25g4Anr7YFAwZZf5LUFuI4sdinRC3CBYEQtF6yDqfLo%2FKHgkrjXEEiE44mAwlTRak6FUvGU%2FEUyE0on0tYklkbMlMhlsum8xnskG0%2Fl8nn87aiiWcywVCpAAAA%3D%3D',
    'themessage': 'N4IgdghgtgpiBcIQBoQBcZQA4HsEEYAGAJlQGMALCMMGAGwGcEBtUBnAVzABMEQHIAJzioAbjjodYBVAwxYm8ViFH0cZAJZoAngQC%2ByUKrrqtu%2BIQNG1mnQkuGVNs%2FatOTt8w%2BseXFt8amdv6OgZ6uALpu7Fy8iADWGmTxKCoSUnDw%2BLLyisphft7uQV4BzsFFBcH4Zb4VAHQArLUlrqHlpe11nT6tIb3h%2FcWDNV19lR36Y4MT3W0DhXpRjjE8fAIQwqniktJZOTAKLAsVLTNni9OXJz3D13enV4839k0Xzw%2B3VV%2BTQ9%2FznwB%2F38USiQAAA%3D'
  }
});
