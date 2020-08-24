const crypto = require('crypto')

/***
 * 默认返回数据格式
*/
function formatData({code=1,data=[],num=6,msg='success'}={}){
    if(code === 0){
        msg = 'fail'
    }
    if(code === 10){
        msg = 'captchaErrer'
    }
    return{
        code,
        data,
        num,
        msg
    }
}

/**密码加密封装*/ 
function md5(data,privateKey='chenzhenan'){  //privateKey 密钥
    const hash = crypto.createHash('md5');
    hash.update(data+privateKey); // 加盐 盐值
    const result = hash.digest('hex');
    return result;
}
module.exports = {
    formatData,
    md5
}