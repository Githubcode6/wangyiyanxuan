<script setup>
import { getProductDetail, getMerchantCategory } from "../hooks/useRequest";
import { useRouter } from "vue-router";
import { ref, onUpdated } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
const modules = [Navigation, Pagination, Scrollbar, A11y];
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
const productDetail = ref([]);
const merId = ref([]);
const currentImgSrc = ref("");
const isActive = ref(0);
const router = useRouter();
//input 数量
const num = ref(1);
if (
  router.currentRoute.value.query.id &&
  router.currentRoute.value.query.mer_id
) {
  getProductDetail(router.currentRoute.value.query.id).then((res) => {
    currentImgSrc.value = res.data.data.image;
    productDetail.value = res.data.data;
  });
  getMerchantCategory(router.currentRoute.value.query.mer_id).then((res) => {
    merId.value = res.data.data;
  });
} else {
  getProductDetail(router.currentRoute.value.query.id).then((res) => {
    currentImgSrc.value = res.data.data.image;
    productDetail.value = res.data.data;
  });
  console.log(5555);
}

const handleChange = (value) => {
  console.log(value);
};
const onMouseEnter = (item) => {
  currentImgSrc.value = item.explicitOriginalTarget.currentSrc;
  isActive.value = item.target.swiperSlideIndex;
};
 onUpdated(() => {
  getProductDetail(router.currentRoute.value.query.id).then((res) => {
    currentImgSrc.value = res.data.data.image;
   productDetail.value = res.data.data;
  });
});
</script>
<template>
  <div style="margin-top: 140px">
    <div class="menu-count">
      <div class="user-menu user-wrapper acea-row row-middle">
        <div class="menu-main acea-row row-middle">
          <div class="menu-item">
            <router-link to="/store" class="menu-item">店铺首页</router-link>
          </div>
          <div class="menu-item">
            <el-tooltip placement="bottom-start" effect="light">
              <template #content>
                <div class="category acea-row row-middle">
                  <div class="sort">
                    <div
                      class="item acea-row row-between-wrapper"
                      v-for="item in merId"
                      :key="item.store_category_id"
                    >
                      <div class="name line1">
                        {{ item.cate_name }}
                        <span class="iconfont icon-you"></span>
                      </div>
                      <div class="sortCon">
                        <div
                          class="erSort acea-row"
                          v-for="item in item.children"
                          :key="item.store_category_id"
                        >
                          <router-link
                            :to="`/store/category?id=${item.store_category_id}`"
                          >
                            <div class="sub-item line1">
                              {{ item.cate_name }}
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a href="" class="moreBtn"> 查看全部商品 </a>
                </div>
              </template>
              <router-link to="/store/category" class="menu-item">
                全部分类
              </router-link>
            </el-tooltip>
          </div>
          <div class="menu-item">
            <router-link to="/store/storeCoupon" class="menu-item"
              >领优惠券</router-link
            >
          </div>
        </div>
        <div class="menu-search acea-row row-middle">
          <div class="text">
            <input type="text" placeholder="店内商品搜索" />
          </div>
          <div class="bnt">
            <span class="iconfont icon-xiazai5"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="category">
      <router-view></router-view>
    </div>
    <div class="wrapper_1200 acea-row">
      <div class="goods-main">
        <div class="goods-detail">
          <div class="carousel">
            <!-- 上面展示的图片 -->
            <img :src="currentImgSrc" alt="" />
            <!-- 轮播图-->
            <swiper
              :slides-per-view="4"
              :spaceBetween="20"
              :navigation="true"
              :pagination="{
                clickable: true,
              }"
              :modules="modules"
              class="mySwiper"
            >
              <swiper-slide
                v-for="(item, index) in productDetail.slider_image"
                :key="index"
                @mouseenter="onMouseEnter"
              >
                <div
                  style="height: 100%"
                  :class="[isActive === index ? 'swiperSlideActive' : '']"
                >
                  <img :src="item" alt="" />
                </div>
              </swiper-slide>
            </swiper>
            <!-- 收藏/联系客服 -->
            <div
              class="acea-row row-middle customer_service"
              style="display: flex"
            >
              <div class="btn" style="width: 60px">
                <span class="iconfont icon-shoucang2"></span>收藏
              </div>
              <div class="btn contactBtn">
                <span class="iconfont icon-kefu2"></span>联系客服
              </div>
            </div>
          </div>
          <div class="text-wrapper">
            <div class="title">
              {{ productDetail.store_name }}
            </div>
            <div class="acea-row row-middle money-wrapper">
              <div class="price">
                ￥<span>{{ productDetail.price }}</span>
              </div>
              <del>￥{{ productDetail.ot_price }}</del>
              <div class="sales acea-row row-column row-center-wrapper">
                （销量 {{ productDetail.sales }}套）
              </div>
            </div>
            <div class="attribute"></div>
            <div class="number-wrapper acea-row">
              <div class="label">数量</div>
              <div class="counter-wrap">
                <div class="counter">
                  <el-input-number
                    size="large"
                    v-model="num"
                    :min="1"
                    :max="productDetail.stock"
                    @change="handleChange"
                  />
                </div>
                <span
                  >（库存{{ productDetail.stock
                  }}{{ productDetail.unit_name }}）</span
                >
              </div>
            </div>
            <div class="button-wrapper" v-if="productDetail.stock > 0">
              <button class="btn cart">加入购物车</button>
              <button class="btn">立即购买</button>
            </div>
            <div class="button-wrapper" v-else>
              <button class="btn btn-out" disabled="disabled">已售罄</button>
              <button class="btn btn-notify">
                <span class="iconfont icon-duoshanghupc-daohuotongzhi"></span>
                到货通知
              </button>
            </div>
          </div>
          <!-- 产品详情 -->
          <div class="detail-wrapper">
            <div class="detail-hd acea-row">
              <div class="tab acea-row">
                <div class="item acea-row row-center-wrapper on">产品详情</div>
              </div>
              <div class="acea-row row-center-wrapper qrcode-button">
                <div class="qrcode">
                  <el-popover
                    class="qrcode-button"
                    placement="bottom"
                    trigger="hover"
                  >
                    <template #reference>
                      <el-button class="m-2">
                        <span class="iconfont icon-saoma"></span>
                        手机购买
                        <span class="iconfont icon-xiangxia2"></span>
                      </el-button>
                      <div class="phoneBuy">
                        <img
                          src="data:image/png;base64,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mV/0LhlXludxTiOCVKlRRZDW8okgwU06u8n05GVB4jaHWWKxX+iMK63xN8nJCiML8qYYo7eWN9NfNy2xphERQRi6trI0fsyddMYEy4LEJ1IWZBqrTWdBvDrplobFJr5uv/32W7l//37YgjBpa5hNMKrzbWMzj1rdUB3tjDrf586da5KCo/EdPHiwHD16NDw+zwKzaXXiVC/l1atX5cWLF+HxeX2zBPH0D4350KFDbuqqrpt05guIBsL48VkAZx1M2dNLxOLHLFGZpA1oHGyoSQZBmPllyG6yKW5eEWQadhEkvscUQYKUlQUJAgXEmFAO9CRZkBYZWZAKE3aJMGs3qpZYLQJaYlWYaA/SKoksyL5hJhj8OsWCWLkrS2Y82azut9X/rhuqk44m2EuQjEqIIYS88aESXajE2VdffVV++eWX5hF2Il83tAdh6nyjdzGPl5cUnBlfxhIL1XE/depU8Tx7aHyepxN9AO297f3r5s0vekekf7CO+7twDuKBxVZBZUqIseHaTGZKNhyf+awyexA2ViwjLREzPvTe9BJaBImpkAgyjZMI4ujNRj1JlwWJfQSYL7QIIoJMISALIguy5mcG1SH3fog26ahOOqqj/fnnnzfds3W+mfFZ5Smr7lS3s2fPurlovU06qvONAD5z5kyxuuiTzUJ1bCNcN3aT7j0T4YcsiI2jruCE6rizm/R79+41QzRniG3q62YrGOt/tJv0NRk0ITB2E8yOD707E8qB+hhLJAKTNqlnMCobiTCacxARpEVABJnGhPYSOUVaRZAZJ23wiC0LcqKBRRbE+QAybl5ZEFmQtwhoicWwwZFlv9CzPkhix6c9yJMpCESQgQRh66RbShxLK1S3/fv3N39bXl4uVne7bqiOe88lVkYdd2+TifBjL5x5747qpCP8vJN+liAZF87sIpZdyKqbja8OdULq2/XC1EDOrOvnTLQs84AsC8I8k0lejfplN8HM+JBsBkEyxsHskdDzut5Jz3hJtg8RZBoxEeSCa0G88yhP10SQIANlQYJAvRGTBYljNXNJWRBZkLcIaInl0E8EEUFEkFXskpd8+enTp25qHtSNVycdJa9GyY2trrglza6bl7yaTf7N1PlGyb8XFhaK1Revm5ccGuGEkn9bPXTDa7LZxTJLCl43q1PveSPRMz382Dru58+fb9Imoed1TV498/UVeGDP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"
                        />
                      </div>
                    </template>
                    <div class="qrcode">
                      <div class="phoneBuy">
                        <img
                          src="data:image/png;base64,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"
                        />
                      </div>
                    </div>
                  </el-popover>
                </div>
              </div>
            </div>
            <div class="detail-bd">
              <div class="detail-html" v-if="productDetail.content">
                <div v-html="productDetail.content.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧展示商品 -->
      <div class="goods-detail">
        <div class="recom-section">
          <div
            class="user-info"
            v-if="productDetail.merchant && productDetail.merchant.mer_avatar"
          >
            <div class="store-basis">
              <div class="store-logo">
                <img :src="productDetail.merchant.mer_avatar" alt="" />
              </div>
              <div class="line1">
                <span
                  class="trader"
                  v-show="productDetail.merchant.recommend.length > 0"
                >
                  自营
                </span>
                <span class="store-name line1">{{
                  productDetail.merchant.mer_name
                }}</span>
              </div>
            </div>
            <div class="store-info">
              <div class="items acea-row row-middle">
                <span class="titles">店铺评分</span>
                <div class="cont">
                  <span class="iconfont icon-pingjia star on"></span>
                  <span class="iconfont icon-pingjia star on"></span>
                  <span class="iconfont icon-pingjia star on"></span>
                  <span class="iconfont icon-pingjia star on"></span>
                  <span class="iconfont icon-pingjia star on"></span>
                </div>
              </div>
              <div class="items acea-row row-middle">
                <span class="titles">关注人数</span>
                <span class="desc">0人</span>
              </div>
              <div class="items acea-row row-middle">
                <span class="titles">联系电话</span>
                <span class="desc">{{
                  productDetail.merchant.service_phone
                }}</span>
              </div>
              <div class="items acea-row row-middle">
                <span class="titles">店铺资质</span>
                <router-link to="" class="desc">
                  <img
                    src="https://www.dexiaoquan.cn/pc/img/store_qualify.8e11d80.png"
                    alt=""
                    class="store_qualify"
                  />
                  <span class="license">企业营业执照</span>
                </router-link>
              </div>
            </div>
            <div class="store-favorites">
              <button class="collection">进店逛逛</button>
              <button class="collection">收藏店铺</button>
            </div>
          </div>
          <div class="store-recommend" v-if="productDetail.merchant">
            <div class="title">
              <span>店铺推荐</span>
            </div>
            <div
              class="list"
              v-for="item in productDetail.merchant.recommend"
              :key="item.product_id"
            >
              <router-link
                :to="`/goods_detail?id=${item.product_id}`"
                class="item"
              >
                <div class="image">
                  <img :src="item.image" alt="" />
                </div>
                <div class="text">
                  <div class="name">{{ item.store_name }}</div>
                  <div class="acea-row row-between-wrapper">
                    <div class="money">
                      ￥<span>{{ item.price }}</span>
                    </div>
                    <div class="sales">销量 {{ item.sales }}</div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped >
