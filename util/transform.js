
const forEach = require('lodash/forEach');

async function getExchangeNotice(exchangeNotice,exchangeType){
    var handleData = [];
    if(exchangeNotice&&exchangeNotice.length){
        forEach(exchangeNotice,l=>{
            const {exchange} = l;
            if(exchange===exchangeType){
                handleData.push(l)
            }
        })
    }
    return handleData
}
//timeformatter
function timeFormatter(date,isSecond) {
    const y = new Date(date).getFullYear();
    const m = new Date(date).getMonth() + 1;
    const d = new Date(date).getDate();
    const h = new Date(date).getHours();
    const mm = new Date(date).getMinutes();
    const s = new Date(date).getSeconds();
    const com = `${y}-${m}-${d} ${h < 10 ? '0' + h : h}:${mm < 10 ? '0' + mm : mm}`;
    return isSecond ? com + `:${s < 10 ? '0' + s : s}` : com
}

async function getDingTalkNotice(datas){
    if(datas&&datas.length){
        const { exchange } = datas[0];
        var staticT = `#### 📣[${exchange}公告信息] \n>`;
        // const time = new Date();
        // const t = `#### 时间:${timeFormatter(time,false)}\n>`;
        var handleData = staticT;
        forEach(datas,l=>{
            const { type , title} = l;
            const i = `#### 类别:${type} 标题:${title}\n>`;
            handleData+=i
        })
        return handleData;
    }
}

module.exports = {
    getExchangeNotice,
    getDingTalkNotice
}