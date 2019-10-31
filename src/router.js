import Vue from 'vue'
import Router from 'vue-router'
import Goods from 'goods/Goods'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/goods'
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
