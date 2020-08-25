module.exprots = {
    devServer: {
        port: 8080, //默认：8080，端口号如果被占用就会自动加一
        host: "localhost",//主机名：127.0.0.1 真机：0.0.0.0
        https: false,//协议
        open: false,//启动服务器时，自动开启浏览器访问
        proxy: {
            '/api': {
                target: '', //要代理的目标服务器地址
                changOrigin: true, //是否要代理
                pathRewrite: {
                    '^/api': '/'
                }

            }
        }
    },
    lintOnSave: false, //关闭格式检查
    productionSourceMap: false, //打包时不会生成.map文件，加快打包速度
}