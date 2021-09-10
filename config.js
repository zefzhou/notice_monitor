

const intervalMap = [1,1.5,2];
const keywords = ['下线','下線']

const noticeConfig = [
    {
        exchange:'OKEX',
        url:'https://www.okex.com/support/hc/zh-cn/sections/360000030652-%E6%9C%80%E6%96%B0%E5%85%AC%E5%91%8A',
        boxFiled:'.article-list-item',
        itemFiled:'a',
        des:'最新公告'
    },
    {
        exchange:'OKEX',
        url:'https://www.okex.com/support/hc/zh-cn/sections/360009208052-%E5%B8%81%E5%B8%81-%E6%9D%A0%E6%9D%86%E5%85%AC%E5%91%8A',
        boxFiled:'.article-list-item',
        itemFiled:'a',
        des:'币币公告'
    },
    {
        exchange:'OKEX',
        url:'https://www.okex.com/support/hc/zh-cn/sections/360009318571-%E5%90%88%E7%BA%A6%E5%85%AC%E5%91%8A',
        boxFiled:'.article-list-item',
        itemFiled:'a',
        des:'合约公告'
    },
    {
        exchange:'HUOBI',
        url:'https://www.huobi.com/support/zh-cn/list/360000039481',
        boxFiled:'.link-dealpair',
        itemFiled:'a',
        des:'最新公告'
    },
    {
        exchange:'BINANCE',
        url:'https://www.binancezh.io/zh-CN/support/announcement/c-49?navId=49',
        boxFiled:'.css-1ej4hfo',
        itemFiled:'',
        des:'最新公告'
    },
    {
        exchange:'BINANCE',
        url:'https://www.binancezh.top/zh-CN/support/announcement/c-51?navId=51',
        boxFiled:'.css-1ej4hfo',
        itemFiled:'',
        des:'API公告'
    }
]

/**
 * exchange 交易所名字
 * serviceType 服务类型
 * scheDesc 改期说明
 * system 系统 classic 经典账户，unified 统一账户
 * state scheduled:等待中 ; ongoing:进行中 ; completed:已完成 canceled: 已取消
 * 
 * status operational，degraded_performance，partial_outage，major_outage，under maintenance
 * 
 */
const exchangeNoticeList = [
    {
        exchange:'OKEX',
        serviceType:[
            {name:'0',id:'WebSocket'},
            {name:'1',id:'币币'},
            {name:'2',id:'交割'},
            {name:'3',id:'永续'},
            {name:'4',id:'期权'},
            {name:'5',id:'交易服务'}
        ],
        system:[
            {name:'classic',id:'经典账户'},
            {name:'unified',id:'统一账户'},
        ],
        url:'https://www.okex.com/api/v5/system/status',
        state:[
            {name:'scheduled',id:'等待中'},
            {name:'ongoing',id:'进行中'},
            {name:'completed',id:'已完成'},
            {name:'canceled',id:'已取消'},
        ]
    },
    {
        exchange:'HUOBI',
        //组价相关
        com_name:[
            {name:'Order Place',id:'开单'},
            {name:'Authentication',id:'认证'},
            {name:'Order Cancel',id:'取消订单'},
            {name:'Market Data',id:'市场数据'},
            {name:'Spot & Margin Trading',id:'现货和保证金交易'},
            {name:'Asset Transfer',id:'资产转移'},
            {name:'Deposit & Withdraw',id:'存款和取款'},
        ],
        com_status:[
            {name:'operational',id:'运行'},
            {name:'degraded_performance',id:'性能下降'},
            {name:'partial_outage',id:'部分停机'},
            {name:'major_outage',id:'重大停机'},
            {name:'under maintenance',id:'维护中'},
        ],
        //计划维护事件相关
        eve_status:[
            {name:'scheduled',id:'等待中'},
            {name:'in progress',id:'正在进行'},
            {name:'verifying',id:'正在严重'},
            {name:'completed',id:'已完成'},
        ],
        //系统状态指标
        indicator:[
            {name:'none',id:'无'},
            {name:'minor',id:'次要'},
            {name:'major',id:'主要'},
            {name:'critical',id:'关键'},
            {name:'maintenance',id:'维护'}
        ],
        url:'https://status.huobigroup.com/api/v2/summary.json'
    }
]


module.exports = {
    intervalMap,
    noticeConfig,
    keywords,
    exchangeNoticeList
}