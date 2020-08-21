import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
//Vue.config.productionTip = false
Vue.config.productionTip = process.env.NODE_ENV == 'production'
console.log(process.env.NODE_ENV);
// Vue.prototype.$request = request
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
