const cheerio = require('cheerio');
const request = require('superagent');



function getRowData() {
    request.get('http://tianqi.moji.com/').end((err, res) => {
        if (err) return '数据请求失败';
        const $ = cheerio.load(res.text);
        const weather = $('.live_index_grid .clearfix');
        weather.each((i, v) => {
            console.log(i, $(v).text().trim())
            // console.log(weather.text().trim())
        })
    })
}



function getDouBanRowData() {
    for (let index = 0; index <= 10; index++) {
        request.get(`https://movie.douban.com/top250?start=${25*index}`).end((err, res) => {
            if (err) return '数据请求失败';
            const $ = cheerio.load(res.text);
            const movieInfo = $('.article .grid_view .item');
            movieInfo.each((i, v) => {
                const rank = $(v).find('.pic em').text().trim();
                const movieName = $(v).find('.info .hd .title').text().trim();
                console.log(rank,movieName)
            })
        })
    }
}




getDouBanRowData()




