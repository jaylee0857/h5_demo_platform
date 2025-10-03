<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { BANNERS } from "@/contants/home";

const modules = [Navigation, Pagination, Autoplay];

interface State {
  banners: { src: string; title: string; id: number }[];
  activeIndex: number;
  realIndex: number;
}

const swiperInstance = ref<SwiperType | null>(null);

const state: State = reactive({
  banners: BANNERS,
  realIndex: 0,
  activeIndex: 0
});

const onSwiper = (swiper: SwiperType): void => {
  swiperInstance.value = swiper;
};

const onSlideChange = (): void => {
  // console.log(
  //   document
  //     .querySelector(".swiper-slide-active")
  //     ?.getAttribute("data-swiper-slide-index") ?? 0
  // );
  const swiperActiveItem = document.querySelector(".swiper-slide-active");
  const realIndex: number = Number(
    swiperActiveItem?.getAttribute("data-swiper-slide-index") ?? 0
  );
  state.activeIndex = realIndex;
};

const goToSlide = (index: number): void => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index);
    state.activeIndex = index;
  }
};
</script>

<template>
  <div class="banner">
    <swiper
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      class="mySwiper"
      :modules="modules"
      v-bind="
        {
          navigation: false,
          pagination: false,
          loop: true,
          autoplay: { delay: 3000, disableOnInteraction: false }
        } as any
      "
    >
      <swiper-slide v-for="item in state.banners" :key="`swiper-${item.src}`">
        <q-img :src="item.src" />
      </swiper-slide>
    </swiper>
    <div class="banner-pagination">
      <div
        class="banner-pagination-item"
        v-for="(item, index) in state.banners"
        :key="`pagination-${item.src}`"
        :class="{
          'banner-pagination-item--active': index === state.activeIndex
        }"
        @click="goToSlide(index)"
      ></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/banner.scss";
</style>