.menu-count {
  width: 100%;
  height: 40px;
  background: #dfdfdf;
}
.store-name {
  display: inline-block;
  width: 120px;
  position: relative;
  top: 4px;
}
.user-menu {
  position: relative;
  display: flex;

  justify-content: space-between;
  width: 1200px;
  margin: 0 auto;
}
.user-menu .category {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: rgba(254, 248, 248, 0.96);
  width: 100%;
  padding: 40px 20px 20px;
  z-index: 10;
}
.category .name {
  width: 130px;
  position: relative;
  padding-right: 20px;
  margin-right: 30px;
  cursor: pointer;
}
.category .name .iconfont {
  font-size: 10px;
  position: absolute;
  right: 0;
  top: 3px;
  color: #282828;
}

.sortCon {
  width: 1000px;
  display: flex;
}
.row-between-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.category .sortCon .sub-item {
  margin: 0 15px 15px;
  color: #666;
  cursor: pointer;
}
.category .erSort {
  align-items: center;
  display: flex;
}
.category .item {
  display: flex;
  margin: 20px 0px;
  align-items: baseline;
}
.moreBtn {
  color: #282828;
  font-size: 12px;
  display: block;
  width: 100px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 13px;
  border: 1px solid #666;
  margin-bottom: 25px;
}
.menu-main {
  width: 300px;
  height: 40px;
  display: flex;
  justify-content: space-between;
}
.menu-main .menu-item {
  display: flex;
  width: 104px;
  align-items: center;
  color: #282828;
  padding: 0 10px;
  cursor: pointer;
  text-align: center;
}
.menu-main .menu-item .router-link-active {
  background: #282828;
  color: #fff;
  border-radius: 15px;
  padding: 3px;
}
.menu-search {
  width: 220px;
  height: 24px;
  background-color: #fff;
  border-radius: 17px;
  display: flex;
  margin-top: 8px;
}
.menu-search .text {
  width: 175px;
}
.menu-search input {
  border: none;
  height: 24px;
  line-height: 24px;
  color: #999;
  padding: 0 15px;
  border-radius: 17px;
}
.menu-search input:focus {
  border: none;
  outline: none;
}
.user-menu .menu-search .bnt {
  width: 44px;
  background-color: #282828;
  color: #fff;
  border-radius: 0 17px 17px 0;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
}
.goods-detail {
  display: flex;
  flex-wrap: wrap;
}
.goods-detail .carousel {
  width: 380px;
  height: 380px;
}
.goods-detail .carousel img {
  width: 100%;
  height: 100%;
}
.goods-detail .carousel .mySwiper {
  background-color: #fff;
}
/* 轮播图 */
.goods-detail .carousel .swiper .swiper-slide {
  height: 70px;
  line-height: 70px;
}
.wrapper_1200 {
  display: flex;
}
.goods-main {
  width: 948px;
}

