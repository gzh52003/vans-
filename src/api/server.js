const express = require('express');

const {PORT} = require('./config.json'); // 引入端口

const rootRouter = require('./scr/router/index');  

const app = express();
app.use('/api',rootRouter)
app.listen(PORT,()=>{
    console.log(`后端服务器 ${PORT}`)
})

