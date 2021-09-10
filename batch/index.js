const {  noticeConfig ,keywords } = require('../config');
const request = require('superagent');
const cheerio = require('cheerio');
const unionBy = require('lodash/unionBy');
const forEach = require('lodash');
const { getExchangeNotice ,getDingTalkNotice} = require('./../util/transform');
const { sendMessage  } = require('./../dingTalk/index');
const { testBot } = require('./../dingTalk/config');
const { noop } = require('lodash');
var result = [];
var title = '监控信息推送';
var sendMap = {};
function getNoticeRowData(url,boxFiled,itemFiled,exchange,des){
    console.log(exchange,'fetch-start->',new Date().getTime())
    return new Promise((resolve,reject)=>{
        request.get(url).end((err,res)=>{
            if(err) return '数据请求失败';
            const $ = cheerio.load(res.text);
            $(boxFiled).each((i,v)=>{
                if(i<=10){
                    var li = exchange==='BINANCE'?$(v).text().trim():$(v).find(itemFiled).text().trim();
                    keywords.map(l=>{
                        if(li.indexOf(l)!==-1){
                            const type = des;
                            const title = li;
                            const o = { type, exchange ,title };
                            result.push(o)
                            // console.log(i,li,'.....',exchange,des)
                        }
                    })
                }
            })
            resolve(resolve)
        })
    })
}

function loop(fn, time) {
    fn();
    setTimeout(() => loop(fn, time), time);
  }
function sendDing(board,exchange){
    if(board){
        if(!sendMap[exchange]){
            sendMessage(title,testBot,board)
            sendMap[exchange] = {}
            sendMap[exchange].board = board
        }else if(sendMap[exchange].board!==board){
            sendMessage(title,testBot,board)
            sendMap[exchange].board = board
        }else{
            console.log(exchange,': 2小时以内没有新公告')
        }
    }
}

function fetchNotice(datas){
    if(datas&&datas.length){
        noticeConfig.map(l=>{
            const { exchange , url , boxFiled,itemFiled,des} = l;
            getNoticeRowData(url,boxFiled,itemFiled,exchange,des)
        })
    }
    setTimeout( async () => {
        const unionByArray = unionBy(result,'title');
        const BINANCE_NOTICE = await getExchangeNotice(unionByArray,'BINANCE');
        const HUOBI_NOTICE = await getExchangeNotice(unionByArray,'HUOBI');
        const OKEX_NOTICE = await getExchangeNotice(unionByArray,'OKEX');
        const binanceDingBoard = await getDingTalkNotice(BINANCE_NOTICE);
        const huobiDingBoard = await getDingTalkNotice(HUOBI_NOTICE);
        const okexDingBoard = await getDingTalkNotice(OKEX_NOTICE);
        setTimeout(() => {
            sendDing(binanceDingBoard,'BINANCE');
        }, 10 * 1000);
        setTimeout(() => {
            sendDing(huobiDingBoard,'HUOBI');
        }, 14 * 1000);
        setTimeout(() => {
            sendDing(okexDingBoard,'OKEX');
            console.log(sendMap)
        }, 16 * 1000);
    }, 10000);
}

// fetchNotice(noticeConfig)



loop(noop=>fetchNotice(noticeConfig),2 * 60 * 60 * 1000);


setTimeout(() => null, 22222222)


module.exports = {
    fetchNotice
}