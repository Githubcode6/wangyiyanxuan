import axios from "axios";
import ApI from "../utils/ApI";
const token = JSON.parse(sessionStorage.getItem("userInfo"))
axios.defaults.timeout = 5000;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token.token
        config.headers['X-Token'] = 'Bearer ' + token.token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


const getHomeData = () => {
    return axios.get(ApI.Home)
}

const getCategoryList = () => {
    return axios.get(ApI.categoryList)
}

const getProductBest = ({ page, limit, common }) => {
    return axios.get(ApI.productBest, {
        params: {
            page, limit, common,
        }
    })
}

const getHot = ({ page, limit, common }) => {
    return axios.get(ApI.hot, {
        params: {
            page, limit, common,
        }
    })
}

const getMerchant = ({ page, limit, common }) => {
    return axios.get(ApI.merchant, {
        params: {
            page, limit, 'is_best': common,
        }
    })
}

const getProductHot = ({ page, limit, common }) => {
    return axios.get(ApI.productHot, {
        params: {
            page, limit, common,
        }
    })
}
const getRecList = ({ page, limit }) => {
    return axios.get(ApI.recList, {
        params: {
            page, limit,
        }
    })
}

const getProductNew = ({ page, limit, common }) => {
    return axios.get(ApI.productNew, {
        params: {
            page, limit, common,
        }
    })
}

//footer
const getVersion = () => {
    return axios.get(ApI.version)
}
const getConfig = () => {
    return axios.get(ApI.config)
}
//秒杀
const getSeckill = () => {
    return axios.get(ApI.seckill)
}
//商品详情
const getProductDetail = (id) => {
    return axios.get(`${ApI.productDetail}/${id}`)
}
// 商品详情全部分类
const getMerchantCategory = (mer_id) => {
    return axios.get(`${ApI.merchantCategory}/${mer_id}`)
}
//登录
// 注册滑动验证
const getCaptchaType = (captchaType, clientUid, ts) => {
    return axios.get(`${ApI.captchaType}`, {
        params: {
            captchaType, clientUid, ts
        }
    })
}
const loginScan = () => {
    return axios.get(`${ApI.loginScan}`)
}
const loginScanCheck = (key) => {
    return axios.post(ApI.loginScanCheck, { key })
}
//用户协议
const userAgreement = () => {
    return axios.get(`${ApI.userAgreement}`)
}
//隐私协议
const getPrivacy = () => {
    return axios.get(`${ApI.getPrivacy}`)
}

//登录
const getLogin = (account, password) => {
    return axios.post(ApI.login, { account, password })
}
//注册 
const getRegister = (phone, pwd, sms_code, user_type) => {
    return axios.post(ApI.register, { phone, pwd, sms_code, user_type })
}
// 获取验证码
const getVerify = (captchaType, captchaVerification, phone, type) => {
    return axios.post(ApI.verify, { captchaType, captchaVerification, phone, type })
}

// 登录用户信息
const getUserInfo = () => {
    return axios.get(`${ApI.getUserInfo}`)
}
// 购物车数量
const getcartCount = () => {
    return axios.get(`${ApI.cartCount}`)
}


export {
    getHomeData, getCategoryList, getProductBest, getProductNew, getVersion,
    getConfig, getSeckill, getHot, getMerchant, getProductHot, getRecList,
    getProductDetail, getMerchantCategory, getCaptchaType, loginScan,
    loginScanCheck, userAgreement, getPrivacy, getLogin, getRegister, getVerify,
    getUserInfo, getcartCount

}