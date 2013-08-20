var App = require('app');

App.Song = Ember.Object.extend(Ember.Evented, {
  name: '',
  artist: '',
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
  }.property('name', 'artist', 'tempo'),
  serialize: function() {
    return {
      name: this.get('name'),
      artist: this.get('artist'),
      tempo: this.get('tempo'),
      channels: this.get('channels').invoke('serialize')
    };
  }
}).reopenClass({
  deserialise: function(data) {
    return App.Song.create({
      name: data.name,
      artist: data.artist,
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
    return App.Song.fromPreset('simple1');
  },
  presets: {
    'default': 'N4IgdghgtgpiBcICqYAuBLVAbGATEANCKjFAA4D2CAjAAy1EDGAFhGGDFgM4IDaoXCgFcw%2BRAGt0jcYRAA3CliGwaRLiTI94%2FeZwqNMATxoBfAqDl6DqY%2FFpmLVownvndWfc7sP3nm6bdLD2tbV0dgrzDfEJcfIL9bajinf29AlNDkiNSo%2BJj4JPTszKKElwA6AFYssu8AXR9BETEQZnRWVAB9CjIYMFkFJRUCtQ0tHTzImvzcjIrq0pnpqcWV8NraKuWc7ZL1pdWcrcO96LWznZP53diGhqAAA%3D',
    'song1': 'N4IgdghgtgpiBcICCAbFACAygewK5gBMBnEAGhABcYoAHbBARgYAZyBjACwjDBhRPgBtUETyEEINtgDuAIz4oyIAG7YUuWI3JEqNAcJV9sbAJYUAnowC%2BpUMqOmLCZjbsOzl%2BC9uGUxj86uvv5OXkH2fo6e3m6RAWE%2BESHR4e6hMcFRgYlpKTlx6akFebHJ2aVZCRXxzAB0AKxWALpBovgEElJgAOYQAPocJkqq6prwDNq6%2BtWF%2BWXjRfMZSZXLueWZNYur21tzO%2Ft7MyWbs8cbK0en0Q27hS0%2BbeKIbOZQshCK5CMacOOTMD0CAMlzO1wu6wWhzBoJOsIhxQRSzucMha0RVXBmPh2LRt2hqIxLgeIjEHRe2B6%2FSgJg63zUvy0IB0gOmWPRyIJSMqDBR3KuOI5B3OuKJfNFnJFdUaXIlwvZzVaZM6lN6fT80mGDLGE2ZU2BUvFQoFaPFvNlxphpotRttFvxhptTsNJOZysQgy4FD62BoMDAWtGf11LKBQkdEYVzqjIvNkcFdvjeJlSbF0YTNtdT3JlGwUAGQ3pQaZobZGdTkpjVfLWLj1etUod9bTFflNYTWfdICgEAAThA2BASEXGf89ayDc3K%2B2G1O27OcXXBU2Zy25ya16vkZ32hIKHm%2BjS6SptcGAWGQQur5vr9Pb%2FOiSvIUv7xu7zeP%2B%2Ft0rdx6TF6%2BjYPwiBgY8fh1c8y1fK1PwfL84NWJ9YLfHlE3XGD4JQrYd2eXN8w1QNRxDfVw3QwlMIwhCaiQijyKoyj4hfZCGJYujsJ%2FXCgIgexCIg8cL1bLDWP5dIaPotjhLlISJM8JjaJEmTAhwnMuJoXiz34qDmMUqTRJTMiFMM3SdMtEyzTQrcdmUiQiEgXs4BHPjS0nSzpOcMS3OMozTO8izoLM2U5PEpSOJzXsTCgdSSxIy9tPc%2FTXMknyvJS5K0r8uLUvMzNQokABrEw2DyqKx2c0jlwS%2FzfPTKqspqzL0vq%2BSUt5FoWiAAA%3D',
    'simple1': 'N4IgdghgtgpiBcIDKBLKAHANjABARhABoQAXGDAewTwAYbiBjACwjDBkwGcEBtUTigFcwAEwQgA1igYSiIAG4VMg2NWKcy6bvD4KOFBihIBPagF9CoefsMmENC1ZtHT8B5b2YDL%2B48%2Fe7Nz9rL1tXdydQnyCPEIDw4OdAvESowIj%2FMPNYpISctLzI%2BN984piirKCAXT8BYTFETkgAJzhiRWVVeDx1TW1dOMqMwejh3JKK0dSylNKh6fm5qaX0heXJ1ZXCzOjZje2Rzf3fGo860XEmFBYSAH0GL04YMXalFThu3pgtXmO3ADoAKxrI47ZIgg7jAHArYTMGuPbwuGHcJAiHIqGIlEYgr2NGw8pI7ro6pmGpAA%3D',
    'simple2': 'N4IgdghgtgpiBcIDKBLKAHANjABAJhABoQAXGDAewQEYAGW4gYwAsIwwZMBnBAbVC4UArmAAmCEAGsUjSURAA3CpiGwaxLmXQ94%2FRZwqMUJAJ40AvoVAKDR0wlqXrt42fiOr%2BzIdcOnXn3t3fxtvOzcPZzDfeGoQlyDIgPCLT1DAiPjoxKyMvzSEzILsoqi84OLyxwBdf0ERcUQuSAAnOGIlFTVYjS0dPXSUirKhpMGYscL8kZi4ytHchfmJxZXlnPXS5LWZoLndrfGNg79az3qxCWYUVhIAfUZvLhhxDuVVOB6QTRhtPhP3AA6ACsq2O2z2YMOUyBoM20whbn2iIRRwiIKhqJhyLRWJKDgx8OGKNimOCtVqQAAA',
    'simple12': 'N4IgdghgtgpiBcIDKBLKAHANjABARgCYQAaEAFxgwHsE8AGO0gYwAsIwwZMBnBAbVDcqAVzAATBCADWKJlJIgAblUzDYtUtwrpe8AUq5UmKMgE9aAX2KhFh42YR0rNuyfPwn1g5iNvHz718HDwDbH3t3TxdwvxCvMKDI0NdgqMCI%2F3iU9zxkmNS8xMzooriSjLL02KcAXQChUQlEbkgAJzhSZVV1eDxNbV19BIq04erCkYnxrPycqYKZ0tHs4qqF8umN9bWkxYrcvc2d1bGCuq8G8UkWFDYyAH0mH24YCU6VNThe%2Fpgdfi3IgA6ACs812AMsh22pyBoKh4OOvTBJxWHhByMqMMhEMxqLo6PhKNm2MRtQsdSAAA%3D%3D',
    '15step': 'N4IgdghgtgpiBcICqYAuBLVAbGATEANCKjFAA4D2CAjAAy1EDGAFhGGDFgM4IDaoXCgFcw%2BRAGt0jcYRAA3CliGwaRLiTI94%2FeZwqNMATxoBfAqDl6DqY%2FFpmLVownvndWfc7sP3nmy59LD2tbV0dgrzDfEIC3IL9bakCnf284lNDkiNSo%2BJi08ITYwvzcjOLoryT07MyaooLKnKyGstqKvMiW0u6q3ub6nsGu4YGSvtG68ZyAOgBWEwBdH0ERMRBGLAgyWQUlFXhqNQ0tHU6xpqnL00mO8sP%2Bq%2FPEx7v2xue31teH24%2F7toNarTJ4An6A%2FLA67%2Fd5Qz4woHgpF%2FCEjEE3dEIyHg%2BY%2FJLLNyrUQIEBcSAAJzgRD2yjgh2OME0fExqIu8NouJROIWKM5LORLL50NZoSF7IFwrFYN5PP5XJlEvhcIBUveIpcqsR8sFsuFipVuvZmp6y2WQAAA%3D',
  }
});


