<script setup>
import { onUpdated, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  getCaptchaType,
  loginScan,
  loginScanCheck,
  getLogin,
  getRegister,
  getVerify,
} from "../hooks/useRequest";
import $ from "jquery";
window.$ = $;
const accountType = ref("account");
const captchaIMgSrc = ref("");
//登录
const account = ref("");
const password = ref("");
const checked = ref(false);
//注册
const phone = ref("");
const pwd = ref("");
const sms_code = ref("");
const user_type = ref("pc");
const verifyImgSrc = ref("");
const second = ref(59);

const mouseMoveStata = ref(false); // 触发拖动状态
// x Y 坐标
const positionXY = reactive({
  X: 0,
  Y: 0,
});

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["closeClick"]);
function accountTypeClick(value) {
  console.log(account.value);
  if (account.value) {
    console.log(123132);
  }
  accountType.value = value;
}
function closeClick() {
  emit("closeClick", false);
}
if (accountType.value === "erweima") {
  console.log(123);
  loginScanCheck(sessionStorage.getItem("key")).then((res) => {
    console.log(res.data);
  });
}
const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
//登录按钮
function loginClick() {
  if (!account.value) {
    ElMessage({
      message: "请填写手机号码",
      type: "error",
    });
  } else if (!reg.test(account.value)) {
    ElMessage({
      message: "请填写正确的手机号码",
      type: "error",
    });
  } else if (!password.value) {
    ElMessage({
      message: "请输入密码",
      type: "error",
    });
  } else if (!checked.value) {
    ElMessage({
      message: "请勾选用户隐私协议",
      type: "error",
    });
  } else {
    getLogin(account.value, password.value).then((res) => {
      if (res.data.status == 200) {
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
      } else {
        ElMessage({
          message: res.data.message,
          type: "error",
        });
      }
    });
  }
}
//注册按钮
function registerClick() {
  if (!phone.value) {
    ElMessage({
      message: "请填写手机号码",
      type: "error",
    });
  } else if (!reg.test(phone.value)) {
    ElMessage({
      message: "请填写正确的手机号码",
      type: "error",
    });
  } else if (!sms_code.value) {
    ElMessage({
      message: "请输入验证码",
      type: "error",
    });
  } else if (!pwd.value) {
    ElMessage({
      message: "请输入密码",
      type: "error",
    });
  } else if (!checked.value) {
    ElMessage({
      message: "请勾选用户隐私协议",
      type: "error",
    });
  } else {
    getRegister(phone.value, pwd.value, sms_code.value, user_type.value).then(
      (res) => {
        if (res.data.status == 200) {
          ElMessage({
            message: "注册成功",
            type: "success",
          });
          sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
        } else {
          ElMessage({
            message: res.data.message,
            type: "error",
          });
        }
      }
    );
  }
}
// 获取验证码
function getCaptchaTypeClick(type) {
  if (reg.test(phone.value)) {
    accountType.value = type;
    getCaptchaType(
      "blockPuzzle",
      "slider - 5efba592 - 0301 - 4ddd - b330 - fdb287e33312",
      new Date().getTime()
    ).then((res) => {
      verifyImgSrc.value = res.data.data;
      console.log(res.data.data);
    });
  }

  // 发送成功或是失败;
  if (reg.test(phone.value)) {
    // setInterval(() => {
    //   second.value--;
    //   console.log("456");
    // }, 1000);
    getVerify(
      "blockPuzzle",
      '1dc533c5-3982-c7f1-2d4a-3f0754734706---{"x":158.75757575757575,"y":5}',
      phone.value,
      (type = "login")
    ).then((res) => {
      if (res.data.status == 200) {
        ElMessage({
          message: res.data.message,
          type: "success",
        });
      } else {
        ElMessage({
          message: res.data.message,
          type: "error",
        });
      }
      console.log(res.data);
    });
  } else {
    ElMessage({
      message: "请填写正确的手机号码",
      type: "error",
    });
  }
}
const VerifycloseClick = (type) => {
  accountType.value = type;
};

//获取新的图片
const loadingClick = () => {
  getCaptchaType(
    "blockPuzzle",
    "slider - 5efba592 - 0301 - 4ddd - b330 - fdb287e33312",
    new Date().getTime()
  ).then((res) => {
    verifyImgSrc.value = res.data.data;
  });
};

