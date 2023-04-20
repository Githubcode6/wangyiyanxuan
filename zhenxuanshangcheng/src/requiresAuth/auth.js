import router from "@/router";
import axios from 'axios'

//全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        axios.get('/api/v1/user').then(res => {
            if (!res.data.user_id) {
                next({
                    path: '/main/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        })
    } else {
        next()
    }
})