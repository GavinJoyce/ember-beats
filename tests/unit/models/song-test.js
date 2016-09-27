import { moduleFor, test } from 'ember-qunit';
import Song from 'ember-beats/models/song';

moduleFor('model:song', 'Models | Song');

const FIFTEEN_STEP_ENCODED_BASE_64_DATA = 'N4IgdghgtgpiBcICMBWABAZQC4wA5oAoAlCAEwEsB7ACxjIEoQAaEHKXShAThRYGNqEMGBgAbAM4IA2qHGUArmFIIQAa3J9VzEADdKo%2BbARIW4nLknwZusZT7ksAT2MBfJqB237ThAAY3Hl4OzvD%2B7jaidsF%2BARFRPqGxnpHeIWGBKdGhAHQoSUEJvrn5mYUl8WkuALqxcorKiOKQAE5wLHoGRvAmIGZ4ltbJFTHhQ6kjGcOJowUhSOXj05OL8zOllWtT6XErC1n%2BNeF1SirU5IJYAPp8keIwyu36hnDdpuYDy%2Ft7ZZuLRXm%2FL6AwrFYEbT4JVYQ8E7fag6ExQ6yBQnRA3CC4bQdZ7GN79aQIpawn6E%2F7fGFjOEA0nkvzw4kU2Z06kMiasomUknsslgtmcxnrZm0jlMkWCnIs%2FmI6ouIA%3D%3D%3D';

test('it can deserialize a song', function(assert) {
  let song = Song.fromEncodedBase64(FIFTEEN_STEP_ENCODED_BASE_64_DATA);

  assert.equal(song.get('name'), '15 Step (Radiohead)');
  assert.equal(song.get('tempo'), 95);
  assert.equal(song.get('channels.length'), 4);

  let channel = song.get('channels.firstObject');
  assert.equal(channel.get('sound'), 'kick');
  assert.equal(channel.get('volume'), 1);
  assert.equal(channel.get('steps.length'), 10);

  let step = channel.get('steps.firstObject');
  assert.equal(step.get('velocity'), 1);
});

test('it can serialize a song', function(assert) {
  let song = Song.fromEncodedBase64(FIFTEEN_STEP_ENCODED_BASE_64_DATA);

  assert.equal(song.toEncodedBase64(), FIFTEEN_STEP_ENCODED_BASE_64_DATA);
});

test('setTick', function(assert) {
  let song = Song.fromEncodedBase64(FIFTEEN_STEP_ENCODED_BASE_64_DATA);

  song.setTick(1);

  assert.equal(song.get('channels.0.steps.0.isPlaying'), true);
  assert.equal(song.get('channels.0.steps.1.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.0.isPlaying'), true);
  assert.equal(song.get('channels.3.steps.1.isPlaying'), false);

  song.setTick(2);

  assert.equal(song.get('channels.0.steps.0.isPlaying'), false);
  assert.equal(song.get('channels.0.steps.1.isPlaying'), true);
  assert.equal(song.get('channels.3.steps.0.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.1.isPlaying'), true);

  song.setTick(10);

  assert.equal(song.get('channels.0.steps.0.isPlaying'), false);
  assert.equal(song.get('channels.0.steps.1.isPlaying'), false);
  assert.equal(song.get('channels.0.steps.9.isPlaying'), true);
  assert.equal(song.get('channels.3.steps.0.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.1.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.9.isPlaying'), true);

  song.setTick(11);

  assert.equal(song.get('channels.0.steps.0.isPlaying'), true);
  assert.equal(song.get('channels.0.steps.1.isPlaying'), false);
  assert.equal(song.get('channels.0.steps.9.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.0.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.1.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.9.isPlaying'), false);
  assert.equal(song.get('channels.3.steps.10.isPlaying'), true);
});