.goods-detail .user-info {
  width: 210px;
  height: 350px;
  background: #fff;
  color: #282828;
  font-size: 14px;
  border: 1px solid #efefef;
  border-radius: 4px;
  padding: 0 20px;
}
.goods-detail .user-info,
.goods-detail .user-info .store-basis {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.goods-detail .user-info {
  width: 210px;
  height: 350px;
  background: #fff;
  color: #282828;
  font-size: 14px;
  border: 1px solid #efefef;
  border-radius: 4px;
  padding: 0 20px;
}
.goods-detail .user-info,
.goods-detail .user-info .store-basis {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.goods-detail .user-info .store-basis {
  border-bottom: 1px dashed #ececec;
  height: 130px;
}
.goods-detail .user-info .store-basis .trader {
  display: inline-block;
  width: 32px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  color: #e93323;
  color: #fff;
  background: #e93323;
  border-radius: 2px;
  margin-right: 3px;
  font-size: 12px;
  font-family: "PingFang SC";
}
.goods-detail .user-info .store-logo {
  width: 61px;
  height: 61px;
  margin-bottom: 15px;
}
.goods-detail .user-info .store-logo img {
  width: 61px;
  height: 61px;
  border-radius: 50%;
}
.goods-detail .user-info .name {
  margin-top: 10px;
  padding: 0 15px;
}
.goods-detail .store-info {
  padding: 15px 0 0;
  position: relative;
  border-bottom: 1px dashed #ececec;
}
.goods-detail .store-info .service {
  right: 210px;
  position: absolute;
  top: 0;
}
.goods-detail .store-info .service .ewm {
  width: 140px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  color: #282828;
}
.goods-detail .store-info .service .ewm .tip {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
.goods-detail .store-info .items {
  font-size: 12px;
  color: #7e7e7e;
  margin-bottom: 15px;
  display: flex;
}
.goods-detail .store-info .items .iconfont {
  cursor: pointer;
}
.goods-detail .store-info .items .cont {
  margin-left: 8px;
}
.goods-detail .store-info .items .star {
  font-size: 12px;
  color: #e6e6e6;
}
.goods-detail .store-info .items .star ~ .star {
  margin-left: 5px;
}
.goods-detail .store-info .items .star.on {
  color: #e93323;
}
.goods-detail .store-info .items .titles {
  color: #999;
  font-size: 12px;
  margin-right: 15px;
}
.goods-detail .store-info .items .desc {
  color: #333;
  position: relative;
}
.goods-detail .store-info .items .desc .store_qualify {
  width: 16px;
  height: 16px;
}
.goods-detail .store-info .items .desc .store_qualify:hover + .license {
  display: inline-block;
}
.goods-detail .store-info .items .license {
  width: 90px;
  line-height: 26px;
  color: #fff;
  text-align: center;
  background: #282828;
  border-radius: 5px;
  position: absolute;
  top: 26px;
  left: -10px;
  display: none;
}
.goods-detail .store-info .items .license:before {
  content: "";
  display: inline-block;
  border: 3px solid transparent;
  border-bottom-color: #282828;
  position: absolute;
  top: -6px;
  left: 15px;
}
.goods-detail .recom-section {
  width: 210px;
  min-width: 210px;
  margin-left: 40px;
}
.goods-detail .recom-section .store-recommend {
  margin-top: 10px;
  padding: 0 20px;
  border: 1px solid #efefef;
  border-radius: 4px;
}
.goods-detail .recom-section .title {
  height: 60px;
  font-size: 16px;
  line-height: 60px;
  text-align: center;
  color: #5a5a5a;
}
.goods-detail .recom-section .title span {
  position: relative;
}
.goods-detail .recom-section .title span:before {
  right: 100%;
  margin-right: 18px;
}
.goods-detail .recom-section .title span:after,
.goods-detail .recom-section .title span:before {
  content: "";
  position: absolute;
  top: 50%;
  width: 35px;
  height: 1px;
  border-top: 1px solid #efefef;
  transform: translateY(-50%);
}
.goods-detail .recom-section .title span:after {
  left: 100%;
  margin-left: 18px;
}
.goods-detail .recom-section .item {
  display: block;
  width: 170px;
  margin-bottom: 20px;
}
.goods-detail .recom-section .item .image {
  width: 170px;
  height: 170px;
}
.goods-detail .recom-section .item .image img {
  display: block;
  width: 100%;
  height: 100%;
}
.goods-detail .recom-section .item .text .name {
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  color: #666;
}
.goods-detail .recom-section .item .text .money {
  font-weight: 700;
  font-size: 14px;
  color: #e93323;
}
.goods-detail .recom-section .item .text .money span {
  font-size: 18px;
}
.goods-detail .recom-section .item .text .sales {
  font-size: 12px;
  color: #888;
}
.goods-detail .customer_service {
  margin-top: 20px;
}
.goods-detail .carousel .btn {
  margin-right: 30px;
  font-size: 12px;
  color: #4b4b4b;
  cursor: pointer;
}
.goods-detail .carousel .iconfont {
  margin-right: 6px;
  font-size: 14px;
  color: #e93323;
}

.store-favorites {
  margin-top: 14px;
}
.store-favorites .collection {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #333;
  border: 1px solid #c8c8c8;
  border-radius: 2px;
  background: #fff;
}
.store-favorites .collection .care {
  color: #fff;
  background-color: #e93323;
  border-color: #e93323;
}

/*  */
.goods-detail .text-wrapper {
  flex: 1;
  min-width: 0;
  margin-left: 40px;
}
.goods-detail .text-wrapper .title {
  font-size: 20px;
  line-height: 26px;
  color: #333;
}

.goods-detail .text-wrapper .money-wrapper {
  align-items: flex-end;
  height: 70px;
  padding: 0 0 18px 32px;
  margin-top: 18px;
  background: url(https://www.dexiaoquan.cn/pc/img/money-back.6e5b225.png) 50% /
    cover no-repeat;
  background-position-x: 50%;
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  display: flex;
}
.goods-detail .text-wrapper .money-wrapper {
  color: #fff;
}
.goods-detail .text-wrapper .money-wrapper .price {
  font-size: 22px;
}
.goods-detail .text-wrapper .money-wrapper .price span {
  font-weight: 700;
  font-size: 30px;
}
.goods-detail .text-wrapper .money-wrapper del {
  margin: 0 0 5px 10px;
  font-size: 14px;
  line-height: 19px;
}
.goods-detail .text-wrapper .money-wrapper .sales {
  margin: 0 0 5px 10px;
  font-size: 12px;
  line-height: 19px;
}
.goods-detail .text-wrapper .attribute {
  margin-top: 30px;
}
.goods-detail .text-wrapper .number-wrapper {
  margin-top: 18px;
  position: relative;
  display: flex;
}
.goods-detail .text-wrapper .number-wrapper .label {
  width: 78px;
  padding-left: 20px;
  font-size: 12px;
  color: #5a5a5a;
  margin-right: 2px;
  word-break: break-all;
  padding-top: 2px;
  cursor: pointer;
}
.goods-detail .text-wrapper .number-wrapper .counter-wrap {
  flex: 1;
  min-width: 0;
}
.goods-detail .text-wrapper .number-wrapper .counter {
  display: inline-block;
  border: 1px solid #d3d3d3;
  font-size: 0;
}
.goods-detail .text-wrapper .number-wrapper .counter-wrap span {
  vertical-align: bottom;
  font-size: 14px;
  color: #5a5a5a;
}
.goods-detail .text-wrapper .button-wrapper {
  margin-top: 46px;
  font-size: 0;
}
.goods-detail .text-wrapper .button-wrapper .btn {
  width: 158px;
  height: 50px;
  border: 1px solid #e93323;
  border-radius: 4px;
  font-size: 16px;
  color: #e93323;
}
.goods-detail .text-wrapper .button-wrapper button.cart {
  background-color: #e93323;
  color: #fff;
}
.goods-detail .text-wrapper .button-wrapper button ~ button {
  margin-left: 18px;
}

.goods-detail .detail-wrapper {
  width: 100%;
  margin-top: 170px;
}
.el-button.m-2.el-tooltip__trigger {
  width: 100%;
  background-color: #ededed;
}
.el-button {
  height: 57px;
}
.goods-detail .detail-wrapper .detail-hd {
  display: flex;
  justify-content: space-between;
  background-color: #f7f7f7;
}
.goods-detail .detail-wrapper .detail-hd .qrcode-button {
  width: 160px;
  height: 56px;
  background-color: #ededed;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.goods-detail .detail-wrapper .detail-hd .item.on {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAAHCAYAAADZLGlIAAAA2ElEQVRIS2N8aaz8n2EUDJsQYBxWEfofmjYZGYmLIFLVE2fqgKoi0ucD6kaSLH+iIS3MwsW+g5GR0QSfxv///5/58+2nh8yNp29JsmCQKx52EQoK79fqIrz/uPnWMTAyumAN////9zB9/RQkevPN50EePyQ7b1hGKCgUbquosPPx/VvOwMgYiBIq//+v//SJKVL1zp2fJIfWENAwbCMUFPb/GRiYXhspzf7PyJgE4jP+/z9P9Ny9VEYGhn9DIG7IcuKwjlBopDK+MlLqALHFzt2rYATH8/AFAGuTOoSPwSVZAAAAAElFTkSuQmCC)
    top/100% 7px no-repeat;
  color: #e93323;
  padding-top: 20px;
}
.goods-detail .detail-wrapper .detail-hd .item {
  width: 116px;
  height: 56px;
  padding-right: 30px;
  padding-left: 30px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.qrcode .qrcode {
  width: 160px;
  height: 160px;
}
.qrcode .phoneBuy img {
  display: block;
  width: 100%;
  height: 100%;
}

.goods-detail .text-wrapper .button-wrapper .btn-out {
  width: 120px;
  color: #fff;
  background: #d0d0d0;
}
.goods-detail .text-wrapper .button-wrapper button:disabled {
  border-color: #ebeef5;
  cursor: not-allowed;
}
.goods-detail .text-wrapper .button-wrapper .btn.btn-notify {
  width: 120px;
  border-color: #e93323;
  color: #e93323;
  background-color: #fff;
}
.swiperSlideActive {
  border: 2px solid red;
}
</style>
<style>
.goods-detail .detail-wrapper .detail-bd .detail-html img {
  display: block;
  width: 100% !important;
}
</style>