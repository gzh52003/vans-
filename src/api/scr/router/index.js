const {Router,json,urlencoded} = require('express');

const router = Router();
const userRouter = require('./user')
const goodsRouter = require('./goods')
//const vcodeRouter = require('../filter/vcode')
const repeatRouter = require('../filter/repeat')

const cors = require('../filter/cors')
router.use(cors); // CORS跨域

router.use(json(),urlencoded({extended:false})); // 格式化post数据

// 用户
router.use('/user',userRouter);
// 商品
router.use('/goods',goodsRouter)
// 验证码
//router.use('/filter/vcode' , vcodeRouter)
// 用户是否重复
router.use('/filter/repeat' , repeatRouter)

module.exports = router