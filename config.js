const addressMap = {
    okex:'https://www.okex.com/support/hc/zh-cn/sections/360000030652-%E6%9C%80%E6%96%B0%E5%85%AC%E5%91%8A'
}

const intervalMap = [1,1.5,2];
const keywords = ['维护','调整','现货','合约']

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

module.exports = {
    addressMap,
    intervalMap,
    noticeConfig
}