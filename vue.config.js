const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:false,
    proxy: { // string | Object
      '/api': {
          /* 目标代理服务器地址 */
          target: 'http://10.12.4.55:8081/',
          /* 允许跨域 */
          changeOrigin: true,
          pathRewrite: {
            '^/api': '' //规定请求地址以什么作为开头
        }
      },
    }
  },
  lintOnSave:false,
  

});
