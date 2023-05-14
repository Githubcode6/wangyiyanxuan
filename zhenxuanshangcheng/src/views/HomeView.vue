<script setup>
import { ref, reactive, onMounted } from "vue";
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
const RecList = ref([]);
const RecListLoad = ref([]);
const isShow = ref(true);
const DomScroll = ref([]);
const loadingicon = ref(null);
const newCommodity = ref(false);

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
if (newCommodity.value) {
  //首发新品
  getProductNew({ page: 1, limit: 5, common: 1 }).then((res) => {
    hotNew.arr = res.data.data;
  });
  //推荐单品
  getHot({ page: 1, limit: 4, common: 1 }).then((res) => {
    HotData.arr = res.data.data;
  });
  getMerchant({ page: 1, limit: 2, common: 1 }).then((res) => {
    Merchant.value = res.data.data.list;
  });
  getProductHot({ page: 1, limit: 3, common: 1 }).then((res) => {
    ProductHot.value = res.data.data;
  });
}

getRecList({ page: 1, limit: 3 }).then((res) => {
  RecList.value = res.data.data;
});
const height = reactive({
  obj: {
    curVal: document.documentElement.scrollHeight,
    val: document.documentElement.scrollHeight,
  },
});

function load() {
  const clienHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  height.obj.curVal = scrollHeight;
  if (scrollTop + clienHeight + 100 >= scrollHeight) {
    height.obj.val = scrollHeight;
    // 天天优惠
    getRecList({ page: 2, limit: 3 }).then((res) => {
      RecListLoad.value = res.data.data;
      isShow.value = true;
    });
  }
}

