<script setup>
import { ref, reactive } from "vue";
import {
  getHomeData,
  getProductBest,
  getProductNew,
  getHot,
  getMerchant,
  getProductHot,
  getRecList,
} from "../hooks/useRequest";
const navData = ref([]);
const productBest = reactive({ arr: [] });
const hotNew = reactive({ arr: [] });
const HotData = reactive({ arr: [] });
const Merchant = ref([]);
const ProductHot = ref([]);
const pictureArr = reactive({
  arr: [
    { image: "https://www.dexiaoquan.cn/pc/img/top-list0.545f64d.png" },
    { image: "https://www.dexiaoquan.cn/pc/img/top-list1.61b4e3b.png" },
    { image: "https://www.dexiaoquan.cn/pc/img/top-list2.88e1ac5.png" },
  ],
});
getHomeData().then((res) => {
  navData.value = res.data.data;
});
getProductBest({ page: 1, limit: 3, common: 1 }).then((res) => {
  productBest.arr = res.data.data;
});
//首发新品
getProductNew({ page: 1, limit: 5, common: 1 }).then((res) => {
  // console.log(res.data.data);
  hotNew.arr = res.data.data;
});
//推荐单品
getHot({ page: 1, limit: 4, common: 1 }).then((res) => {
  // console.log(res.data.data);
  HotData.arr = res.data.data;
});
getMerchant({ page: 1, limit: 2, common: 1 }).then((res) => {
  Merchant.value = res.data.data.list;
});
getProductHot({ page: 1, limit: 3, common: 1 }).then((res) => {
  ProductHot.value = res.data.data;
});
getRecList({ page: 1, limit: 3 }).then((res) => {
  console.log(res.data.data);
});
//天天优惠
getRecList({ page: 2, limit: 3 }).then((res) => {
  console.log(res.data.data);
});
</script>
<template>
  <div class="categoryMain">
    <div class="slider-banner banner">
      <el-carousel height="100%" trigger="click">
        <el-carousel-item
          v-for="item in navData.pc_home_banner"
          :key="item.group_data_id"
        >
          <img :src="item.image" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="index">
      <div class="wrapper_1200">
        <div id="page2" class="boutique">
          <div class="publicTitle acea-row row-between-wrapper">
            <div class="title acea-row row-middle">
              <div class="pictrue">
                <img
                  src="https://www.dexiaoquan.cn/pc/img/boutiqueTitle.6a942f4.png"
                />
              </div>
              <div class="font">诚意推荐 品质商品</div>
            </div>
            <a
              href="/goods_list?type=best"
              class="more acea-row row-center-wrapper"
            >
              更多<span class="iconfont icon-you"></span
            ></a>
          </div>
          <div
            class="list acea-row row-middle"
            v-if="productBest.arr.list && productBest.arr.list"
          >
            <div
              v-if="productBest.arr.list[0]"
              class="oneItem acea-row row-between"
            >
              <div class="text">
                <div class="name line2">
                  {{ productBest.arr.list[0].store_name }}
                </div>
                <div class="info line1">
                  {{ productBest.arr.list[0].keyword }}
                </div>
                <div class="money">
                  <span class="font-color"
                    >¥{{ productBest.arr.list[0].price }}</span
                  >
                </div>
              </div>
              <div class="pictrue">
                <img :src="productBest.arr.list[0].image" />
              </div>
            </div>
            <!--  -->
            <div v-for="(item, index) in productBest.arr.list">
              <div class="item" v-if="index !== 0">
                <div class="name line1">{{ item.keyword }}</div>
                <div class="font-color">¥{{ item.price }}</div>
                <div class="pictrue">
                  <img :src="item.image" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="page3" class="newGoodsList">
          <div class="publicTitle acea-row row-between-wrapper">
            <div class="title acea-row row-middle">
              <div class="pictrue">
                <img
                  src="https://www.dexiaoquan.cn/pc/img/newsTitle.474f49b.png"
                />
              </div>
              <div class="font">永远好奇 永远年轻</div>
            </div>
            <a
              href="/goods_list?type=new"
              class="more acea-row row-center-wrapper"
            >
              更多<span class="iconfont icon-you"></span
            ></a>
          </div>
          <div class="list acea-row row-middle">
            <div class="item" v-for="item in hotNew.arr.list">
              <!-- <router-link :to="'/goods_detail?id'=item.product_id"> -->
              <div class="pictrue">
                <img :src="item.image" />
              </div>
              <div class="name line1">{{ item.store_name }}</div>
              <div class="money line1">
                <span class="label">优惠价</span>
                <span class="font-color">¥{{ item.price }}</span>
              </div>
              <div class="stock">
                已抢 {{ item.reply_count }}{{ item.unit_name }}
              </div>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
        <div id="page5" class="Recommended acea-row row-middle">
          <div class="list">
            <div class="publicTitle acea-row row-between-wrapper">
              <div class="title acea-row row-middle">
                <div class="title-text">
                  推荐<span class="color-red">单品</span>
                </div>
                <div class="title-intr">精选爆款 天天低价</div>
              </div>
              <a href="" class="moreBtn"
                ><span class="iconfont icon-you"></span
              ></a>
            </div>
            <div class="recommended-items">
              <el-carousel
                :interval="4000"
                type="card"
                indicator-position="none"
              >
                <el-carousel-item
                  v-for="item in HotData.arr.list"
                  :key="item.product_id"
                >
                  <div class="recommendImgbox">
                    <img :src="item.image" alt="" />
                  </div>
                  <div class="recommend-text">
                    <div class="name line1">{{ item.keyword }}</div>
                    <div class="price">
                      ¥<span>{{ item.price }}</span>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="list">
            <div class="publicTitle acea-row row-between-wrapper">
              <div class="title acea-row row-middle">
                <div class="title-text">
                  品牌<span class="color-red">好店</span>
                </div>
                <div class="title-intr">优质好店等你来选</div>
              </div>
              <a href="" class="moreBtn"
                ><span class="iconfont icon-you"></span
              ></a>
            </div>
            <div class="list_count">
              <a
                href=""
                class="item acea-row row-between-wrapper"
                v-for="(item, index) in Merchant"
              >
                <div class="list-product">
                  <div class="name line2">{{ item.mer_name }}</div>
                  <div class="attention-count">{{ item.is_trader }}人关注</div>
                </div>
                <!-- item.mer_id -->
                <div class="picture">
                  <img
                    v-if="index == 0"
                    :src="item.recommend[0].image"
                    alt=""
                  />
                  <img v-else :src="item.mer_avatar" alt="" />
                </div>
              </a>
            </div>
          </div>
          <div class="list">
            <div class="publicTitle acea-row row-between-wrapper">
              <div class="title acea-row row-middle">
                <div class="title-text">
                  热门<span class="color-red">榜单</span>
                </div>
                <div class="title-intr">大家都帮你选好了</div>
              </div>
              <a href="/goods_list?type=hot" class="moreBtn"
                ><span class="iconfont icon-you"></span
              ></a>
            </div>
            <div class="list_count">
              <div
                class="item hot-list acea-row row-between-wrapper"
                v-for="(item, index) in ProductHot.list"
              >
                <div class="top-num">
                  <img :src="pictureArr.arr[index].image" alt="" />
                </div>
                <div class="picture">
                  <img :src="item.image" alt="" />
                </div>
                <div class="name line2">{{ item.store_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.categoryMain {
  height: 420px;
  background: #fff;
  position: relative;
}
.slider-banner {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.wrapper .slider-banner img {
  width: 100%;
  height: 100%;
}

.wrapper_1200 {
  width: 1200px;
  margin: 0 auto;
}
.index .wrapper {
  height: 420px;
  position: relative;
  cursor: pointer;
}
.index .banner {
  height: 100%;
}
.slider-banner {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.wrapper .slider-banner img {
  width: 100%;
  height: 100%;
}
.index .wrapper .category {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  height: 100%;
}

/*  */

.index .publicTitle {
  margin-top: 30px;
  display: flex;
  height: 32px;
  justify-content: space-between;
  align-items: center;
}
.index .publicTitle .title {
  color: #8b8b8b;
  display: flex;
  align-items: center;
}
.index .publicTitle .title .pictrue {
  width: 110px;
  height: 30px;
  margin-right: 13px;
}
.index .publicTitle .title .pictrue img {
  width: 100%;
  height: 100%;
}
.index .publicTitle .font {
  font-size: 14px;
}
.index .list-title .more,
.index .publicTitle .more {
  width: 58px;
  height: 24px;
  border: 1px solid #c6c6c6;
  color: #818181;
  font-size: 12px;
  cursor: pointer;
}
.acea-row.row-center-wrapper {
  display: flex;
  -o-box-align: center;
  align-items: center;
  -o-box-pack: center;
  justify-content: center;
}
.index .list-title .more .iconfont,
.index .publicTitle .more .iconfont {
  font-size: 10px;
}

/*  */
.index .boutique .list,
.index .newGoodsList .list {
  margin-top: 14px;
  display: flex;
}
.index .boutique .list .oneItem {
  padding: 28px;
  width: 586px;
  height: 250px;
  background: url(https://www.dexiaoquan.cn/pc/img/boutique1.4290b87.jpg)
    no-repeat;
  background-size: auto;
  background-size: 100% 100%;
  cursor: pointer;
  display: flex;
}

.index .boutique .list .oneItem .text {
  width: 310px;
}
.index .boutique .list .oneItem .text .name {
  font-size: 18px;
  color: #282828;
}
.line2 {
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: pre-wrap;
}

.index .boutique .text .info {
  font-size: 16px;
  color: #a3a3a3;
  margin-top: 10px;
}
.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index .boutique .list .oneItem .text .money {
  margin-top: 26px;
}

.index .font-color {
  font-size: 20px;
  font-weight: 700;
}
.font-color {
  color: #e93323 !important;
}
.index .boutique .list .oneItem .pictrue {
  width: 194px;
  height: 194px;
}
.index .boutique .pictrue img {
  width: 100%;
  height: 100%;
}
.index .newGoodsList .list .item:hover {
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
}

.index #page2 .list .item {
  width: 287px;
  height: 250px;
  background: url(https://www.dexiaoquan.cn/pc/img/boutique2.43ba064.jpg)
    no-repeat;
  background-size: auto;
  background-size: 100% 100%;
  padding: 28px;
  position: relative;
  margin-left: 20px;
  cursor: pointer;
}
.index #page3 .list .item:not(:last-of-type) {
  margin-right: 20px;
}
.index .boutique .list .item .name {
  font-size: 18px;
  color: #282828;
}
.index .boutique .list .item .pictrue {
  width: 130px;
  height: 130px;
  position: absolute;
  right: 28px;
  bottom: 28px;
}
.index .item .font-color {
  margin-top: 17px;
}
.index .boutique .oneItem:hover {
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
}
.index .boutique .item:hover {
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
}

.index .newGoodsList .list {
  margin-top: 14px;
}
.index .newGoodsList .list .item {
  width: 224px;
  height: 320px;
  background-color: #fff;
  padding: 16px 16px 22px;
  cursor: pointer;
}
.index .newGoodsList .list .item .pictrue {
  width: 192px;
  height: 192px;
}
.index .newGoodsList .list .item .pictrue img {
  width: 100%;
  height: 100%;
}
.index .newGoodsList .list .item .name {
  margin-top: 12px;
}
.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.index .newGoodsList .list .item .money {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
.index .newGoodsList .list .item .money .label {
  background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQACwDAREAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAABAACBQn/xAAkEAACAAQGAgMAAAAAAAAAAAABAgADESEEMVFhgZEykhJCov/EABwBAAICAgMAAAAAAAAAAAAAAAAFAwQBAgYICv/EACoRAAIABAMHBQEBAAAAAAAAAAECAAMEESExUQUSQWFxgZEiMkJyoRPB/9oADAMBAAIRAxEAPwDkfHQePShFBBFnlBlnGQCxAUEk4AAEknQAYmEphZz5r8Bq9j6+XYA3iF6iWmF946LYjzfd8E9IZU+yK2fYmX/FD8p3pNuSAF79VUHWFpgpa3clz6r0L/q+kVnqXOCgKNc28nDwLjWHcjYdLLsZzPPbQncl3+qnePdyCMxCgiKKKqgaAACICzE3LMTqST/v5whskmVLUIkqWijJVRQPwZ6nM8Y06SJsyhVDQ/Y2WmoJz4rDJ5stM2F9BicOBAy72jhEjZ9ZUWMuSwU/N/QltQWsWH1DQtMCBeY5Oy2HZuRwIrNVE+xbc2xPYA2BHMsOUOpGwZa2NTNLnikr0r0LsCxHQIecMSVLl+CBd6X5JqTyYrM7v7mJ5Xw8DAeIcyKWnphaTKROG8Bdz1c3Y9zGcaxYiggiggj/2Q==)
    no-repeat;
  background-size: auto;
  background-size: 100% 100%;
  width: 45px;
  height: 20px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  line-height: 20px;
  display: inline-block;
  margin-top: 15px;
}
.index .newGoodsList .list .item .money .font-color {
  font-size: 18px;
  font-weight: 700;
  margin-left: 10px;
}
.index .newGoodsList .list .item .stock {
  color: #969696;
  font-size: 12px;
  margin-top: 14px;
}

/*  */
.index .Recommended {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.index .Recommended .list {
  width: 390px;
  height: 400px;
  padding: 26px 0;
  background-color: #fff;
}
.index .Recommended .publicTitle {
  margin-top: 0;
  padding: 0 27px;
  width: 100%;
}
.index .publicTitle .title {
  color: #8b8b8b;
}
.index .Recommended .title-text {
  font-weight: 700;
  color: #333;
  font-size: 24px;
  margin-right: 10px;
}
.index .Recommended .title-intr {
  position: relative;
  top: 3px;
  font-size: 14px;
}
.index .Recommended .publicTitle .moreBtn {
  float: right;
  width: 19px;
  height: 19px;
  text-align: center;
  border: 1.5px solid #e93323;
  border-radius: 100%;
  line-height: 19px;
}

.index .Recommended .recommended-items {
  margin-top: 32px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}
/* 卡片 */
.recommendImgbox {
  width: 100%;
  height: 210px;
  padding: 10px;
  background-color: #fff;
}
.recommendImgbox img {
  width: 100%;
  height: 100%;
}
.recommend-text {
  text-align: center;
  color: #282828;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 10px;
}
.recommend-text .price {
  color: #e93323;
  font-size: 14px;
  font-weight: 700;
}
.recommend-text .price span {
  font-size: 20px;
}

.index .Recommended .publicTitle {
  margin-top: 0;
  padding: 0 27px;
  width: 100%;
}
.index .list .list_count {
  padding: 0 27px;
  margin-top: 30px;
  cursor: pointer;
}
.index .list .list_count .item {
  width: 100%;
  height: 136px;
  box-sizing: border-box;
  padding: 0 15px 0 20px;
  background: url(https://www.dexiaoquan.cn/pc/img/storeBg.1db8b62.png)
    no-repeat;
  align-items: center;
  justify-content: space-between;
  display: inline-flex;
}
.index .list .list_count .item:first-child {
  margin-bottom: 14px;
}
.index .list .list-product {
  width: 183px;
}
.index .picture {
  width: 106px;
  height: 106px;
}
.index .list .picture img {
  width: 100%;
  height: 100%;
  border-radius: 3px;
}

.index .Recommended .title-text .color-red {
  color: #e93323;
  font-weight: 700;
  font-size: 24px;
}
.index .Recommended .list .list-product .attention-count {
  color: #8b8b8b;
  font-size: 13px;
  margin-top: 20px;
}

.index .Recommended .list .list-product .name {
  color: #282828;
  font-size: 14px;
  line-height: 20px;
}

/*  */
.index .Recommended .list .list_count {
  padding: 0 27px;
  margin-top: 30px;
  cursor: pointer;
}

.index .Recommended .list .list_count .hot-list {
  height: 84px;
  margin-bottom: 17px;
  background-image: none;
}

.index .Recommended .list .list_count .item:first-child {
  margin-bottom: 14px;
}
.index .Recommended .list .list_count .hot-list .top-num {
  width: 36px;
  height: 44px;
}
.index .Recommended .list .list_count .hot-list .top-num img {
  width: 100%;
  height: 100%;
}
.index .Recommended .list .list_count .hot-list .picture {
  width: 84px;
  height: 84px;
}
.index .Recommended .list .list_count .hot-list .picture img {
  width: 100%;
  height: 100%;
}
.index .Recommended .list .list_count .hot-list .name {
  width: 136px;
  font-size: 14px;
  color: #282828;
}
</style>

<style>
.el-carousel--horizontal {
  height: 100%;
}
.el-carousel__arrow--left {
  left: 245px;
}
.el-carousel__arrow {
  font-size: 40px;
}
.el-carousel__indicators--horizontal {
  bottom: 10px;
  left: 78%;
  transform: translateX(0);
}
</style>