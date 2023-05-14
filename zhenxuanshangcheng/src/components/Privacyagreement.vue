<script setup>
import { onUpdated, ref } from "vue";
import { userAgreement, getPrivacy } from "../hooks/useRequest";
import { useRouter } from "vue-router";
const userAgreementStr = ref("");
const Router = useRouter();
onUpdated(() => {
  if (Router.currentRoute.value.query.type === "sys_user_agree") {
    userAgreement().then((res) => {
      userAgreementStr.value = res.data.data;
    });
  } else {
    getPrivacy().then((res) => {
      userAgreementStr.value = res.data.data;
    });
  }
});
</script>
<template>
  <div class="settled-wrapper wrapper_1200">
    <div class="title wrapper_1200">
      <a href="/" class="home nuxt-link-active">首页 &gt;</a>
      {{ userAgreementStr.title }}
    </div>
    <div class="settled-main">
      <div class="user-com-title">{{ userAgreementStr.title }}</div>
      <div class="protocolMain">
        <div class="title">{{ userAgreementStr.title }}</div>
        <div class="content">
          <div
            class="content-main"
            v-html="userAgreementStr.sys_user_agree"
          ></div>
          <div
            class="content-main"
            v-if="Router.currentRoute.value.query.type === 'sys_user_agree'"
            v-html="userAgreementStr.sys_user_agree"
          ></div>
          <div v-else v-html="userAgreementStr.sys_userr_privacy"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped>
.settled-wrapper .title {
  height: 60px;
  line-height: 60px;
}
.settled-wrapper .settled-main {
  padding: 50px 110px;
  background: #fff;
}
.settled-wrapper .user-com-title {
  font-size: 26px;
  color: #333;
  text-align: center;
  border: none;
}
.settled-wrapper .content-main {
  color: #333;
  font-size: 14px;
}
.settled-wrapper .content-main strong {
  font-weight: 700;
}
</style>