<script setup>
import logoTitle from "./components/logo_title.vue";
import FooterVue from "./components/footer.vue";
import { ref, onMounted } from "vue";
import { getCategoryList, getHomeData } from "./hooks/useRequest";
const num = ref(0);
const navData = ref([]);
const categoryData = ref([]);
const isShow = ref(true);
onMounted(() => {
  getHomeData().then((res) => {
    navData.value = res.data.data;
  });
  getCategoryList().then((res) => {
    categoryData.value = res.data.data;
  });
});
</script>

<template>
  <div class="grid-content ep-bg-purple-dark">
    <div class="headerCon header">
      <div class="">
        <router-link to="">
          <span class="iconfont icon-shoucang2"></span>
          收藏本站
        </router-link>
      </div>
      <div class="user">
        <ul class="acea-row">
          <li class="item">
            <router-link to="">登录/注册</router-link>
          </li>
          <li class="item">
            <router-link to="">我的订单</router-link>
          </li>
          <li class="item">
            <router-link to="">我的余额</router-link>
          </li>
          <li class="item">
            <router-link to="">商户入驻</router-link>
          </li>
          <li class="item">
            <router-link to="">咨询信息</router-link>
          </li>
          <li class="item">
            <router-link to="">手机商城</router-link>
          </li>
        </ul>
      </div>
    </div>
    <logoTitle :num="num"></logoTitle>

    <div class="index wrapper_1200">
      <div class="categoryMain">
        <!--  -->
        <div class="wrapper_1200">
          <div class="list wrapper_1200 acea-row">
            <div class="categoryBtn">商品分类</div>
            <router-link
              :to="item.link"
              class="item"
              v-for="item in navData.pc_home_tab"
              :key="item.group_data_id"
              >{{ item.label }}</router-link
            >
          </div>
        </div>
        <!--  -->
        <div class="wrapper">
          <RouterView />
          <div class="category" v-show="isShow">
            <div class="sort">
              <div
                class="item acea-row row-between-wrapper"
                v-for="item in categoryData.list"
                :key="item.store_category_id"
              >
                <div class="name line1">{{ item.cate_name }}</div>
                <div class="iconfont icon-you"></div>
                <div class="sortCon">
                  <div class="erSort">
                    <div
                      class="item acea-row"
                      v-for="item in item.children"
                      :key="item.store_category_id"
                    >
                      <div class="name">
                        <span class="cate_name">{{ item.cate_name }}</span>
                        <div
                          class="cateList"
                          v-for="item in item.children"
                          :key="item.store_category_id"
                        >
                          <span class="cateItem">{{ item.cate_name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <FooterVue></FooterVue> -->
  </div>
</template>
<style scoped>
.header {
  font-size: 12px;
  color: #b4b4b4;
  cursor: pointer;
}
.header a {
  color: #b4b4b4;
  font-size: 12px;
}
.header .iconfont {
  margin-right: 5px;
}
.header a:hover {
  color: #fff;
}
.grid-content {
  width: 100%;
  height: 40px;
  background-color: #282828;
  font-size: 12px;
  color: #b4b4b4;
  cursor: pointer;
}
.headerCon {
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.acea-row {
  display: flex;
  flex-wrap: wrap;
}
.user .acea-row .item {
  margin-right: 8px;
  position: relative;
  padding-left: 8px;
}

.header .user .item ~ .item::before {
  position: absolute;
  content: " ";
  width: 1px;
  height: 14px;
  background-color: hsla(0, 0%, 100%, 0.11);
  left: 0;
  top: 50%;
  margin-top: -7px;
}

.categoryMain {
  background: #fff;
  position: relative;
}
.acea-row {
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  flex-wrap: wrap;
}
.categoryMain .categoryBtn {
  width: 208px;
  height: 44px;
  line-height: 44px;
  color: #fff;
  background-color: #e93323;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
  font-size: 15px;
}
.categoryMain .item {
  padding: 11.5px 10px;
  margin-right: 30px;
  color: #282828;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  min-width: 90px;
  display: inline-block;
  text-align: center;
}

/*  */
.wrapper_1200 {
  width: 1200px;
  margin: 0 auto;
}
.index .wrapper {
  height: 420px;
  position: relative;
  cursor: pointer;
}
.index .wrapper .category {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  height: 100%;
}
.index .wrapper .sort {
  width: 208px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 14px 0;
  position: relative;
}
.index .wrapper .sort .item {
  width: 100%;
  height: 39px;
  padding: 0 18px;
  display: flex;
  flex-wrap: nowrap;
}
/*  */
.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.category .row-between-wrapper {
  -o-box-align: center;
  align-items: center;
  -o-box-pack: justify;
  justify-content: space-between;
  color: #fff;
}
.category .sort .row-between-wrapper:hover {
  background-color: #e93323;
}
.category .sort .row-between-wrapper:hover .sortCon {
  display: block;
}
.sortCon {
  width: 664px;
  height: 420px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 208px;
  box-shadow: 5px 1px 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #f2f2f2;
  display: none;
}
.erSort {
  margin-top: 15px;
  margin-left: 30px;
}
.erSort .cateList {
  display: inline-block;
}
.cateItem {
  font-size: 12px;
  color: #282828;
  padding: 0 20px;
}
.cateItem:hover {
  color: #e93323;
}
.sort .cate_name:hover {
  color: #e93323;
}
.cateList:hover {
  color: #e93323;
}

.erSort .cate_name {
  text-align: center;
  font-weight: 700;
}
.list .item:hover {
  color: #e93323;
}
</style>
