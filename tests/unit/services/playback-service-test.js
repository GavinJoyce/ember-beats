import Ember from 'ember';
import { moduleFor } from 'ember-qunit';
import test from 'ember-beats/tests/ember-sinon-qunit/test';
import Song from 'ember-beats/models/song';
import { mockRunLater } from 'ember-beats/tests/helpers/mock-run-later';

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
  service.set('isPlaying', false);

  service.play();
  assert.equal(service.get('tickCount'), 0);
  assert.equal(service.get('isPlaying'), true);
  assert.ok(tick.calledOnce, 'tick was called once');
});

test('stop', function(assert) {
  let service = this.subject();
  service.set('tickCount', 50);
  service.set('isPlaying', true);

  service.stop();
  assert.equal(service.get('tickCount'), 50);
  assert.equal(service.get('isPlaying'), false);
});

test('tick when stopped', function(assert) {
  let service = this.subject();
  let next = this.stub(service, 'next');
  let runLater = this.stub(Ember.run, 'later');

  service.setProperties({
    song: Song.create({ tempo: 60}),
    isPlaying: false
  });

  service.tick();
  assert.ok(next.notCalled, 'next was not called');
  assert.ok(runLater.notCalled, 'Ember.run.later was not called');
});

test('tick when playing', function(assert) {
  let service = this.subject();
  let next = this.stub(service, 'next');
  let runLater = this.stub(Ember.run, 'later');

  service.setProperties({
    song: Song.create({ tempo: 60}),
    isPlaying: true
  });

  service.tick();
  assert.ok(next.calledOnce, 'next was called once');
  assert.ok(runLater.calledOnce, 'Ember.run.later was called once');
  assert.ok(runLater.calledWith(service, service.tick, service.get('tickInterval')), 'the next tick() is scheduled correctly');
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
});
