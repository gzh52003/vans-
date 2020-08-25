const { Router } = require('express');
const router = Router();
const mongo = require('../utils/mongodb');
const { formatData,md5 } = require('../utils/tools');

const {tokenCreate,tokenVerify} = require('../utils/token');

// 登录
router.get('/', async (req,res)=>{
    let {username,password,vcode,autoLogin} = req.query

    if(vcode !== req.session.vcode){// 输入的yzm 和 存入session的yzm判断
        res.send(formatData({code:10}))
        return
    }
    password = md5(password)

    let result = await mongo.find('user',{username,password})
    let authorization;
    if(result.length > 0){
        if(autoLogin === 'true'){ // 是否选择了七天免登录 ，否 默认 2h
            authorization = tokenCreate({username},'7d')
        }else{
            authorization = tokenCreate({username})
        }
        result = result[0]
        result.authorization = authorization 
        res.send(formatData({data:result}));
    }else{
        res.send(formatData({code:0}))
    }
})

