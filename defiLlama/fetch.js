const { request } = require('./../request');
const async = require('async');
const BASE = 'https://api.llama.fi/charts/';
const { names } = require('./config');
const { TransDefiChainsRowsDatas , getDingTalk2Chains } = require('./transform');
const { defiLlamaZS , defiLlamaNB} = require('./../dingTalk/config');
const { sendMessage } = require('../dingTalk');


var title = 'Defi Llama Chains 信息推送';
var sendMap = {};
async function fetchDefiLlamaChainsDatasTop15(){
        async.mapLimit(names,3,async name=>{
            const url = `${BASE}${name}`;
            await new Promise(res=>setTimeout(res,5000))
            const res = await request(url);
            const chainsDatas = await TransDefiChainsRowsDatas(res,name);
            const { Up2Standard ,day1Change ,day7Change} = chainsDatas;
            if(Up2Standard){
                console.log(chainsDatas,'chains...')
                const board = await getDingTalk2Chains(Up2Standard ,day1Change ,day7Change ,name);
                if(!sendMap[name]){
                    console.log('第一次发送',name)
                    await sendMessage(title,defiLlamaNB,board);
                    await sendMessage(title,defiLlamaZS,board);
                    sendMap[name] = {};
                    sendMap[name].time = new Date().getTime();
                }else if(new Date().getTime()-sendMap[name].time>= 12 * 60 * 60 * 1000){
                    console.log('后续1h一次发送',name)
                    await sendMessage(title,defiLlamaNB,board);
                    await sendMessage(title,defiLlamaZS,board);
                    sendMap[name].time = new Date().getTime();
                }
                console.log(sendMap)
            }
        }, (err, results) => {
            if (err) throw err
            // results is now an array of the response bodies
            console.log('<--fetch end-->')
        })
} 

module.exports = {
    fetchDefiLlamaChainsDatasTop15
}