//点击返回顶部
function ScrollTopClick() {
  document.documentElement.scrollTop = 0;
}
//点击跳到分类广场
function classifyClick() {
  document.documentElement.scrollTop = 900;
}
onMounted(() => {
  window.addEventListener("scroll", load);
  if (height.obj.curVal >= height.obj.val) {
    window.addEventListener("scroll", load);
  } else {
    window.removeEventListener("scroll", load);
  }
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
          <router-link
            :to="`/goods_detail?id=${productBest.arr.list[0].product_id}&mer_id=${productBest.arr.list[0].mer_id}`"
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
          </router-link>
          <!--  -->
          <div v-for="(item, index) in productBest.arr.list">
            <router-link
              :to="`/goods_detail?id=${item.product_id}&mer_id=${item.mer_id}`"
            >
              <div class="item" v-if="index !== 0">
                <div class="name line1">{{ item.keyword }}</div>
                <div class="font-color">¥{{ item.price }}</div>
                <div class="pictrue">
                  <img :src="item.image" />
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 首发新品 -->
      <div id="page3" class="newGoodsList" v-if="newCommodity">
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
            <router-link
              :to="`/goods_detail?id=${item.product_id}&mer_id=${item.mer_id}`"
            >
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
            </router-link>
          </div>
        </div>
      </div>
      <!-- 首发新品 -->
      <div
        id="page5"
        class="Recommended acea-row row-middle"
        v-if="newCommodity"
      >
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
            <el-carousel :interval="4000" type="card" indicator-position="none">
              <el-carousel-item
                v-for="item in HotData.arr.list"
                :key="item.product_id"
              >
                <router-link
                  :to="`/goods_detail?id=${item.product_id}&mer_id=${item.mer_id}`"
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
                </router-link>
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
                <img v-if="index == 0" :src="item.recommend[0].image" alt="" />
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
            <router-link
              :to="`/goods_detail?id=${item.product_id}&mer_id=${item.mer_id}`"
              v-for="(item, index) in ProductHot.list"
            >
              <div class="item hot-list acea-row row-between-wrapper">
                <div class="top-num">
                  <img :src="pictureArr.arr[index].image" alt="" />
                </div>
                <div class="picture">
                  <img :src="item.image" alt="" />
                </div>
                <div class="name line2">{{ item.store_name }}</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 分类广场 -->
      <div id="page4" class="classify">
        <div class="classify-title">
          <span>分类广场</span>
        </div>
        <div ref="DomScroll">
          <div
            class="list"
            v-for="item in RecList.list"
            :key="item.group_data_id"
          >
            <div class="list-title">
              {{ item.title }}
              <a
                href=""
                class="more acea-row row-center-wrapper"
                style="float: right"
              >
                更多<span class="iconfont icon-you"></span
              ></a>
            </div>
            <div class="list-count acea-row">
              <a class="classify-banner"
                ><img :src="item.left_image" alt=""
              /></a>
              <div class="classify-items acea-row">
                <template
                  v-for="(item, index) in item.list"
                  :key="item.product_id"
                >
                  <div class="classify-item" v-if="index < 8">
                    <router-link
                      :to="`/goods_detail?id=${item.product_id}&mer_id=${item.mer_id}`"
                    >
                      <div class="picture">
                        <img :src="item.image" alt="" />
                      </div>
                      <div class="item-text">
                        <div class="item-name line2">{{ item.store_name }}</div>
                        <div class="item-price acea-row">
                          <div class="price">
                            <span>¥</span>{{ item.price }}
                          </div>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </template>
              </div>
            </div>
            <a class="list-banner"><img :src="item.bottom_image" alt="" /></a>
          </div>
        </div>
        <!-- 懒加载天天实惠 -->
        <div
          v-if="isShow"
          class="list"
          v-for="item in RecListLoad.list"
          :key="item.group_data_id"
        >
          <div class="list-title">
            {{ item.title }}
            <a
              href=""
              class="more acea-row row-center-wrapper"
              style="float: right"
            >
              更多<span class="iconfont icon-you"></span
            ></a>
          </div>
          <div class="list-count acea-row">
            <a class="classify-banner"><img :src="item.left_image" alt="" /></a>
            <div class="classify-items acea-row">
              <template
                v-for="(item, index) in item.list"
                :key="item.product_id"
              >
                <div class="classify-item" v-if="index < 8">
                  <router-link
                    :to="`/goods_detail?id=${item.product_id}&mer_id=${item.mer_id}`"
                  >
                    <div class="picture">
                      <img :src="item.image" alt="" />
                    </div>
                    <div class="item-text">
                      <div class="item-name line2">
                        <span class="trader" v-if="item.mer_labels.length > 0"
                          >自营</span
                        >
                        {{ item.store_name }}
                      </div>
                      <div class="item-price acea-row">
                        <div class="price"><span>¥</span>{{ item.price }}</div>
                      </div>
                    </div>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
          <a class="list-banner"><img :src="item.bottom_image" alt="" /></a>
        </div>
      </div>
      <div class="loadingicon acea-row row-center-wrapper" ref="loadingicon">
        下拉加载更多
      </div>
      <div class="floatWindow">
        <div class="list">
          <div class="item">
            <div>精品<br />推荐</div>
          </div>
          <div class="item" v-if="newCommodity">
            <div>火爆<br />新品</div>
          </div>
          <div class="item" @click="classifyClick">
            <div>分类<br />广场</div>
          </div>
          <div class="item">
            <div>
              <el-tooltip effect="light" placement="left-start">
                <template #content>
                  <ul class="itemCon">
                    <li class="item">
                      <div class="icon">
                        <span class="iconfont icon-dadianhua01"></span>
                      </div>
                      <div class="pictrue">
                        <div class="tip">客服电话</div>
                        <div class="tel">025-57011135</div>
                      </div>
                    </li>
                    <li class="item">
                      <div class="icon">
                        <span class="iconfont icon-kefu2"></span>
                      </div>
                      <div class="pictrue">
                        <div class="tip">在线客服</div>
                        <div class="chatShowBtn">联系客服</div>
                      </div>
                    </li>
                  </ul>
                </template>
                <div>
                  <div class="iconfont icon-lianxikefu"></div>
                  <div>客服</div>
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="item" @click="ScrollTopClick">
            <div class="iconfont icon-huidaodingbu1"></div>
            <div>回到顶部</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.categoryMain {
  width: 1200px;
  height: 420px;
  background: #fff;
  position: relative;
  margin: 0 auto;
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
  height: 100%;
  overflow: hidden;
}
.slider-banner img {
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

/*  */

.index .classify {
  width: 1200px;
  padding: 54px 0 10px;
}
.index .classify .list-title {
  font-size: 20px;
  color: #282828;
  margin-top: 30px;
}

.index .classify .classify-title {
  width: 100%;
  height: 30px;
  background-image: url(https://www.dexiaoquan.cn/pc/img/classified-title.2fcd2dc.png);
  background-size: 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  text-align: center;
}
.index .classify .classify-title span {
  display: inline-block;
  font-size: 22px;
  color: #333;
  font-weight: 700;
}
.index .classify .list-count {
  margin-top: 15px;
  justify-content: space-between;
  display: flex;
}
.index .classify .classify-banner {
  width: 224px;
  height: 640px;
  margin-bottom: 20px;
  display: inline-block;
}
.index .classify .classify-banner img {
  width: 100%;
  height: 100%;
}
.index .classify .classify-items {
  width: 957px;
  display: flex;
  flex-wrap: wrap;
}
.index .classify .classify-items .classify-item {
  width: 224px;
  height: 310px;
  padding: 16px;
  background: #fff;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}
.index .classify .classify-items .classify-item .picture {
  width: 192px;
  height: 192px;
}
.index .classify .classify-items .classify-item .picture img {
  width: 100%;
  height: 100%;
}
.index .classify .classify-items .classify-item:nth-child(4n) {
  margin-right: 0;
}
.index .classify .classify-items .classify-item:hover {
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
}
.index .classify .classify-items .item-text {
  margin-top: 10px;
}
.index .classify .classify-items .item-text .item-name {
  color: #666;
  font-size: 14px;
  line-height: 22px;
}
.index .classify .classify-items .item-text .item-name .trader {
  color: #fff;
  background-color: #e93323;
  display: inline-block;
  width: 32px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 2px;
  margin-right: 5px;
  font-size: 12px;
}
.index .classify .classify-items .item-text .item-price {
  margin-top: 12px;
  justify-content: space-between;
}
.index .classify .classify-items .item-text .item-price .price {
  color: #e93323;
  font-size: 18px;
  font-weight: 700;
}
.index .classify .classify-items .item-text .item-price .price span {
  font-size: 14px;
}
.index .classify .classify-items .item-text .item-price .coupon {
  position: relative;
  width: 20px;
  height: 20px;
  color: #e93323;
  text-align: center;
  border-radius: 2px;
}
.index .classify .classify-items .item-text .item-price .coupon:before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  background: linear-gradient(330deg, #e75543, #f46753);
  border-radius: 2px;
  opacity: 0.14;
  position: absolute;
  top: 0;
  left: 0;
}
.index .classify .list-banner {
  margin-top: 30px;
  width: 1200px;
  height: 120px;
}
.index .classify .list-banner img {
  width: 100%;
  height: 100%;
}
.loadingicon {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
.index .classify .classify-items .item-text .item-name .trader {
  color: #fff;
  background-color: #e93323;
  display: inline-block;
  width: 32px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 2px;
  margin-right: 5px;
  font-size: 12px;
}

/* 楼梯层效果 */
.floatWindow {
  position: fixed;
  right: 0;
  bottom: 15%;
  width: 70px;
  z-index: 99;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.06);
}
.floatWindow .list .item {
  position: relative;
  width: 100%;
  height: 74px;
  text-align: center;
  font-size: 12px;
  color: #5c5c5c;
  padding: 23px 0;
  line-height: 18px;
}
.floatWindow .list .item:hover {
  color: #e93323;
}
.floatWindow .list .item .iconfont {
  margin-bottom: 5px;
  font-size: 25px;
}
.floatWindow .list .item ~ .item:before {
  position: absolute;
  content: " ";
  width: 48px;
  height: 1px;
  background-color: #f0f0f0;
  top: 0;
  left: 50%;
  margin-left: -24px;
}
.floatWindow .list .item .itemCon {
  right: 100%;
  position: absolute;
  top: 0;
  padding-right: 20px;
}
.floatWindow .list .item .itemCon .ewm {
  width: 195px;
  height: 60px;
  border: 1px solid #eee;
  background-color: #fff;
  padding: 10px 15px;
  justify-content: space-between;
  align-items: center;
  color: #282828;
}
.floatWindow .list .item .itemCon .ewm .tip {
  font-size: 14px;
  width: 120px;
  text-align: left;
  line-height: 20px;
  color: #bdbdbd;
}
.floatWindow .list .item .itemCon .ewm .tip .tel {
  color: #282828;
}
.floatWindow .list .item .itemCon .ewm .tip .chatShowBtn {
  display: inline-block;
  width: 60px;
  height: 20px;
  line-height: 20px;
  background-color: #ff7b00;
  border-radius: 100px;
  color: #fff;
  font-size: 12px;
  text-align: center;
}
.floatWindow .list .item .itemCon .ewm .pictrue {
  vertical-align: middle;
}
.floatWindow .list .item .itemCon .ewm .pictrue .iconfont {
  margin-bottom: 0;
  color: #282828;
}
.floatWindow .list .item .itemCon .ewm .pictrue .arrow {
  position: absolute;
  right: 5px;
  top: 23px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-left-color: #eee;
}
.floatWindow .list .item .itemCon .ewm .pictrue .arrow:before {
  position: absolute;
  left: -8px;
  top: -7px;
  content: "";
  width: 0;
  height: 0;
  border: 7px solid transparent;
  border-left-color: #fff;
}
.index img {
  width: 100%;
  height: 100%;
}

.itemCon .item {
  width: 190px;
  height: 60px;
  display: flex;
  align-items: center;
}
.itemCon .item.item:not(:last-of-type) {
  border-bottom: #ecebeb 1px solid;
}
.itemCon .item .icon {
  width: 50px;
  text-align: center;
}
.itemCon .item .icon .iconfont {
  font-size: 25px;
}
.itemCon .pictrue {
  width: 120px;
  line-height: 20px;
}
.itemCon .pictrue .chatShowBtn {
  width: 60px;
  height: 20px;
  background-color: #ff7b00;
  border-radius: 100px;
  text-align: center;
  color: #fff;
}
.itemCon .pictrue .tel {
  color: #282828;
  font-size: 14px;
}
.itemCon .pictrue .tip {
  color: #bdbdbd;
  font-size: 14px;
  line-height: 20px;
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