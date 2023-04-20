import axios from "axios";
import ApI from "../utils/ApI";
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

export {
    getHomeData, getCategoryList, getProductBest, getProductNew, getVersion,
    getConfig, getSeckill, getHot, getMerchant, getProductHot, getRecList
}