const offsetDown = (e) => {
  downX.value = e.pageX;
  window.onmousemove = ($event) => offserMove($event, e);
  $(".verify-msg")[0].innerText = "";
  return false;
};
const downX = ref(null);
const offserMove = (e) => {
  e.preventDefault();
  let maxOffset = $(".verify-bar-area").width() - $(".verify-left-bar").width();
  let off = e.pageX - downX.value;
  let offsetL = off <= 0 ? 0 : off >= maxOffset ? maxOffset : off;
  console.log(offsetL);
  $(".verify-left-bar").css("left", offsetL + "px");
  return false;
};
window.onmouseup = () => {
  $(".verify-msg")[0].innerText = "向右滑动完成验证";
  $(".verify-left-bar").animate(
    {
      left: 0,
    },
    400
  );

  window.onmousemove = null;
  return false;
};

const wellCheckChange = (e) => (checked.value = e.target.checked);
onUpdated(() => {
  if (accountType.value === "erweima") {
    loginScan().then((res) => {
      captchaIMgSrc.value = res.data.data;
      sessionStorage.setItem("key", res.data.data.key);
      console.log(res.data);
    });
  }
});
</script>
<template>
  <div class="login-count" v-if="isShow">
    <div class="wrapper-count">
      <span class="closeBtn iconfont icon-guanbi2" @click="closeClick"></span>
      <div class="wrapper" v-if="accountType === 'fastLogin'">
        <div class="title">
          <span class="item_title" @click="accountTypeClick('account')"
            >账号登录</span
          >
          <span
            class="font_red item_title"
            @click="accountTypeClick('fastLogin')"
            >快速登录</span
          >
        </div>
        <div
          class="iconfont icon-erweima2"
          @click="accountTypeClick('erweima')"
        ></div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input type="text" placeholder="请输入手机号" />
        </div>
        <div class="item verificat acea-row row-between-wrapper">
          <input
            type="text"
            autocomplete="new-password"
            placeholder="请输入验证码"
          />
          <button class="code font-color" @click="accountTypeClick('verify')">
            获取验证码
          </button>
        </div>
        <!---->
        <div class="checkbox-wrapper item_protocol">
          <label class="well-check">
            <input type="checkbox" name="" value="" />
            <i class="icon"></i>
            <span>我已阅读并同意</span>
          </label>
          <router-link
            :to="`/privacyagreement?type=${'sys_user_agree'}`"
            class="show_protocol"
          >
            《用户协议》
          </router-link>
          与
          <router-link
            :to="`/privacyagreement?type=${'sys_userr_privacy'}`"
            class="show_protocol"
          >
            《隐私政策》
          </router-link>
        </div>
        <div class="signIn bg-color" v-on:click="loginClick">登录</div>
        <div class="fastLogin">
          没有账号？
          <span class="font-color" @click="accountTypeClick('register')"
            >立即注册</span
          >
        </div>
      </div>
      <!-- 账号登录 -->
      <div class="wrapper" v-show="accountType === 'account'">
        <div class="title">
          <span class="item_title font_red" @click="accountTypeClick('account')"
            >账号登录</span
          ><span class="item_title" @click="accountTypeClick('fastLogin')"
            >快速登录</span
          >
        </div>
        <div
          class="iconfont icon-erweima2"
          @click="accountTypeClick('erweima')"
        ></div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input type="text" placeholder="请输入手机号" v-model="account" />
        </div>
        <div class="item pwd">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="checkbox-wrapper item_protocol">
          <label class="well-check">
            <input
              type="checkbox"
              name=""
              value=""
              v-model="checked"
              @click="wellCheckChange($event)"
            />
            <i class="icon"></i>
            <span>我已阅读并同意</span></label
          >
          <router-link
            :to="`/privacyagreement?type=${'sys_user_agree'}`"
            class="show_protocol"
          >
            《用户协议》
          </router-link>
          与
          <router-link
            :to="`/privacyagreement?type=${'sys_userr_privacy'}`"
            class="show_protocol"
          >
            《隐私政策》
          </router-link>
          <div class="forget_password">
            <span class="icon-wangjimima">?</span>忘记密码
          </div>
        </div>
        <div class="signIn bg-color" v-on:click="loginClick">登录</div>
        <div class="fastLogin">
          没有账号？
          <span class="font-color" @click="accountTypeClick('register')"
            >立即注册</span
          >
        </div>
      </div>
      <!-- 忘记密码 -->
      <div class="wrapper" style="display: none">
        <div class="title">忘记密码</div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input type="text" placeholder="请输入手机号" />
        </div>
        <div class="item pwd">
          <input type="password" placeholder="填写您的新密码" />
        </div>
        <div class="item pwd">
          <input type="password" placeholder="再次输入新密码" />
        </div>
        <div class="item verificat acea-row row-between-wrapper">
          <input
            type="text"
            autocomplete="new-password"
            placeholder="请输入验证码"
          />
          <button class="code font-color">获取验证码</button>
        </div>
        <!---->
        <div class="signIn bg-color">确认</div>
        <div class="fastLogin font-color">立即登录</div>
      </div>
      <!-- 注册账号 -->
      <div
        class="wrapper"
        v-show="accountType === 'register' || accountType === 'verify'"
      >
        <div class="title">注册账号</div>
        <div class="item phone acea-row row-middle">
          <div class="number">+86</div>
          <input type="text" placeholder="请输入手机号" v-model="phone" />
        </div>
        <div class="item verificat acea-row row-between-wrapper">
          <input
            type="text"
            autocomplete="new-password"
            placeholder="请输入验证码"
            v-model="sms_code"
          />
          <button
            :class="[second < 59 ? ' code font-color on' : 'code font-color']"
            @click="getCaptchaTypeClick('verify')"
          >
            {{
              second == 59
                ? "获取验证码"
                : second > 1
                ? "剩余" + second + "s"
                : "重新获取"
            }}
          </button>
        </div>
        <div class="item pwd">
          <input
            type="password"
            placeholder="请输入您的登录密码"
            v-model="pwd"
          />
        </div>
        <!---->
        <div class="checkbox-wrapper item_protocol">
          <label class="well-check"
            ><input type="checkbox" name="" value="" v-model="checked" />
            <i class="icon"></i>
            <span>我已阅读并同意</span>
          </label>
          <router-link
            :to="`/privacyagreement?type=${'sys_user_agree'}`"
            class="show_protocol"
          >
            《用户协议》
          </router-link>
          与
          <router-link
            :to="`/privacyagreement?type=${'sys_userr_privacy'}`"
            class="show_protocol"
          >
            《隐私政策》
          </router-link>
        </div>
        <div class="signIn bg-color" @click="registerClick">注册</div>
        <div class="fastLogin">
          已有账号？
          <span class="font-color" @click="accountTypeClick('account')"
            >立即登录</span
          >
        </div>
      </div>
      <!-- 二维码 -->
      <div class="wxLogin wrapper" v-show="accountType === 'erweima'">
        <div class="inner">扫码登录</div>
        <div
          class="iconfont icon-zhanghaodenglu1"
          @click="accountTypeClick('fastLogin')"
        ></div>
        <div class="wxCode">
          <span class="iconfont icon-erweimabianjiao"></span>
          <span class="iconfont icon-erweimabianjiao"></span>
          <span class="iconfont icon-erweimabianjiao"></span>
          <span class="iconfont icon-erweimabianjiao"></span>
          <img :src="captchaIMgSrc.qrcode" alt="" />
        </div>
        <div class="tip">请使用微信扫一扫登录</div>
      </div>
    </div>
    <!-- 滑动验证 -->
    <div class="verify-mask" v-show="accountType === 'verify'">
      <div class="verifybox" style="max-width: 360px">
        <div class="verifybox-top">
          请完成安全验证
          <span class="verifybox-close">
            <i
              class="iconfont icon-close"
              @click="VerifycloseClick('register')"
            ></i>
          </span>
        </div>
        <div class="verifybox-bottom" style="padding: 15px">
          <div>
            <div class="verify-img-out" style="height: 160px">
              <div class="verify-img-panel" style="width: 330px; height: 155px">
                <img
                  style="width: 100%; height: 100%; display: block"
                  :src="`data:image/png;base64,${verifyImgSrc.originalImageBase64}`"
                  alt=""
                />
                <div class="verify-refresh" @click="loadingClick">
                  <i class="iconfont icon-refresh"></i>
                </div>
              </div>
            </div>
            <div class="verify-bar-area">
              <span class="verify-msg">向右滑动完成验证</span>
              <div class="verify-left-bar" @mousedown="offsetDown">
                <span class="verify-msg"></span>
                <div
                  class="verify-move-block"
                  style="width: 40px; height: 40px"
                >
                  <i class="verify-icon iconfont icon-right"></i>
                  <div
                    class="verify-sub-block"
                    style="
                      width: 50px;
                      height: 155px;
                      top: -200px;
                      background-size: 330px 155px;
                    "
                  >
                    <img
                      :src="`data:image/png;base64,${verifyImgSrc.jigsawImageBase64}`"
                      alt=""
                      style="width: 100%; height: 100%; display: block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-count {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.wrapper-count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
}
.wrapper-count .closeBtn {
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  text-align: center;
  font-size: 40px;
  cursor: pointer;
}
.wrapper {
  position: relative;
  width: 450px;
  min-height: 426px;
  background-color: #fff;
  text-align: center;
  padding: 50px 0;
  margin: 0 auto;
}
.wrapper .font_red {
  color: #e93323;
}
.wrapper .title {
  font-size: 20px;
  font-weight: 400;
  position: relative;
}
.wrapper .title .item_title {
  cursor: pointer;
}
.wrapper .title .item_title:first-child {
  margin-right: 70px;
}
.wrapper .title .iconfont {
  position: absolute;
  top: -71px;
  right: 0;
  font-size: 60px;
  cursor: pointer;
}
.wrapper .item {
  width: 358px;
  height: 50px;
  border: 1px solid #dbdbdb;
  margin: 0 auto;
}
.wrapper .item.phone {
  margin-top: 34px;
  display: flex;
}
.wrapper .item.phone .number {
  width: 65px;
  height: 100%;
  line-height: 50px;
  color: #666;
  border-right: 1px solid #dbdbdb;
}
.wrapper .item.phone input {
  width: 291px;
}
.wrapper .item.pwd {
  margin-top: 20px;
}
.wrapper .item.pwd input {
  width: 100%;
}
.wrapper .item.verificat {
  margin-top: 20px;
}
.wrapper .item.verificat input {
  width: 246px;
}
.wrapper .item.verificat .code {
  width: 110px;
  height: 100%;
  border: 0;
  background-color: #fff;
  border-left: 1px solid #dbdbdb;
}
.wrapper .item.verificat .code img {
  width: 100%;
  height: 100%;
}
.wrapper .item.verificat .code.on {
  color: #ccc !important;
}
.wrapper .item input {
  padding-left: 15px;
  height: 100%;
  border: 0;
  outline: none;
}
.wrapper .signIn {
  width: 358px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: 24px auto 0;
  color: #fff;
  cursor: pointer;
}
.wrapper .fastLogin {
  margin-top: 14px;
  cursor: pointer;
  color: #ccc;
  font-size: 14px;
}
.wrapper .title + .iconfont {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 46px;
  color: #282828;
}
.wrapper.wxLogin {
  position: relative;
  padding-top: 98px;
}
.wrapper.wxLogin .inner {
  position: absolute;
  top: 34px;
  left: 30px;
  font-size: 20px;
  color: #282828;
}
.wrapper.wxLogin .icon-zhanghaodenglu1 {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 46px;
  color: #282828;
}
.wrapper .wxCode {
  position: relative;
  width: 213px;
  height: 213px;
  padding: 10px;
  margin: 0 auto;
}
.wrapper .wxCode img {
  display: block;
  width: 100%;
}
.wrapper .wxCode .iconfont {
  font-size: 22px;
  color: #cbcbcb;
}
.wrapper .wxCode .iconfont:first-child {
  position: absolute;
  top: 0;
  left: 0;
}
.wrapper .wxCode .iconfont:nth-child(2) {
  position: absolute;
  top: 0;
  right: 0;
  transform: rotate(90deg);
}
.wrapper .wxCode .iconfont:nth-child(3) {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: rotate(180deg);
}
.wrapper .wxCode .iconfont:nth-child(4) {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: rotate(270deg);
}
.wrapper .tip {
  margin-top: 20px;
  font-size: 16px;
  color: #666;
}
.wrapper .item_protocol {
  margin: 17px auto 0;
  width: 358px;
  text-align: left;
  padding-left: 22px;
  font-size: 12px;
  display: flex;
  align-items: baseline;
}
.wrapper .item_protocol .icon {
  width: 14px;
  height: 14px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 10px;
}
.wrapper .item_protocol .show_protocol {
  color: #e93323;
  cursor: pointer;
}
.wrapper .item_protocol .forget_password {
  float: right;
  color: #999;
  cursor: pointer;
}
.wrapper .item_protocol .forget_password .icon-wangjimima {
  display: inline-block;
  width: 12px;
  height: 12px;
  line-height: 12px;
  margin-right: 5px;
  position: relative;
  top: 1px;
  text-align: center;
  border: 1px solid #999;
  border-radius: 100%;
}
.checkbox-wrapper input {
  display: none;
}
.checkbox-wrapper input:checked + .icon {
  background-color: #e93323;
  border-color: #e93323;
  background-image: url(https://www.dexiaoquan.cn/pc/img/enter.03559d0.png);
  background-size: 10px 8px;
  background-repeat: no-repeat;
  background-position: 50%;
}
.bg-color {
  background-color: #e93323 !important;
}
.font-color {
  color: #e93323 !important;
}
.verify-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.5s;
}
.verifybox {
  position: relative;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #e4e7eb;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.verifybox-top {
  padding: 0 15px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  font-size: 16px;
  color: #45494c;
  border-bottom: 1px solid #e4e7eb;
  box-sizing: border-box;
}
.verifybox-close {
  position: absolute;
  top: 13px;
  right: 20px;
  width: 24px;
  height: 24px;
  text-align: center;
  cursor: pointer;
}
.icon-close::before {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIEAYAAAD9yHLdAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAADwRJREFUeNrt3V1sU+cZwPHndTAjwZ0mbZPKR/hKm0GqtiJJGZ9CIvMCawJoUksvOpC2XjSi4kMECaa2SO0qFEEhgFCQSqWOVWqJEGJJuyYYWCG9QCIOhQvYlgGCIFmatrVSUhzixO8ujNM1gSZOfPye857/7wYlfPg5xj5/n/fExyIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABATizsWti1sCs/v6y0rLSsdMaMZ/Y8s+eZPZMnm54LQO6kn/fp/UB6v2B6LrdRpgcwZf7e+Xvn7505MxAIBAKBrVt1ja7RNdXVaqlaqpbOmTP0z+u9eq/ee/euFEqhFH7ySeCjwEeBj+rr299of6P9jb//3fT2AMhcWVlZWVnZ3Ln6uD6uj2/eLF3SJV1VVapW1ara6dOH/nn9hf5Cf3HzpupW3aq7qSl5LHkseay+/nLt5drLtbdvm96eXPNZQJQqn1Q+qXzS73+vN+gNesObb0q7tEv7xImZ/kv6kr6kL/X3q0PqkDpUXx/aFNoU2rRz53l1Xp1X/f2mtxTAcMv1cr1cT5jQfb37evf1ujrpkR7p2bxZ1agaVZOXl/E/WCM1UnP/vv5cf64/f+utjg87Puz4cPfu1G9qbXp7neaTgChVeqD0QOmBP/5RHVPH1LHf/CbrN1EplVLZ2iqt0iqtv/51NBqNRqP37pnecgDpI42CgtTz9OTJ1PO0sjLbt6PX6/V6/Z/+1LG5Y3PH5g0bHnzX2pBkXlyPKTtadrTs6Ouvq/fV++r9LVscu6EbckNuPPGEhCUs4UWLpsanxqfGT5yIxWKxWCyRMH0/AH40GI6whCXc3Cyn5bScDoeduj11RV1RV559dkrFlIopFX19sauxq7GrbW2m7wenBEwP4JT0OY7UV6+/nrMbjkhEIitWSIVUSEVLS0ljSWNJYyhk+v4A/GQwHHtkj+xpahp8XuaImqwmq8m7di2oXlC9oHr2bNP3h1OsDUhgfWB9YP2WLdIgDdLwgx/kfICzclbOLluW35Hfkd/x5z8PPqABOGbYEcd22S7bKypyPsiDc6v9df11/XWvvWb6fnGKtQHRj+nH9GOrV5ueY/CVz4MHNCEBsm9YOHJ8xPEo6og6oo64YD/k1PaZHiDbvruD/uYb0/MMUyEVUtHWFi+Pl8fLf/Wray9ee/Haiz09pscCvGjYUpWpI44RBE8FTwVPFRRcLLxYeLEwHjc9T7ZYdwSi2lSbavvxj03P8UgsbQHj5pqlqlFK9iZ7k70u3i+NkXUB6Tvcd7jv8H//a3qOEXGyHciY6ZPjYzXw0sBLAy95YL+UIeuWsNJK75feL71/545arBarxYWFpucZUVjCEj53LvWEqK7mfSTAt9x6jmNEi2WxLL59O3ooeih6aNYs0+Nkm3VHIIO6pEu6Pv3U9Bijxsl2YBjPhiOtUAql0EP7oQxZG5C8SXmT8ibt35++5IjpeUaNpS3As0tVabpBN+iGgQE5Lsfl+KFDpudxirUBuTT90vRL0//xj/S1qkzPkzFOtsOHvHZy/FFUsSpWxfv2pZai//Y30/M4xfpLmRR/VvxZ8Wd//Wvf7b7bfbd//vPBS454xU25KTdnz+YSKbCZ55eq0h5cE2/OB3M+mPPBb3977dq1a9eu2XstLGtPog+Vvp5/X1tfW19bU5N6V72r3v3FL0zPlTHeRwKLeOV9HCPaLbtl94UL8a/jX8e/fv55vzwvfROQNEICmEc47OC7gKQREiD3CIddfBuQNEICOI9w2Mn3AUkjJED2EQ67EZAhCAkwfoTDHwjIIxASIHOEw18IyAgICTAywuFPBGSUCAkwHOHwNwKSIUICEA6kEJAxIiTwI8KB/0dAxomQwA8IBx6GgGQJIYGNCAe+DwHJMkICGxAOjAYBcQghgRcRDmSCgDiMkMALCAfGgoDkCCGBGxEOjAcByTFCAjcgHMgGAmIIIYEJhAPZREAMIyTIBcIBJxAQlyAkcALhgJMIiMsQEmQD4UAuEBCXIiQYC8KBXCIgLkdIMBqEAyYQEI8gJHgYwgGTCIjHEBKIEA64AwHxKELiT4QDbkJAPI6Q+APhgBsREEsQEjsRDrgZAbEMIbED4YAXEBBLERJvIhzwEgJiOULiDYQDXkRAfIKQuBPhgJcREJ8hJO5AOGADAuJThMQMwgGbEBCfIyS5QThgIwICESEkTiEcsBkBwXcQkuwgHPADAoKHIiRjQzjgJwQE34uQjA7hgB8REIwKIXk4wgE/IyDICCFJIRwAAcEY+TUkhAP4FgHBuPglJIQDGI6AICtsDUl+XX5dfl0ySTiA4QgIsmrwlXpYwhJubpaIRCSyYoXpuTIWlrCEz50b/Nrr2xGRiESqq6PRaDQavXfP9FiwAwGBI6w5IvEqjjiQAwQEjiIkOUY4kEMEBDlBSBxGOGAAAUFOEZIsIxwwiIDACEIyToQDLkBAYBQhyRDhgIsQELgCIRkB4YALERC4CiEZgnDAxQgIXMn3ISEc8AACAlfzXUgIBzyEgMATrA8J4YAHERB4inUhIRzwsIDpAYBMJNYm1ibWKqUeV4+rx5X3XwCdkTNyxoLtgC/xwIUnWPN5HI/i8Ge2A04gIHA168MxFCGBhxAQuJLvwjEUIYEHEBC4iu/DMRQhgYsRELgC4RgBIYELERAYRTgyREjgIgQERhCOcSIkcAECgpwiHFlGSGAQAUFOEA6HERIYQEDgKMKRY4QEOURA4AjCYRghQQ7kmR4AdhkMR1jCEm5uliNyRI54MBxhCUv43DkpkiIpunVLbspNuTl7tumxRu2W3JJbM2cGC4IFwYKFC6fGp8anxk+ciMVisVgskTA9HuzAxRSRFcOOOCISkciKFabnylj66ril8dJ46Zo1wY3BjcGNVVV6m96mt505Y3q8jKX/HyqkQipaWkoaSxpLGkMh02PBDixhYVysWaoa4bLq1lxGnqUtZBEBwZj4JRxDERLgWwQEGfFrOIYiJAABwSgRjocjJPAzAoLvRThGh5DAjwgIHopwjA0hgZ8QEHwH4cgOQgI/ICAQEcLhFEICmxEQnyMcuUFIYCMC4lOEwwxCApsQEJ8hHO5ASGADAuIThMOdCAm8jIBYjnB4AyGBFxEQSxEObyIk8BICYhnCYQdCAi8gIJYgHHYiJHAzAuJxhMMfCAnciIB4FOHwJ0ICNyEgHkM4IEJI4A4ExCMIBx6GkMAkAuJyhAOjQUhgAgFxKcKBsSAkyCUC4jKEA9lASJALBMQlCAecQEjgJAJiGOFALhASOIGAGEI4YAIhQTYRkBwjHHADQoJsICA5QjjgRoQE4xEwPYDtbAtH4kriSuIKT1BbXCy8WHixMB6fuGzisonLVq/W2/Q2ve3MGdNzZeysnJWzy5blt+e357f/5S8ljSWNJY2hkOmxbMcRiENsDcfV7Ve3X93+zTemx4IzOCJBJghIlhEO2ICQYDQISJYQDtiIkOD7EJBxIhzwA0KChyEgY0Q44EeEBP+PgGSIcACEBCkEZJQIBzAcIfE3AjICwgGMjJD4EwF5BMIBZI6Q+AsBGYJwAONHSPyBgDxAOIDsIyR2831ACAfgPEJiJ98GhHAAuUdI7OK7gBAOwDxCYgffBIRwAO5DSLzN+oAs18v1cj1hQk95T3lP+aefpr77y1+anitje2SP7Dl7NhW+1auj0Wg0Gr13z/RYQDYMvsALS1jCzc0SkYhEVqwwPVfGKqVSKltbQ++E3gm9U1V1Xp1X51V/v+mxnGL9B0p1X+++3n29ri71FeEA3GjwcR2RiESqq1MhOXfO9FwZa5VWaa2s7DnYc7Dn4O7dpsdxmrUBKX+7/O3yt3/2M5krc2Xupk2m58lYeqkqmogmomvWEA74QfpxHtwY3BjcWFXl1U9I1Iv0Ir1o69b53fO753fPm2d6HqdYG5BkXjIvmbd1q3pOPaeemzDB9Dyjlj7i2Ck7ZeeqVZzjgB+lP2o3dU5kzRqvHZGoGlWjavLyAg2BhkDDa6+Znscp1gZEzVQz1cyqKtNzjBpLVcAwnl/aOi7H5biH9kMZsi4gCzoXdC7o/OEPZZ/sk33TppmeZ0QsVQEj8vbS1owZJY0ljSWNoZDpSbLNuoAMrBtYN7DuRz8yPceIWKoCMubVpa3Q/ND80HwP7JcyZF1ARIkS9e9/mx7jkTjiAMbNa0ckgUmBSYFJ//mP6Tmyzdr3gZTGS+Ol8Rs31FK1VC2dM8f0POkjjuCTwSeDT1ZXp19JmR4LsIFr30eyQ3bIjs7O6AvRF6IvFBebHifb7DsCeUA1qAbV0Nxseg7CATjPrSfb9VP6Kf2UC/ZDDrE2IMlkMplM7t8vNVIjNffv53yAIUtVhANwnluWtvRhfVgf7u1VL6uX1csHDpi+X5xibUAu116uvVx7+3bqqz/8IWc3nD7imBecF5y3ciUnx4HcM36yPSlJSb71VrQj2hHtuHPH9P3hlDzTAzgt1hRrijW1tU3ZMWXHlB1z5qgr6oq68uyzWb+h/bJf9re0BIuCRcGitWs54gDMi8VisVgskZganxqfGj9xInWtqvJyuSE35MYTT2T79vRJfVKfPHas4+mOpzuerq01vf1Osz4gabGWWEus5dSpaV9N+2raV4mE7JJdsmvJEmmXdmnP/J3q+pK+pC/190undErn3r1FkaJIUeR3vzv9yulXTr/S12d6ewF8Kx2S4gvFF4ovfPxxX29fb19vQYE+qo/qowsWqPfUe+q9QMYrMumlKlklq2TVm29+Nxxam95up1n7U1gjKSstKy0rnTFDr9Qr9cotW1SLalEtq1enfgy4qOjhf+vOHVkn62TdJ58M3B24O3C3vv7Lg18e/PJgZ6fp7QGQufQ18/QpfUqf2rw59d3nn0/9OmPGsL+wRJbIkn/+U7+qX9WvNjUFZgVmBWbV17cXtBe0F3R1md6eXPNtQB4l/fkEiTWJNYk1P/1p+n0lvF8D8I/BHwvWokX/5CehaCgaiv7rX6nLs/f2mp4PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtvsf2vlfs7i0WI4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTItMTVUMTU6NTc6MjcrMDg6MDCiEb4vAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTEyLTE1VDE1OjU3OjI3KzA4OjAw00wGkwAAAE10RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fY2sxYnphMHpqOWpqZGN4ci9jbG9zZS5zdmdHkn2WAAAAAElFTkSuQmCC");
}
.icon-check::before,
.icon-close::before {
  content: " ";
  display: block;
  width: 16px;
  height: 16px;
  position: absolute;
  margin: auto;
  left: 0px;
  right: 0;
  top: 21px;
  bottom: 0;
  z-index: 9999;
  background-size: contain;
}
.verify-bar-area .verify-left-bar {
  width: 40px;
  height: 40px;
  position: absolute;
  top: -1px;
  left: -1px;
  background: #f0fff0;
  cursor: pointer;
  box-sizing: content-box;
  border: 1px solid #ddd;
  border-top-color: rgb(221, 221, 221);
  border-right-color: rgb(221, 221, 221);
  border-bottom-color: rgb(221, 221, 221);
  border-left-color: rgb(221, 221, 221);
}
.verify-bar-area {
  width: 330px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: relative;
  background: #fff;
  text-align: center;
  box-sizing: content-box;
  border: 1px solid #ddd;
  -webkit-border-radius: 4px;
}

