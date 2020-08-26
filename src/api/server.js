const express = require('express');

const {PORT} = require('./config.json'); // 引入端口

const rootRouter = require('./src/router/index');  
const path = require('path')

const app = express();
// 静态资源服务器      静态资源地址     maxAge缓存时间  毫秒  Cache-Control: public, max-age=86400
app.use(express.static(path.join(__dirname,'./src/public'),{
    maxAge : 60 * 60 * 1000 * 24
}));


app.use('/api',rootRouter)

app.listen(PORT,()=>{
    console.log(`后端服务器 ${PORT}`)
})

