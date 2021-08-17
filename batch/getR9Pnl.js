const request = require('superagent');
const cheerio = require('cheerio');
const { getNR } = require('../utils');
const url = 'http://www.rainbow9.ai/FE234JON357SKFNLGJ309842JFSH9U5HFWS9S83HFG8T409HJHNVZNXZY934';
const { DBLink } = require('./link_influx');
const r9_pnl = require('./../dbconfig/r9_pnl.json');
const dbLink = new DBLink(host = '47.75.100.157', port = 8086, database = 'bfs');

dbLink.loadModelConfigs([r9_pnl]);

function loop(fn, time) {
    fn();
    setTimeout(() => loop(fn, time), time);
  }

function getRainbowData() {
    return new Promise((resolve, reject) => {
        request.get(url).end((err, res) => {
            if (err) return console.log("数据请求失败~");
            // console.log(res.text);
            const $ = cheerio.load(res.text);
            const ds = $('.content .title').text();
            resolve(ds);
        })
    })
}
function transformR9Data(data){
    if(!data) return;
    let dataArr = data.split(',');
    let p = dataArr[0].replace('total U:','');
    let t = dataArr[1].replace('update: ','');
    const o = {time:new Date(t),pnl:parseFloat(p),url_address:'FE234JON357SKFNLGJ309842JFSH9U5HFWS9S83HFG8T409HJHNVZNXZY934'}
    return [o]
    // console.log(dataArr,'test) 
}
async function saveRainbowData(){
    const data = await getRainbowData()
    if(data){
        let handleData = transformR9Data(data);
        await dbLink.batchUpsert('r9_pnl', handleData, {batchN: 1});
        console.log(transformR9Data(data))
    }
    console.log(data,parseInt(Math.abs(getNR(5,2))) * 60 * 1000,'.....')
}

loop(()=>saveRainbowData(),parseInt(Math.abs(getNR(5,2))) * 60 * 1000  )



setTimeout(() => null, 22222222)