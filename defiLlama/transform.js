


async function TransDefiChainsRowsDatas(datas,name){
    if(!name || !datas.length) return
    const len = datas.length;
    const currentTotal = datas[len-1].totalLiquidityUSD;//当前；
    const yestodayTotal = datas[len-2].totalLiquidityUSD//昨天；
    const sevenDaysAgo = datas[len-8].totalLiquidityUSD//七天前；
    const day1Change = (currentTotal-yestodayTotal)/yestodayTotal;
    const day7Change = (currentTotal-sevenDaysAgo)/sevenDaysAgo;
    const Up2Standard = (Math.abs(day1Change)>=0.2 || Math.abs(day7Change)>=0.2)?true:false;
    return {Up2Standard,day1Change,day7Change,name}
}


function toPercent(point) {
    var str = Number(point * 100).toFixed(2);
    str += "%";
    return str;
}
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
async function getDingTalk2Chains(Up2Standard,day1Change,day7Change,name){
    if(Up2Standard){
        var staticT = `#### 📣[DefiLlama-Chain-${name}] \n>`;
        const time = new Date();
        const t = `#### 时间:${timeFormatter(time,false)}\n>`;
        const chain = `#### Name:${name}\n>`;
        var handleData = staticT + t + chain;
        const day1C = `#### 1d Change: ${day1Change>=0.2?'涨🟢':'跌🔴'}:${toPercent(day1Change)}\n>`;
        const day7C = `#### 7d Change: ${day7Change>=0.2?'涨🟢':'跌🔴'}:${toPercent(day7Change)}\n>`;
        if(Math.abs(day1Change)>=0.2&&Math.abs(day7Change)<=0.2 ){
            return handleData + day1C
        }else if(Math.abs(day1Change)<=0.2&&Math.abs(day7Change)>=0.2){
            return handleData + day7C
        }else if(Math.abs(day1Change)>=0.2&&Math.abs(day7Change)>=0.2){
            return handleData + day1C + day7C
        }
    }
}



module.exports = {
    TransDefiChainsRowsDatas,
    getDingTalk2Chains
}