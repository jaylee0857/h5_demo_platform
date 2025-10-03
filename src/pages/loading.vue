<script setup lang="ts">
import { useI18n } from "@/i18n";
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";

defineOptions({
  layout: "layout-loading"
});

const appStore = useGlobalStore();
const { progress: totalProgress } = storeToRefs(appStore);
const { t } = useI18n();
</script>

<template>
  <div class="loading-bar-wrap">
    <div class="loading-bar">
      <span class="loading-bar-text">
        {{ t("global.loading") }}
      </span>
      <div
        class="loading-bar-progress"
        :style="{ width: `${Math.max(totalProgress, 5)}%` }"
      >
        <!--        <count-up :end-val="progress"></count-up>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/loading.scss";
</style>
