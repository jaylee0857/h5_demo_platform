<script setup lang="ts">
import Progress from "@/components/progress.vue";
import GradientBorderBox from "@/components/gradient-border-box.vue";
import { useI18n } from "@/i18n";
import { FAKE_SHOP_LIST } from "@/contants/shop";

defineOptions({
  layout: "layout-shop"
});

const { t } = useI18n();
const router = useRouter();

const animationDelay = 150;
const animationDuration = 800;
const animationLeaveDuration = 200;
const animationTime = animationDelay + animationLeaveDuration;

interface State {
  pageAnimationState: string;
  amount: number;
  tip: string;
  level: number;
  shopList: {
    id: number;
    buyPrice: number;
    point: number;
    discountPoint: number;
    img: string;
    imgSize: {
      width: string;
      height: string;
      marginTop?: string;
      marginRight?: string;
    };
    gemPoint: number;
    vipPoint: number;
  }[];
}

const state: State = reactive({
  pageAnimationState: "pending",
  amount: 450,
  tip: "",
  level: 2,
  shopList: FAKE_SHOP_LIST
});

const leaveDelay = (index, totalItems, baseDelay = 0.1) => {
  return (totalItems - 1 - index) * baseDelay;
};

const init = (): void => {
  state.tip = t("pages.shop.vip.up.Level", { level: state.level });
};

init();

/** 因為v-for搭配animation會造成卡頓 所以等待v-for載入完成才觸發動畫 */
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      // state.pageAnimationState = "enter";
    }, 0);
    state.pageAnimationState = "enter";
  });
});

onBeforeRouteLeave((to, from, next) => {
  state.pageAnimationState = "leave";
  setTimeout(() => {
    next();
  }, animationTime);
});
</script>

<template>
  <div class="shop">
    <div class="shop-header">
      <div class="shop-header-banner">
        <div class="shop-header-banner-left">
          <span>SHOP</span>
          <span
            class="shop-header-banner-left-back"
            @click="router.back()"
          ></span>
        </div>
        <div class="shop-header-banner-right"></div>
      </div>
      <div class="shop-header-info">
        <div class="shop-header-info-left">
          <div>VIP BOUNS</div>
          <div>{{ t("pages.shop.double.points") }}</div>
        </div>
        <div class="shop-header-info-middle">
          <div class="shop-header-info-level">
            {{ state.level }}
          </div>
        </div>
        <div class="shop-header-info-right">
          <Progress :progress="50" :height="0.3" height-unit="rem" />
          <div class="shop-header-info-amount">{{ state.amount }}</div>
          <div class="shop-header-info-tip">{{ state.tip }}</div>
        </div>
      </div>
    </div>
    <div class="shop-main">
      <GradientBorderBox
        height="1.8rem"
        class="shop-main-item-wrap"
        :class="{
          'shop-main-item-wrap-enters': state.pageAnimationState === 'enter',
          'shop-main-item-wrap-leaves': state.pageAnimationState === 'leave'
        }"
        main-class="shop-main-item"
        v-for="(buyPlan, index) in state.shopList"
        :key="buyPlan.id"
        :style="`--animation-delay:${index * animationDelay}ms; --animate-duration: ${animationDuration}ms;--animate-duration-leave: ${animationLeaveDuration}ms;--animation-duration-leave-delay: ${leaveDelay(index, state.shopList.length, 0.05)}s;`"
      >
        <div class="shop-main-item-top">
          <div class="shop-main-item-top-info">
            <q-img :src="buyPlan.img" :style="buyPlan.imgSize"></q-img>
            <div class="shop-main-item-top-info-amount">
              <div class="shop-main-item-top-info-amount-decoration">
                {{ new Intl.NumberFormat().format(buyPlan.point) }}
              </div>
              <div class="shop-main-item-top-info-amount-final">
                {{ new Intl.NumberFormat().format(buyPlan.discountPoint) }}
              </div>
            </div>
          </div>
          <div class="shop-main-item-top-btn">
            <span> ${{ buyPlan.buyPrice }} </span>
          </div>
        </div>
        <div class="shop-main-item-bottom">
          <div class="shop-main-item-bottom-tip">{{ t("pages.shop.tip") }}</div>
          <div class="shop-main-item-bottom-vip">
            <q-img src="@/assets/images/shop/shop_vip.svg"></q-img>
            <span>{{ buyPlan.vipPoint }}</span>
          </div>
          <div class="shop-main-item-bottom-gem">
            <q-img src="@/assets/images/home/gem.svg"></q-img>
            <span>{{ buyPlan.gemPoint }}</span>
          </div>
        </div>
      </GradientBorderBox>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/shop.scss";
</style>
