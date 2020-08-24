function cors(req,res,next){
    // 获取请求者的域名
    res.set({
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Headers":"Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
        "Access-Control-Allow-Methods":"PUT,POST,GET,PATCH,DELETE,OPTIONS"
    })
    // 跨域请求CORS中的预请求
    if(req.method=="OPTIONS") {
        res.sendStatus(200);/*让options请求快速返回*/
    } else{
        next();
    }
}

module.exports = cors;