const dingBase = 'https://oapi.dingtalk.com/robot/send?access_token=';

//test myself
 const testBot = dingBase + '89abeeba1ce51eed5f742da5a3072f5dc5a3fdeff44cbcbf2db9cb353ce1a942'; 
//Defi Llama | heson [ChainsTop15]
const defiLlamaZS = dingBase + 'a652b5ca46dbcba5253ebf1f7380a8cef936c018491505659eabc11277959474';
//Defi Llama | heson [ChainsTop15][内]
const defiLlamaNB = dingBase + 'ebcf327bc3eedcb8419adb6c99f83d27e1303f41fb22d1a17b1da0a53b5bbb6c'
module.exports = {
    testBot,
    defiLlamaZS,
    defiLlamaNB
}