// 上传图片

const {Router} = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const mongo = require('../utils/mongodb');
const {formatData} = require('../utils/tools');

// 配置上传参数
// 配置上传参数
let storage = multer.diskStorage({
    
    // 上传文件保存目录，无法自动创建  // 没有就自动创建
    destination : path.join(__dirname,'../public/uploads'),
   
    // 格式化文件名 ： 字段名 + 时间戳 + 扩展名 // avatar-1597202347355.jpg
    filename: function(req,file,cb){
        // 获取文件后缀名
        let ext = path.extname(file.originalname);
        console.log(file.fieldname + '-' + Date.now() + ext)
        cb(null,file.fieldname + '-' + Date.now() + ext);
    }
})

// 设置中间件
const uploadMiddleware = multer({storage})

router.post('/avatar',uploadMiddleware.single('avatar'),(req,res)=>{
    const {_id} = req.body;
    console.log(req.file)
    const avatarUrl = '/uploads/' + req.file.filename 
    mongo.update('user',{_id},{$set:{avatarUrl}})
    res.send(formatData({data:{_id,avatarUrl}}))
})

module.exports = router;