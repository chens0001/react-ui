import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import microApp from '@micro-zoe/micro-app'
import Routes from './router/index';


const router = new VueRouter({
  // 👇 设置基础路由，子应用可以通过window.__MICRO_APP_BASE_ROUTE__获取基座下发的baseroute，如果没有设置baseroute属性，则此值默认为空字符串
  base: window.__MICRO_APP_BASE_ROUTE__ || '/',
  routes: Routes,
})

Vue.use('VueRouter');

Vue.config.productionTip = false

microApp.start()

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
