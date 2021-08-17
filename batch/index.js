const { addressMap } = require('./../config');

function loop(fn, time) {
    fn();
    setTimeout(() => loop(fn, time), time);
  }