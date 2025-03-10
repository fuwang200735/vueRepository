//引入axios包
//重要提示: 如果在启动前端项目时, 提示找不到axios, 把光标放在 import axios from "axios"的'axios', 会有一个修复提示, 导入axios, 导入即可正常使用.
import axios from "axios";
//通过axios创建对象-request对象, 用于发送请求到后端
const request = axios.create({
    timeout: 60000
})

//request拦截器的处理
//可以对请求做统一的处理
//比如统一地假如token, Content-Type等
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = "application/json;charset=utf-8";
    return config;
}, error => {
    return Promise.reject(error);
})

//导出request对象, 在其它文件引入就可以使用
export default request;
