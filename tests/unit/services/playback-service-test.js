import Ember from 'ember';
import { moduleFor } from 'ember-qunit';
import test from 'ember-beats/tests/ember-sinon-qunit/test';
import Song from 'ember-beats/models/song';
import { mockRunLater, restoreRunLater } from 'ember-beats/tests/helpers/mock-run-later';

moduleFor('service:playback-service', 'Unit | Service | playback service', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

test('it calculates the bars, beats and sixteenths', function(assert) {
  let service = this.subject();

  assert.equal(service.get('display'), '1:1:1');

  service.set('tickCount', 1);
  assert.equal(service.get('display'), '1:1:2');

  service.set('tickCount', 4);
  assert.equal(service.get('display'), '1:2:1');

  service.set('tickCount', 15);
  assert.equal(service.get('display'), '1:4:4');

  service.set('tickCount', 16);
  assert.equal(service.get('display'), '2:1:1');
});

test('tickInterval', function(assert) {
  let service = this.subject();

  service.set('song', Song.create({ tempo: 60 }));
  assert.equal(service.get('tickInterval'), 250);

  service.set('song', Song.create({ tempo: 120 }));
  assert.equal(service.get('tickInterval'), 125);
});

test('play', function(assert) {
  let service = this.subject();
  let tick = this.stub(service, 'tick');

  service.set('tickCount', 100);
  service.set('isplaying', false);

  service.play();

  assert.equal(service.get('tickCount'), 0);
  assert.equal(service.get('isPlaying'), true);
  assert.ok(tick.calledOnce, 'tick was called once');
});

test('stop', function(assert) {
  let service = this.subject();

  service.set('isplaying', true);

  service.stop();

  assert.equal(service.get('isPlaying'), false);
});

test('tick while stopped', function(assert) {
  let service = this.subject();
  let playCurrentTick = this.stub(service, 'playCurrentTick');
  let later = this.stub(Ember.run, 'later');

  service.setProperties({
    song: Song.create({ tempo: 60 }),
    isPlaying: false
  });

  service.tick();

  assert.ok(playCurrentTick.notCalled, 'playCurrentTick should not be called when stopped');
  assert.ok(later.notCalled, 'Ember.run.later should not be called when stopped');
});

test('tick while playing', function(assert) {
  let service = this.subject();
  let playCurrentTick = this.stub(service, 'playCurrentTick');
  let later = this.stub(Ember.run, 'later');

  service.setProperties({
    song: Song.create({ tempo: 60 }),
    isPlaying: true,
    tickCount: 10
  });

  service.tick();

  assert.ok(playCurrentTick.calledOnce, 'playCurrentTick should be called when playing');
  assert.ok(playCurrentTick.calledWith(11), 'playCurrentTick should receive the next tick');
  assert.ok(
    later.calledWith(
      service,
      service.tick,
      service.get('tickInterval')
    ), 'Ember.run.later should be called when playing'
  );
});

test('better tick when playing', function(assert) {
  let service = this.subject();

  service.setProperties({
    song: Song.create({ tempo: 120})
  });

  mockRunLater(this);

  assert.equal(service.get('tickCount'), 0);
  assert.equal(service.get('tickInterval'), 125);

  service.play();

  assert.equal(service.get('tickCount'), 1);

  this.mockedRunLater.advanceMilliseconds(25);
  assert.equal(service.get('tickCount'), 1);

  this.mockedRunLater.advanceMilliseconds(100);
  assert.equal(service.get('tickCount'), 2);

  this.mockedRunLater.advanceMilliseconds(125);
  assert.equal(service.get('tickCount'), 3);

  service.stop();

  this.mockedRunLater.advanceMilliseconds(1000);
  assert.equal(service.get('tickCount'), 3);

  restoreRunLater(this);
});
