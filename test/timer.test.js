'use strict';

var path = require('path')
  , chai = require('chai')
  , expect = chai.expect
  , Timer = require(path.join(__dirname, '..', 'lib', 'timer'))
  ;

describe('Timer', function () {
  it("should know when it's active", function () {
    var timer = new Timer();
    expect(timer.isActive()).equal(true);
  });

  it("should know when it hasn't yet been started", function () {
    var timer = new Timer();
    expect(timer.isRunning()).equal(false);
  });

  it("should know when it's running", function () {
    var timer = new Timer();
    timer.begin();
    expect(timer.isRunning()).equal(true);
  });

  it("should know when it's not running", function () {
    var timer = new Timer();
    expect(timer.isRunning()).equal(false);

    timer.begin();
    timer.end();
    expect(timer.isRunning()).equal(false);

    timer.harvest();
    expect(timer.isRunning()).equal(false);
  });

  it("should know when it hasn't yet been stopped", function () {
    var timer = new Timer();
    expect(timer.isActive()).equal(true);

    timer.begin();
    expect(timer.isActive()).equal(true);
  });

  it("should know when it's stopped", function () {
    var timer = new Timer();
    timer.begin();
    timer.end();

    expect(timer.isActive()).equal(false);
  });

  it("should know when it's been harvested and is dead", function () {
    var timer = new Timer();
    timer.begin();
    timer.harvest();

    expect(function () { timer.harvest(); }).throws(/dead timer/);
  });

  it("should return the time elapsed of a running timer", function (done) {
    var timer = new Timer();
    timer.begin();
    setTimeout(function () {
      expect(timer.getDurationInMillis()).above(3);

      return done();
    }, 5);
  });

  it("should allow setting the start as well as the duration of the range", function () {
    var timer = new Timer();
    var start = Date.now();
    timer.setDurationInMillis(5, start);

    expect(timer.start).equal(start);
  });

  it("should return a range object", function () {
    var timer = new Timer();
    var start = Date.now();
    timer.setDurationInMillis(5, start);

    expect(timer.toRange()).deep.equal([start, start + 5]);
  });
});
