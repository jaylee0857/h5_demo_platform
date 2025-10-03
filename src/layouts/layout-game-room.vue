<script setup lang="ts">
import gradientBtn from "@/components/gradient-btn.vue";
import { useI18n } from "@/i18n";
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";
import coinAudio from "@/assets/audio/coin_001.mp3";

interface State {
  amount: number;
  level: number;
  betAmount: number;
  totalBetAmount: number;
}

const { t } = useI18n();
const router = useRouter();
const appStore = useGlobalStore();
const { layoutLeaveAnimation } = storeToRefs(appStore);

const state: State = reactive({
  amount: 23500,
  level: 3,
  betAmount: 5000,
  totalBetAmount: 13000
});

const onAddBet = () => {
  const count = state.totalBetAmount + 100;
  state.totalBetAmount = Math.min(state.amount, count);
};

const onNegativeBet = () => {
  if (state.totalBetAmount <= 100) return;
  state.totalBetAmount -= 100;
};

const onMexBet = () => {
  state.totalBetAmount = state.amount;
};

const onBack = () => {
  router.back();
};

const isAnimation = computed(() => layoutLeaveAnimation.value.startLeave);
</script>

<template>
  <div class="layout-game-room">
    <div
      class="layout-game-room-header"
      :class="['animated-header', { 'animated-header--leave': isAnimation }]"
    >
      <div class="layout-game-room-header-menu-btn" @click="onBack">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="layout-game-room-header-amount">
        <div class="layout-game-room-header-amount-text">
          {{ new Intl.NumberFormat().format(state.amount) }}
        </div>
      </div>
      <div class="layout-game-room-header-setting">
        <div>
          <q-icon id="level-start" class="layout-game-room-header-setting-text">
            {{ `Lv ${state.level}` }}
          </q-icon>
        </div>
      </div>
      <div class="layout-game-room-header-right-btn">
        <span>2x</span>
        <span>SALE</span>
      </div>
    </div>
    <div class="layout-game-room-main">
      <slot />
    </div>
    <div
      class="layout-game-room-footer"
      :class="['animated-footer', { 'animated-footer--leave': isAnimation }]"
    >
      <div class="layout-game-room-footer-top">
        <span class="layout-game-room-footer-top-amount">
          {{ new Intl.NumberFormat().format(state.betAmount) }}
        </span>
        <span class="layout-game-room-footer-top-tip">
          {{ t("pages.game.total.win") }}
        </span>
      </div>
      <div class="layout-game-room-footer-bottom">
        <div class="layout-game-room-footer-bottom-bet-action">
          <div class="layout-game-room-footer-bottom-bet-action-integral">
            <gradient-btn
              width="2rem"
              :height="0.55"
              height-unit="rem"
              background-color="linear-gradient(180deg, rgba(60,8,174,1) 0%, rgba(46,0,185,1) 100%)"
              border-color="linear-gradient(180deg, rgba(47,1,196,1) 0%, rgba(100,164,249,1) 100%)"
              :content-height="0.85"
            >
              <span
                class="layout-game-room-footer-bottom-bet-action-integral-main"
              >
                {{ new Intl.NumberFormat().format(state.totalBetAmount) }}
              </span>
            </gradient-btn>
            <span>{{ t("pages.game.total.bet") }}</span>
          </div>
          <div class="layout-game-room-footer-bottom-bet-action-btns">
            <q-img
              src="@/assets/images/gameRoom/btn_negative.svg"
              @click="onNegativeBet"
              v-audio-play="coinAudio"
            />
            <q-img
              src="@/assets/images/gameRoom/btn_add.svg"
              @click="onAddBet"
              v-audio-play="coinAudio"
            />
          </div>
        </div>
        <div class="layout-game-room-footer-bottom-btn-start">
          <q-img src="@/assets/images/gameRoom/btn_start.svg" />
        </div>
        <div class="layout-game-room-footer-bottom-btn-max">
          <q-img
            src="@/assets/images/gameRoom/btn_max.svg"
            @click="onMexBet"
            v-audio-play="coinAudio"
          />
        </div>
        <div class="layout-game-room-footer-bottom-gift">
          <q-img src="@/assets/images/gameRoom/gift.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/game-room.scss";
</style>
