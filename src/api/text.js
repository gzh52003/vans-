import request from "@/utils/request";
// 测试一
request.get('http://localhost:8080/data.json').then(res=>{
    console.log(res.data , 1);
}).catch(err=>{
    console.log(err);
})
// 测试二
request({
    method: 'get',
    url: 'http://localhost:8080/data.json',
}).then(res=>{
    console.log(res.data , 2);
}).catch(err=>{
    console.log(err);
})
// 常用方法
export default {
    getData(){
        return request({
            method: 'get',
            url: 'http://localhost:8080/data.json',
        })
    }
}