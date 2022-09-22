import Vue from 'vue';
//
import axios from 'axios'
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$axios = axios
// 配置请求的根路径
axios.defaults.baseURL = '/api/'
// 原型上挂载axios， 所有组件都可以通过this.$http来请求
Vue.use(VueAxios)


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
