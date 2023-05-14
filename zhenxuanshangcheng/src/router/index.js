import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
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
      component: () => import('../views/GoodsDetail.vue'),
      children: [
        {
          path: '/store',
          name: 'store',
          component: () => import('../views/StoreIndex.vue'),
        },
        {
          path: '/store/category',
          name: 'storeCategory',
          component: () => import('../views/StoreCategory.vue')
        },
        {
          path: '/store/storeCoupon',
          name: 'storeCoupon',
          component: () => import('../views/StoreCoupon.vue')
        }
      ]
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: () => import('../views/orderList.vue')
    },
    {
      path: '/privacyagreement',
      name: 'privacyagreement',
      component: () => import('../components/Privacyagreement.vue')
    }
  ]
})

export default router
