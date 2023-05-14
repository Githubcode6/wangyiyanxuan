// 	https://www.dexiaoquan.cn/api/pc/home
export default {
    Home: '/api/pc/home',
    categoryList: '/api/store/product/category/lst',
    productBest: "/api/product/spu/hot/best",
    productNew: "/api/product/spu/hot/new",
    //footer
    version: '/api/version',
    config: '/api/pc/config',
    seckill: "/api/store/product/seckill/select",
    //推荐单品
    hot: '/api/product/spu/hot/good',
    //品牌好电
    merchant: '/api/store/merchant/lst',
    //热门榜单
    productHot: '/api/product/spu/hot/hot',
    //分类广场||天天优惠
    recList: '/api/pc/rec_list',
    //商品详情
    productDetail: '/api/store/product/detail',
    //商品详情全部分类
    merchantCategory: '/api/store/merchant/category/lst/',
    //登录
    //二维码
    captchaType: '/api/ajcaptcha',
    loginScan: '/api/pc/login/scan',
    loginScanCheck: '/api/pc/login/scan/check',
    //用户协议
    userAgreement: '/api/agreement/sys_user_agree',
    //隐私协议
    getPrivacy: '/api/agreement/sys_userr_privacy',
    //登录 account password
    login: '/api/auth/login',
    //注册 phone pwd sms_code user_type
    register: '/api/auth/register',
    // 获取验证码
    verify: '/api/auth/verify',
    //用户登录信息
    getUserInfo: "/api/user",
    //购物车数量
    cartCount: '/api/user/cart/count'
}
