<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";

defineOptions({
  layout: "layout-game-room"
});
const appStore = useGlobalStore();

onBeforeRouteLeave((to, from, next) => {
  const animationTime = 200;
  appStore.setLayoutLeaveAnimation(true);
  setTimeout(() => {
    next();
    appStore.setLayoutLeaveAnimation(false);
  }, animationTime);
});
</script>
<template>
  <div class="game-room">
    <q-img src="@/assets/images/gameRoom/img_gamebg.svg" />
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/game-room.scss";
</style>
