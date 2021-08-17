const { addressMap , noticeConfig } = require('./../config');
const request = require('superagent');
const cheerio = require('cheerio');
const forEach = require('lodash');
const { okex } = addressMap;


function getNoticeRowData(url,boxFiled,itemFiled,exchange,des){
    return new Promise((resolve,reject)=>{
        request.get(url).end((err,res)=>{
            if(err) return '数据请求失败';
            var result = [];
            const $ = cheerio.load(res.text);
            $(boxFiled).each((i,v)=>{
                var li = exchange==='BINANCE'?$(v).text().trim():$(v).find(itemFiled).text().trim();
                console.log(i,li,'.....',exchange,des)
            })
        })
    })
}

function loop(datas){
    if(datas&&datas.length){
        noticeConfig.map(l=>{
            const { exchange , url , boxFiled,itemFiled,des} = l;
            getNoticeRowData(url,boxFiled,itemFiled,exchange,des)
        })
    }
}

loop(noticeConfig)

// setTimeout(() => null, 22222222)