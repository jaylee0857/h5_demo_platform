<script setup lang="ts">
defineProps({
  borderColor: {
    type: String,
    default: "transparent"
  },
  borderSize: {
    type: String,
    default: "0.05rem"
  },
  backgroundColor: {
    type: String,
    default:
      "linear-gradient(180deg, rgba(53,4,91,1) 0%, rgba(124,3,157,1) 100%)"
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
  },
  contentHeight: {
    type: Number,
    default: 0.7
  }
});
</script>

<template>
  <div
    class="gradient-btn-wrap"
    :style="{
      background: borderColor,
      width: width,
      height: `${height}${heightUnit}`,
      borderRadius: `${height / 2}${heightUnit}`,
      padding: borderSize
    }"
  >
    <div
      class="gradient-btn"
      :style="{
        background: backgroundColor,
        height: `${height * contentHeight}${heightUnit}`,
        borderRadius: `${height / 2}${heightUnit}`
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.gradient-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  &-wrap {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
