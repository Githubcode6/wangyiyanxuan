import { useStore } from 'vuex'
import { createStore } from 'vuex'
//Vuex核心概念：state(状态)、getters(获取)、 mutations(改变)、 actions(行动)、 modules(模块)
const store = createStore({
    state() {
        return {
            merId: 0
        }
    },
    mutations: {
        getMerId(state) {
            console.log(state);
            state.merId
        }
    },
    //配置固化插件
    persist: {
        //开启存储
        enabled: true,
        //默认存储到sessionStorage,并存储所有数据
        //指定存储的位置以及存储那些变量状态(该属性是可选)
        strategies: [
            {
                //存储位置
                storage: localStorage,
                //paths:是一个数组，表示存储那些状态变量
                paths: [
                    "merId"
                ]
            }
        ]
    }
})
export { store }