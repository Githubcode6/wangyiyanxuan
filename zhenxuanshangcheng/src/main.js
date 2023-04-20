import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import '@/requiresAuth/auth';

import './utils/reset.css'
import './utils/iconfont.css'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
