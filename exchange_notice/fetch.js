const { exchangeNoticeList } = require('./../config');
const { request  } = require('./../request');
const forEach = require('lodash/forEach');
const { transformOkexStatusInfo ,transformHuobiStatusInfo , getDingTalkNoticeOkex ,getDingTalkNoticeHuoi} = require('./../util/transform');
const { sendMessage  } = require('./../dingTalk/index');
const { testBot } = require('./../dingTalk/config');

var title = '系统信息推送';
var sendMap = {};

async function getDatas(){
    var n = new Date().getTime();
    forEach( exchangeNoticeList , async l=>{
        var { exchange ,url } = l;
        const datas = await request(url)
        if(exchange==='OKEX'&&datas){
            const {serviceType,system,state } = l;
            const rowDatas = await transformOkexStatusInfo(datas,serviceType,system,state);
            if(rowDatas){
                const boarde = await getDingTalkNoticeOkex(rowDatas,exchange);
                if(!sendMap[exchange]){
                    sendMessage(title,testBot,boarde)
                    sendMap[exchange] = n;
                }else if(n-sendMap[exchange]>1 * 60 * 60 * 1000){
                    sendMessage(title,testBot,boarde)
                    sendMap[exchange] = n;
                }
            }
        }else if(exchange==='HUOBI'){
            const {com_name,com_status,eve_status,indicator } = l;
            const rowDatas = await transformHuobiStatusInfo(datas,com_name,com_status,eve_status,indicator);
            if(rowDatas&&rowDatas.length>0){
                const boarde = await getDingTalkNoticeHuoi(rowDatas,exchange);
                if(boarde.length>25){
                    if(!sendMap[exchange]){
                        sendMessage(title,testBot,boarde)
                        sendMap[exchange] = n;
                    }else if(n-sendMap[exchange]>  60 * 1000){
                        sendMessage(title,testBot,boarde)
                        sendMap[exchange] = n;
                    }
                }
                console.log(boarde.length,'boarderboarder')
            }
        }
    })
}

// getDatas()

module.exports = {
    getDatas
}