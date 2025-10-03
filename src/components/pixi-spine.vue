<template>
  <div ref="pixiContainer" class="pixi-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { usePixi } from "@/composable/usePixi";

const pixiContainer = ref<HTMLDivElement | null>(null);
const { initPixi, loadSpineAnimation, createAnimation, playAnimation } =
  usePixi();

onMounted(async () => {
  if (!pixiContainer.value) return;
  try {
    // 初始化 PIXI
    initPixi(pixiContainer.value);

    // 加載動畫資源
    const spineData = await loadSpineAnimation("02");

    // 創建動畫實例
    const animation = createAnimation("02", spineData);
    console.log(animation, "animation");
    if (animation) {
      // 播放動畫
      playAnimation("02");
    }
  } catch (error) {
    console.error("Failed to initialize animation:", error);
  }
});
</script>

<style lang="scss" scoped>
.pixi-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
