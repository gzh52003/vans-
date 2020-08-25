const {Router} = require('express');

const router = Router();

const {formatData,md5} =require('../utils/tools');

const mongo = require('../utils/mongodb');


// 注册端口
router.post('/',async(req,res)=>{
    let {username,password,age,gender,vcode} = req.body;
    if(vcode !== req.session.vcode){ // 
        res.send(formatData({code:10}))
        return;
    }
    password = md5(password)
    let result ;
    try{
        result = await mongo.insert('user',{'username' : username,'password' : password,'age' : age ,'gender' : gender});
        res.send(formatData());
    }catch(err){
        res.send(formatData({code:0}))
    }
})

// 查看用户名是否被占有
router.get('/check',async (req,res)=>{
    const { username } = req.query
    console.log('2312312312',username)
    const result = await mongo.find('user',{username})
    console.log(result)
    result.length > 0 ? res.send(formatData({code:0})) : res.send(formatData())
})

module.exports = router