<template>
  <div
    ref="swipeElement"
    @mousedown="handleStart"
    @mousemove="handleMove"
    @mouseup="handleEnd"
    @mouseleave="handleEnd"
    @touchstart="handleStart"
    @touchmove="handleMove"
    @touchend="handleEnd"
  >
    <!-- 在這裡放置你的內容 -->
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";

// props
const props = defineProps({
  minSwipeDistance: {
    type: Number,
    default: 50
  },
  usePercentage: {
    type: Boolean,
    default: false
  }
});

// 發出事件
const emit = defineEmits(["swipeLeft", "swipeRight", "swipeMove"]);

// 參考到DOM元素
const swipeElement = ref(null);

// 狀態變數
const startX = ref(0);
const isDragging = ref(false);
const lastX = ref(0);

// 計算實際的最小滑動距離
const actualMinSwipeDistance = computed(() => {
  if (!props.usePercentage) return props.minSwipeDistance;

  const elementWidth = swipeElement.value?.clientWidth || 0;
  return elementWidth * (props.minSwipeDistance / 100);
});

// 處理開始事件
const handleStart = (event) => {
  isDragging.value = true;
  startX.value = event.type.includes("mouse")
    ? event.clientX
    : event.touches[0].clientX;
  lastX.value = startX.value;
};

// 處理移動事件
const handleMove = (event) => {
  if (!isDragging.value) return;

  const currentX = event.type.includes("mouse")
    ? event.clientX
    : event.touches[0].clientX;
  const diffX = currentX - startX.value;
  const moveDistance = currentX - lastX.value;

  // 發送每次移動的資訊
  emit("swipeMove", {
    distance: Math.abs(moveDistance),
    direction: moveDistance > 0 ? "right" : "left"
  });

  // 更新lastX以便下次計算
  lastX.value = currentX;

  if (Math.abs(diffX) >= actualMinSwipeDistance.value) {
    if (diffX > 0) {
      emit("swipeRight");
    } else {
      emit("swipeLeft");
    }
    // 重置開始位置,以便連續滑動
    startX.value = currentX;
  }
};

// 處理結束事件
const handleEnd = () => {
  isDragging.value = false;
};

// 生命週期鉤子
onMounted(() => {
  // 如果需要,可以在這裡添加額外的事件監聽器
});

onUnmounted(() => {
  // 如果在 onMounted 中添加了事件監聽器,記得在這裡移除
});
</script>
