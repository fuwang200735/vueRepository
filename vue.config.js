const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 1000, //前端vue启动端口
    //解读:如果我们请求的地址 /api/save => 代理到 http://localhost:8080/save
    proxy: {                      //设置代理, 必须填
      '/api': {                   //设置拦截器, 拦截器格式 斜杠+拦截器名字, 名字可以自己定
        target: 'http://localhost:8080/', //代理的目标地址, 就是/api 代理 http://localhost:8080/
        changeOrigin: true,               //是否设置同源, 输入是的, 浏览器就允许跨域
        pathRewrite: {                    //路径重写
          '/api':''                       //选择忽略拦截器里面的单词
        }
      }
    }
  }


})
