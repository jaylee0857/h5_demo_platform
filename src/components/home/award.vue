<script setup lang="ts">
import SwiperDetection from "@/components/swiperDetection.vue";
import { defineExpose } from "vue";
import { useI18n } from "@/i18n";
import { getRemInPixels } from "@/utils/getRemInpixels";
import getImageUrl from "@/utils/getImageUrl";

const { t } = useI18n();
interface Icon {
  src: string;
  value: string;
}

interface State {
  centerX: number;
  centerY: number;
  orbitRadius: number;
  icons: Icon[];
  totalIcons: Ref<number>;
}
// 定義圖標介面

// 圖標數據
const icons: Icon[] = [
  { src: getImageUrl("home/award_1.svg"), value: "1" },
  { src: getImageUrl("home/award_2.svg"), value: "2" },
  { src: getImageUrl("home/award_3.svg"), value: "3" },
  { src: getImageUrl("home/award_1.svg"), value: "1" },
  { src: getImageUrl("home/award_2.svg"), value: "2" },
  { src: getImageUrl("home/award_3.svg"), value: "3" },
  { src: getImageUrl("home/award_1.svg"), value: "1" },
  { src: getImageUrl("home/award_2.svg"), value: "2" },
  { src: getImageUrl("home/award_3.svg"), value: "3" },
  { src: getImageUrl("home/award_1.svg"), value: "1" },
  { src: getImageUrl("home/award_2.svg"), value: "2" },
  { src: getImageUrl("home/award_3.svg"), value: "3" }
];

const currentRotation = ref(0);
const rem = ref(getRemInPixels());

const state: State = {
  centerX: 2.4 * rem.value, // 中心點X
  centerY: 5.5 * rem.value, // 中心點Y
  orbitRadius: 4.9 * rem.value, // 軌道半徑
  icons: icons, // 圖標數據
  totalIcons: computed(() => state.icons.length) // 圖標總數
};

// 計算圖標總數
// const totalIcons: number = icons.length;
//
// // 定義中心點坐標（可以根據需要調整）
// const centerX = 100;
// const centerY = 100;
//
// // 定義軌道半徑
// const orbitRadius = 120;

// 當前旋轉角度，使用 ref 使其成為響應式變量

// 計算每個環繞圖標的樣式
const getIconStyle = (index: number): any => {
  // 計算當前圖標的角度
  const angle =
    (index * (360 / state.totalIcons.value) + currentRotation.value) % 360;
  // 將角度轉換為弧度
  const radian = angle * (Math.PI / 180);
  // 計算 x 和 y 坐標
  const x = state.centerX + Math.sin(radian) * state.orbitRadius;
  const y = state.centerY - Math.cos(radian) * state.orbitRadius;
  const isVisible = angle >= 330 || angle < 40;
  // 返回樣式對象
  return {
    position: "absolute",
    left: "0px",
    top: "0px",
    transform: `translate(${x}px, ${y}px)`,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? "visible" : "hidden",
    transition: "all 0.3s ease" // 添加過渡效果
  };
};

const onSwiper = (res) => {
  console.log(res);
};

const onSwiperLeftEvent = () => {
  console.log("left");
  rotateRight();
};

const onSwiperRightEvent = () => {
  console.log("right");
  rotateLeft();
};

// 向左旋轉的函數
const rotateLeft = () => {
  currentRotation.value =
    (currentRotation.value + 360 / state.totalIcons.value) % 360;
};

// 向右旋轉的函數
const rotateRight = () => {
  currentRotation.value =
    (currentRotation.value - 360 / state.totalIcons.value + 360) % 360;
};

defineExpose({
  rotateLeft,
  rotateRight
});

onMounted(() => {
  window.addEventListener("resize", () => {});
});
</script>

<template>
  <swiper-detection
    @swipe-left="onSwiperLeftEvent"
    @swipe-right="onSwiperRightEvent"
    @swipe-move="onSwiper"
    :use-percentage="true"
    min-swipe-distance="20"
  >
    <div class="award">
      <div class="award-header">
        <span class="award-header-left-arrow" @click="rotateRight"></span>
        {{ t("pages.home.award.take") }}
        <span class="award-header-right-arrow" @click="rotateLeft"></span>
      </div>
      <div class="award-main">
        <div class="container">
          <!--        &lt;!&ndash; 中心圖標 &ndash;&gt;-->
          <!--        <div class="center" :style="centerStyle">-->
          <!--          <i class="fa fa-plus"></i>-->
          <!--        </div>-->
          <!-- 環繞的圖標 -->
          <div
            v-for="(icon, index) in icons"
            :key="index"
            class="orbiting-icon"
            :style="getIconStyle(index)"
          >
            <q-img :src="icon.src"></q-img>
          </div>
        </div>
      </div>
    </div>
  </swiper-detection>
</template>

<style scoped lang="scss">
@import "@/assets/scss/award.scss";
</style>
