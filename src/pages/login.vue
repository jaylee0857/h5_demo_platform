<script setup lang="ts">
import { useI18n } from "@/i18n";

defineOptions({
  layout: "layout-loading"
});
const { t } = useI18n();
// 這邊之後做個動畫，讓登入的按鈕從下彈出，以避免轉換頁面時太突兀
</script>

<template>
  <div class="login">
    <div class="login-action">
      <router-link to="/home">
        <div class="login-action-google">{{ t("login.google") }}</div>
      </router-link>
      <router-link to="/home">
        <div class="login-action-facebook">{{ t("login.facebook") }}</div>
      </router-link>
    </div>
    <div class="login-later">
      <router-link to="/home">
        <div>{{ t("login.later") }}</div>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/login.scss";
</style>
