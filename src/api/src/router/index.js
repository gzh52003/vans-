const {Router,json,urlencoded} = require('express');


const repeatRouter = require('../filter/repeat')

const session = require('express-session')
const token = require('../utils/token')

const router = Router();
const userRouter = require('./user')
const goodsRouter = require('./goods')
const vcodeRouter = require('./vcode')
const regRouter = require('./reg')
const loginRouter = require('./login')
const uploadRouter = require('./upload');
const cors = require('../filter/cors');
const { formatData } = require('../utils/tools');

// session会话
router.use(session({ // 可以通过req.session 获取 存入 session的数据
    secret : 'chenzhenan',
    resave: false,
    saveUninitialized : true,
    cookie: { // 后端设置加密cookie
        maxAge : 1000 * 60 * 60 * 2
    }
}))

router.use(cors); // CORS跨域

router.use(json(),urlencoded({extended:false})); // 格式化post数据



// 用户
router.use('/user',userRouter);
// 商品
router.use('/goods',goodsRouter);
router.use('/filter/repeat' , repeatRouter);

// 验证码
router.use('/vcode' , vcodeRouter);
// 上传
router.use('/upolad',uploadRouter)
// 注册
router.use('/reg',regRouter);
// 登录
router.use('/login',loginRouter)


// 验证token
router.get('/jwtverify',(req,res)=>{
    const currentUser = req.query;
    console.log('2222',token.tokenVerify(currentUser.currentUser))
    if(token.tokenVerify(currentUser.currentUser)){
        res.send(formatData())
    }else{
        res.send(formatData({code:0}))
    }
}) 
module.exports = router