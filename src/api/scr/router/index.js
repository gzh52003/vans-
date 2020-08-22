const {Router,json,urlencoded} = require('express');

// const session = require('express-session');

const router = Router();
const userRouter = require('./user')
const goodsRouter = require('./goods')
const cors = require('../filter/cors')
router.use(cors); // CORS跨域
router.use(json(),urlencoded({extended:false})); // 格式化post数据




// 用户
router.use('/user',userRouter);
// 商品
router.use('/goods',goodsRouter)

module.exports = router