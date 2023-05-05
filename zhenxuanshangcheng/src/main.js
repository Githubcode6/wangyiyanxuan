import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { store } from './stores/index'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import '@/requiresAuth/auth';

import './utils/reset.css'
import './utils/iconfont.css';

// 引入swiper样式（按需导入）
import 'swiper/css'
import 'swiper/css/pagination' // 轮播图底面的小圆点
import 'swiper/css/navigation' // 轮播图两边的左右箭头
import 'swiper/css/scrollbar'  // 轮播图的滚动条
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.use(store)

app.mount('#app')
