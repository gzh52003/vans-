const {Router} = require('express');

const router = Router();
const mongo = require('../utils/mongodb') // 引入数据库操作
const {formatData,md5} = require('../utils/tools')

// 查询商品接口
router.get('/find',async (req,res)=>{
    let {page=1,size=10,sort="price"} = req.query
    const skip = (page-1)*size
    const limit = size*1
    sort = sort.split(',')
    const result = await mongo.find('vans',{},{skip,limit,sort})
    res.send(formatData({data:result}))
})

// 获取单个商品信息
router.get('/find/:id',async(req,res)=>{
    const {id} = req.params; // 通过req.params 获取前端过来id

    const result = await mongo.find('vans',{_id:id});
    res.send(formatData({data : result[0]}));
})

// 添加商品接口
router.post('/insert',async (req,res)=>{
    let {littlename,name,price,imgurl} = req.body;
    console.log(littlename,name,price,imgurl)
    let result
    try{
        result = await mongo.insert('vans',[
            {'littlename' : `${littlename}`,'name' : `${name}`,'price' : `${price}`,'imgurl' : `${imgurl}`}
        ])
        res.send(formatData({data:result.ops}))
    }catch(err){
        if(err) throw err;
        res.send(formatData({code:0}))
    }
})

// 修改商品接口
router.put('/update/:id',async (req,res)=>{
    let {id} = req.params;
    let {littlename,name,price,imgurl} = req.body;
    let newData = {littlename,name,price,imgurl}
    try{
       await mongo.update('vans',{_id:id},{$set:newData});
  
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){ 
        if(err) throw err;
        res.send(formatData({code:0}))
    }
}) 

// 删除商品接口
router.delete('/delete/:id',async (req,res)=>{
    const {id} = req.params;
   console.log('3444444444444444',id)
    try{
        let result = await mongo.remove('vans',{_id:id});
        res.send(formatData({data:result.ops}));
    }catch(err){
        if(err) throw err;
        res.send('fail')
    }
})
module.exports = router