<script setup lang="ts">
defineProps({
  progress: {
    type: Number,
    required: true
  },
  borderColor: {
    type: String,
    default: "transparent"
  },
  backgroundColor: {
    type: String,
    default:
      "linear-gradient(180deg, rgba(53,4,91,1) 0%, rgba(124,3,157,1) 100%)"
  },
  progressColor: {
    type: String,
    default:
      "linear-gradient(180deg, rgba(255,174,129,1) 0%, rgba(215,77,0,1) 100%)"
  },
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: Number,
    default: 0.75
  },
  heightUnit: {
    type: String,
    default: "rem"
  }
});
</script>

<template>
  <div
    class="component-progress-wrap"
    :style="{
      borderColor: borderColor,
      background: backgroundColor,
      width: width,
      height: `${height}${heightUnit}`,
      borderRadius: `${height / 2}${heightUnit}`
    }"
  >
    <div
      class="component-progress"
      style="max-width: 97%"
      :style="{
        width: `${progress}%`,
        height: `${height * 0.75}${heightUnit}`,
        borderRadius: `${height / 2}${heightUnit}`,
        background: progressColor
      }"
    ></div>
  </div>
</template>

<style scoped lang="scss">
.component-progress {
  position: absolute;
  left: 2%;
  transition: width 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0;
  &-wrap {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.07rem;
  }
}
</style>
