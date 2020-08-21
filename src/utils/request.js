// axios
import axios from 'axios';

const request = axios.create({
    baseURL: '/', //基础路径
    timeout: 3000,  //请求超时时间：3s
})

// get请求


export default request