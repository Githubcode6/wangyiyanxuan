<script setup>
import { getVersion, getConfig } from "@/hooks/useRequest";
import { onMounted, reactive } from "vue";
let footerConfig = reactive({ arr: [] });
const footerVersion = reactive({ arr: [] });
onMounted(() => {
  getVersion().then((res) => {
    footerVersion.arr = res.data.data;
  });
  getConfig().then((res) => {
    footerConfig.arr = res.data.data;
  });
});
</script>

<template>
  <div>
    <div class="footer">
      <div class="wrapper_1200">
        <ul class="acea-row row-around row-middle">
          <li class="acea-row row-middle">
            <div class="picture">
              <span class="iconfont icon-pinzhong"></span>
            </div>
            <div>品种齐全，购物轻松</div>
          </li>
          <li class="acea-row row-middle">
            <div class="picture">
              <span class="iconfont icon-zhifa"></span>
            </div>
            <div>多仓直发，极速配送</div>
          </li>
          <li class="acea-row row-middle">
            <div class="picture">
              <span class="iconfont icon-hanghuo"></span>
            </div>
            <div>正品行货，精致服务</div>
          </li>
          <li class="acea-row row-middle">
            <div class="picture">
              <span class="iconfont icon-dijia"></span>
            </div>
            <div>天天低价，畅选无忧</div>
          </li>
        </ul>
        <div class="recordNum">
          <div>
            <a
              class="copyright"
              :href="item.url"
              target="_blank"
              v-for="item in footerConfig.arr.copyright"
              :key="item.group_data_id"
            >
              <img :src="item.img" alt="" />
              {{ item.name }}
            </a>
          </div>
          <div class="crmeb-copyright">
            <div>
              {{ footerVersion.arr.beian_sn }}
              {{ footerVersion.arr.year }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.footer {
  margin-top: 50px;
  background-color: #f2f2f2;
}
.wrapper_1200 {
  width: 1200px;
  margin: 0 auto;
}
.acea-row div {
  font-size: 14px;
  color: black;
}
.footer .row-middle {
  height: 104px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #e2e2e2;
}
.footer ul li .picture {
  width: 40px;
  height: 40px;
  border: 1px solid #707070;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  margin-right: 14px;
}
.footer ul li .picture .iconfont {
  font-size: 23px;
  color: #707070;
}
.footer .recordNum {
  text-align: center;
  padding: 30px 0 48px;
}
.footer .recordNum img {
  width: 14px;
  height: 14px;
  display: inline-block;
  margin-right: 1px;
  position: relative;
  top: 2px;
}
.footer .recordNum .address {
  margin-left: 40px;
}
.footer .recordNum .record {
  margin-top: 6px;
}
.footer .recordNum .record .num {
  margin-left: 10px;
}
.footer .recordNum .record .num:hover {
  color: #e93323;
}
.footer span.copyright {
  cursor: default;
}
.footer .copyright {
  color: #999;
  font-size: 14px;
}
.footer .copyright:after {
  content: "|";
  display: inline-block;
  color: #ccc;
  font-size: 16px;
  margin: 0 10px;
}
.footer .copyright:last-child:after {
  display: none;
}
.footer .crmeb-copyright {
  padding: 10px 0;
  color: #999;
}
.footer .crmeb-copyright a {
  color: #999;
}
.footer .crmeb-copyright a + a {
  margin-left: 10px;
}
</style>