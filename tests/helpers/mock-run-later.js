//Given the following component:

    // import { task, timeout } from 'ember-concurrency';
    //
    // export default Em.Component.extend({
    //   buttonText: 'Click me',
    //   buttonPressed: task(function * () {
    //     this.set('buttonText', '...please wait...');
    //     yield timeout(1001);
    //     this.set('buttonText', '...continue to wait...');
    //     yield timeout(1002);
    //     this.set('buttonText', 'Click me again');
    //   }).drop()
    // });

//We can use these helpers to write the following test:

    // test('should change text after a delay', function(assert) {
    //   mockRunLater(this);
    //
    //   assert.expect(4);
    //
    //   this.render(hbs`{{delayed-action-button}}`);
    //
    //   assert.equal(this.$('button').text(), 'Click me');
    //
    //   Em.run(() => this.$('button').click());
    //
    //   assert.equal(this.$('button').text(), '...please wait...');
    //
    //   this.mockedRunLater.next();
    //
    //   assert.equal(this.$('button').text(), '...continue to wait...');
    //
    //   this.mockedRunLater.next();
    //
    //   assert.equal(this.$('button').text(), 'Click me again');
    //
    //   restoreRunLater(this);
    // });
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
