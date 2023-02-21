
import Vue from 'vue'
import VueRouter from 'vue-router'
import MyPage from '../components/MyPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 👇 非严格匹配，/my-page/* 都指向 MyPage 页面
    path: '/my-page/:id', // vue-router@4.x path的写法为：'/my-page/:page*'
    name: 'my-page',
    component: MyPage,
  },
]

export default routes;