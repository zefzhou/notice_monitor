const { getDatas } = require('./fetch');

function loop(fn, time) {
    fn();
    setTimeout(() => loop(fn, time), time);
}

loop(noop=>getDatas(),2 * 60 * 1000);


setTimeout(() => null, 22222222)
