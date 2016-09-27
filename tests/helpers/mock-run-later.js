import Em from 'ember';

function mockRunLater(context) {
  context.mockedRunLater = {
    original: Em.run.later,
    laters: [],
    next: function() { //this resolves the next queued run.later
      Em.run(() => {
        let later = context.mockedRunLater.laters.splice(0, 1)[0];

        if(later) {
          console.log('GJ: next', later);
          later.defer.resolve();
        } else {
          throw "there are no more defered run laters";
        }
      });
    },
    advanceMilliseconds: function(milliseconds) { //this resolves any queued run.laters that should be resolved
      Em.run(() => {
        let latersRan = [];
        for(let i=0; i<context.mockedRunLater.laters.length; i++) {
          let later = context.mockedRunLater.laters[i];
          later.milliseconds -= milliseconds;
          if(later.milliseconds <= 0) {
            later.defer.resolve();
            latersRan.push(later);
          }
        }

        latersRan.forEach(function(laterToRemove) {
          let indexToRemove = context.mockedRunLater.laters.indexOf(laterToRemove);
          context.mockedRunLater.laters.splice(indexToRemove, 1);
        });
      });
    }
  };

  Em.run.later = function(self, fn, milliseconds) { //TODO: GJ: this needs to handle different argument lengths (eg, there may not be a `self`)
    let defer = Em.RSVP.defer();
    defer.promise.then(fn.bind(self));
    context.mockedRunLater.laters.push({ defer, milliseconds });
  };
}

function restoreRunLater(context) {
  Em.run.later = context.mockedRunLater.original;
}

export { mockRunLater, restoreRunLater };
