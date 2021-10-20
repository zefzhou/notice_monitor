const { fetchDefiLlamaChainsDatasTop15 } = require('./fetch');

function loop(fn, time) {
    console.log('fetch---satrt',new Date());
    fn();
    setTimeout(() => loop(fn, time), time);
}

loop(noop=>fetchDefiLlamaChainsDatasTop15(), 10 * 60 * 1000);


setTimeout(() => null, 22222222)
