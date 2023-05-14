<template >
  <div class="nav min_wrapper_1200">
    <div class="nav min_wrapper_1200">
      <div class="navCon wrapper_1200 acea-row row-between-wrapper">
        <div class="textPic acea-row row-middle">
          <a href="/">
            <div class="icon">
              <img
                src="https://www.dexiaoquan.cn/uploads/def/20221111/516eb5717bb536a625114559f3f254a6.png"
              />
            </div>
          </a>
        </div>
        <div class="search acea-row">
          <div class="text acea-row row-middle">
            <span class="iconfont icon-xiazai5"></span>
            <input type="text" placeholder="搜索商品" />
          </div>
          <div class="bnt bg-color">搜索</div>
          <div class="search-hot"></div>
        </div>
        <a href="" class="cartNum">
          <span class="iconfont icon-dingbu-gouwuche"></span>
          购物车 ({{ count }})
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  count: {
    type: Number,
    required: true,
  },
});
</script>
<style  scoped>
.nav {
  width: 100%;
  height: 140px;
  background: #fff;
}
.min_wrapper_1200 {
  min-width: 1200px;
  width: auto !important;
  width: 1200px;
}
.nav .navCon {
  height: 140px;
  padding-bottom: 30px;
}
.acea-row.row-between-wrapper {
  -o-box-align: center;
  align-items: center;
  -o-box-pack: justify;
  justify-content: space-between;
}
.wrapper_1200 {
  width: 1200px;
  margin: 0 auto;
}
.acea-row {
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  flex-wrap: wrap;
}
.nav .navCon .textPic .icon {
  cursor: pointer;
  width: 112px;
  height: 40px;
}
.nav .navCon .textPic .icon img {
  width: 100%;
  height: 100%;
}
.nav .navCon .search {
  width: 640px;
  height: 40px;
  border: 1px solid #e93323;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 80px;
  position: relative;
  padding-right: 90px;
}
.nav .navCon .search .text {
  width: 548px;
  padding-left: 24px;
  color: #c1c1c1;
  position: relative;
}
.acea-row.row-middle {
  -o-box-align: center;
  align-items: center;
}
.nav .navCon .search .text input {
  width: 507px;
  height: 38px;
  border: none;
  outline: none;
  padding-left: 10px;
}
.nav .navCon .search .bnt {
  width: 90px;
  height: 100%;
  text-align: center;
  line-height: 38px;
  color: #fff;
  position: absolute;
  right: -1px;
}
.bg-color {
  background-color: #e93323 !important;
  font-size: 15px;
}
.nav .navCon .search .search-hot {
  width: 560px;
  height: 21px;
  overflow: hidden;
  position: absolute;
  bottom: -35px;
  left: 0;
}
.nav .cartNum {
  padding: 0 15px;
  height: 40px;
  border: 1px solid #ddd;
  text-align: center;
  line-height: 40px;
  color: #e93323;
  cursor: pointer;
  font-size: 14px;
}
</style>