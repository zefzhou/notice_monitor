
const { transform } = require('lodash');
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

function getNameCn(str,list){
    var handle = ''
    if(list.length){
        forEach(list,l=>{
            if(l.name===str){
                handle =  l.id
            }
        })
    }
    return handle
}

async function transformOkexStatusInfo(datas,serviceTypeL,systemL,stateL){
    var handleData = [];
    if(datas&&datas.data&&datas.data.length>0){
        forEach(datas.data, l=>{
            const {serviceType ,state,system,title ,begin} = l;
            const type =  getNameCn(serviceType,serviceTypeL);
            const systemType =  getNameCn(system,systemL);
            const systemState =  getNameCn(state,stateL);
            const beginTime = new Date(Number(begin));
            const o = {
                type,systemType,systemState,title,beginTime
            }
            handleData.push(o)
        })
        return handleData
    }
}

async function getDingTalkNoticeOkex(datas,exchange){
    if(datas&&datas.length){
        var staticT = `#### 📣[${exchange}系统信息] \n>`;
        // const time = new Date();
        // const t = `#### 时间:${timeFormatter(time,false)}\n>`;
        var handleData = staticT;
        forEach(datas,l=>{
            const { type,systemType,systemState,beginTime} = l;
            const i = `#### 账户类型:${systemType} 状态:${systemState} 服务类型:${type} 开始时间:${timeFormatter(beginTime,false)}\n>`;
            handleData+=i
        })
        return handleData;
    }
}

async function transformHuobiStatusInfo(datas,com_name,com_status,eve_status){
    var handleData = [];
    if(datas&&datas.components){
        forEach(datas.components, l=>{
            const {name ,status} = l;
            const com_type =  getNameCn(name,com_name);
            const com_statu =  getNameCn(status,com_status);
            const o = {
                com_type,com_statu,type:'com'
            }
            handleData.push(o)
        })
    }
    if(datas&&datas.scheduled_maintenances.length>0){
        forEach(datas.scheduled_maintenances, l=>{
            const {name ,status ,started_at} = l;
            const com_type =  name;
            const com_statu =  getNameCn(status,eve_status);
            const o = {
                com_type,com_statu,started_at,type:'plan'
            }
            handleData.push(o)
        })
    }
    return handleData
}


async function getDingTalkNoticeHuoi(datas,exchange){
    console.log(exchange,'...')
    if(datas&&datas.length){
        var staticT = `#### 📣[${exchange}系统信息] \n>`;
        // const time = new Date();
        // const t = `#### 时间:${timeFormatter(time,false)}\n>`;
        var handleData = staticT;
        forEach(datas,l=>{
            const { type,com_type,com_statu} = l;
            if(com_statu!=='运'){
                if(type==='plan'){
                    const { started_at } = l;
                    const i = `#### 事件名:${com_type} 状态:${com_statu} 类型:${'维护计划'} 开始时间:${timeFormatter(new Date(started_at),false)}\n>`;
                    handleData+=i
                }else{
                    const i = `#### 名称:${com_type} 状态:${com_statu} 类型:${'系统组件'} \n>`;
                    handleData+=i
                }
            }
        })
        return handleData;
    }
}

module.exports = {
    getExchangeNotice,
    getDingTalkNotice,
    transformOkexStatusInfo,
    transformHuobiStatusInfo,
    getDingTalkNoticeOkex,
    getDingTalkNoticeHuoi
}