const express = require('express');
const router = express.Router();

const { formatData } = require("../utils/tools")
const mongo = require('../utils/mongodb');

// 用户名是否重复
router.get('/check' , async (req , res)=>{
    const {username} = req.query
    const result = await mongo.find("user" , {username})
    if(result.length > 0){
        res.send(formatData({code: 0}))
    }else{
        res.send(formatData())
    }
})

module.exports = router