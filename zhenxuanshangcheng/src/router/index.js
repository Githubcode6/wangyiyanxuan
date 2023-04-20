import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/goods_list',
      name: 'goodsList',
      component: () => import('../views/GoodsList.vue')
    },
    {
      path: '/goods_seckill',
      name: 'goodsSeckill',
      component: () => import('../views/GoodsSeckill.vue')
    },
    {
      path: '/goods_cate',
      name: 'goodsCate',
      component: () => import('../views/GoodsCate.vue')
    },
    {
      path: '/shop_street',
      name: 'shopStreet',
      component: () => import('../views/ShopStreet.vue')
    },
    {
      path: '/goods_presell',
      name: 'goodsPresell',
      component: () => import('../views/GoodsPresell.vue')
    },
    {
      path: '/goods_detail',
      name: 'goodsDetail',
      component: () => import('../views/GoodsDetail.vue')
    }
  ]
})

export default router