.verify-msg {
  user-select: none;
}
.verify-bar-area .verify-move-block {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
  background: #fff;
  background-color: rgb(255, 255, 255);
  cursor: pointer;
  box-sizing: content-box;
  box-shadow: 0 0 2px #888;
  -webkit-border-radius: 1px;
}
.verify-bar-area .verify-move-block > i {
  width: 16px;
  height: 16px;
  display: inline-block;
}

.icon-refresh::before,
.icon-right::before {
  content: " ";
  display: block;
  width: 16px;
  height: 16px;
  z-index: 9999;
  background-size: contain;
}
.icon-right::before {
  user-select: none;
  background-size: cover;
  background-image: url("../assets/arrowR.png");
}
.icon-refresh::before {
  background-image: url("../assets/加载.png");
}
.verify-img-panel img {
  user-select: none;
}
.verify-img-panel .verify-refresh {
  width: 25px;
  height: 25px;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 5px;
  z-index: 2;
}
.wrapper .item.verificat .code .on {
  color: #ccc !important;
}
.wrapper .item.verificat .code {
  width: 110px;
  height: 100%;
  border: 0;
  border-left-color: currentcolor;
  border-left-style: none;
  border-left-width: 0px;
  background-color: #fff;
  border-left: 1px solid #dbdbdb;
}
.verify-bar-area .verify-move-block:hover {
  background-color: #337ab7;
  color: #fff;
}
</style>