const {Router} = require('express');

const router = Router();
const mongo = require('../utils/mongodb') // 引入数据库操作
const crypto = require('crypto'); // 加密内置模块
const {formatData,md5} = require('../utils/tools')

// 查询用户接口
router.get('/', async (req,res)=>{
    let {page=1,size=10,sort="age"} = req.query
    const skip = (page-1)*size
    const limit = size*1
    sort = sort.split(',')
    const result = await mongo.find('user',{},{skip,limit,sort})
    res.send(formatData({data:result}))
    
})

// 添加用户接口
router.post('/insert',async(req,res)=>{
    let {username,password,age,gender} = req.body;
    // 加密 
    password = md5(password,'chenzhenan')

    let result 
    try{
        result = await mongo.insert('user',[
            {'username' : `${username}`,'password' : `${password}`,'age' : `${age}`,'gender':`${gender}`}
        ])
        console.log(result)
        res.send(formatData({data:result.ops}))
    }catch(err){
        if(err) throw err ;
        res.send(formatData({code:0}))
    }
})

// 修改用户接口
router.put('/update/:id',async (req,res)=>{
    let {id} =req.params;
    // id = id.substring(1)
    let {username,password,age,gender} = req.body
    let newData = {username,age,gender}
    if(password){
        newData.password = password = md5(password)
    }
    try{
        await mongo.update('user',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})

// 删除用户接口
router.delete('/delete/:id',async (req,res)=>{
    let {id} = req.params;
    // id = id.substring(1)
    try{
        await mongo.remove('user',{_id:id});
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }
})
module.exports = router