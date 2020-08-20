const {Router,json,urlencoded} = require('express');

// const session = require('express-session');

const router = Router();
const userRouter = require('./user')

router.use(json(),urlencoded({extended:false})); // 格式化post数据


// 用户列表
router.use('/user',userRouter);

module.exports = router