<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
import pixiSpine from "@/components/pixi-spine.vue";

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
  <div class="game-room-animation">
    <div class="game-room-animation-main">
      <pixi-spine class="game-room-animation-main-content" />
    </div>
    <div class="game-room-animation-action"></div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/game-room.scss";
</style>
