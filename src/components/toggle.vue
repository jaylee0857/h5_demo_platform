<script setup lang="ts">
import { defineModel } from "vue";
const isSwitchOn = defineModel({ type: Boolean, default: false });
const emit = defineEmits(["toggle"]);
const props = defineProps({
  onText: {
    type: String,
    default: "On"
  },
  offText: {
    type: String,
    default: "Off"
  },
  id: {
    type: String,
    default: ""
  }
});

const onToggle = () => {
  isSwitchOn.value = !isSwitchOn.value;
  nextTick(() => {
    emit("toggle", {
      isSwitchOn: isSwitchOn.value,
      id: props.id
    });
  });
  // emit("toggle", {
  //   isSwitchOn: isSwitchOn.value,
  //   id: props.id
  // });
};
</script>

<template>
  <div class="custom-toggle" @click="onToggle">
    <div
      class="custom-toggle-content"
      :class="{ 'custom-toggle-content--on': isSwitchOn }"
    >
      <div>{{ onText }}</div>
      <div>{{ offText }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.custom-toggle {
  $width: 1.38rem;
  $height: 0.55rem;
  $border-size: 0.05rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: $width;
  height: $height;
  background: linear-gradient(
    180deg,
    rgba(62, 1, 137, 1) 0%,
    rgba(68, 20, 158, 1) 50%
  );
  cursor: pointer;
  border-radius: calc($height / 2);
  &-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 0.05rem;
    width: calc(100% - $border-size);
    height: calc(100% - $border-size);
    background-color: #14003b;
    border-radius: calc($height / 2);
    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      left: -5%; /* 如果需要水平置中 */
      transform: translate(0, -50%); /* 同時垂直與水平置中 */
      width: calc($width / 1.65);
      height: calc($height * 1.1);
      transition: all 0.3s;
      background-image: url("@/assets/images/components/toggle-icon.svg");
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    &--on {
      &::before {
        left: 45%;
      }
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.28rem;
      font-weight: bold;
      &:nth-child(1) {
        color: #2cf500;
      }
      &:nth-child(2) {
        color: #b4b4b4;
      }
    }
  }
}
</style>
