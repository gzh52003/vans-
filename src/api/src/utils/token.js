const jwt = require('jsonwebtoken'); // 令牌模块
const privateKey = 'chenzhenan' // 签名


function tokenCreate(data={},exporesIn='2h'){
    // 创建一个加密令牌
    let token = jwt.sign({...data},privateKey, { expiresIn: exporesIn})
    return token;
}

function tokenVerify(token){
    let result;
    try{
        j = jwt.verify(token,privateKey) // 解密
        result = true;
    }catch(err){
        result = false;
    }   
    return result // 解密成功返回 ture 否则false
}

module.exports = {
    tokenCreate,
    tokenVerify
}

