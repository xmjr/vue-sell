import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      alias: '/Goods',
      component: () => import('goods/Goods')
    },
    {
      path: '/goods',
      name: 'Goods',
      component: () => import('goods/Goods')
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: () => import('ratings/Ratings')
    },
    {
      path: '/seller',
      name: 'Seller',
      component: () => import('seller/Seller')
    }
  ],
  linkActiveClass: 'active'
})
