const { getDatas } = require('./fetch');

function loop(fn, time) {
    console.log('fetch---satrt',new Date())
    fn();
    setTimeout(() => loop(fn, time), time);
}

loop(noop=>getDatas(),20 * 60 * 1000);


setTimeout(() => null, 22222222)
