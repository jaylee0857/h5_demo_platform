<script setup lang="ts">
import Award from "@/components/home/award.vue";
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";
import { useI18n } from "@/i18n";
import { useRouter } from "vue-router";
import SettingDialog from "@/components/home/setting-dialog.vue";

const router = useRouter();
const appStore = useGlobalStore();
const { t } = useI18n();
const { layoutLeaveAnimation, layoutDefaultMask } = storeToRefs(appStore);

interface State {
  amount: number;
  level: number;
  withoutAmount: number;
  withoutLevel: number;
  gem: number;
  isOpenAward: boolean;
  isLockClickOutside: boolean;
  isShowSettingDialog: boolean;
}

const state: State = reactive({
  amount: 11900000,
  level: 3,
  withoutAmount: 1000,
  withoutLevel: 1000,
  gem: 1000,
  isOpenAward: false,
  isLockClickOutside: false,
  isShowSettingDialog: false
});

const onToggleAward = (): void => {
  /** 當為關閉要打開的時候，就先鎖定click outside */
  if (!state.isOpenAward) {
    state.isLockClickOutside = true;
    /** 5毫秒之後再解鎖 */
    setTimeout(() => {
      state.isLockClickOutside = false;
    }, 500);
  }
  if (state.isOpenAward) onCloseAward();
  else onOpenAward();
};

const onOpenAward = (): void => {
  state.isOpenAward = true;
  appStore.setLayoutDefaultMask(true);
};

const onCloseAward = (): void => {
  if (!state.isOpenAward || state.isLockClickOutside) return;
  state.isOpenAward = false;
  appStore.setLayoutDefaultMask(false);
};

const onOpenSettingDialog = (): void => {
  state.isShowSettingDialog = true;
};

const isAnimation = computed(() => layoutLeaveAnimation.value.startLeave);
</script>

<template>
  <div class="layout-default">
    <div
      class="layout-default-header"
      :class="['animated-header', { 'animated-header--leave': isAnimation }]"
    >
      <q-avatar size="1rem" @click="onOpenSettingDialog">
        <q-img src="@/assets/images/home/profile_img.png" />
      </q-avatar>
      <div class="layout-default-header-data">
        <div class="layout-default-header-data-amount">
          <div class="layout-default-header-data-amount-text">
            {{ new Intl.NumberFormat().format(state.amount) }}
          </div>
        </div>
        <div class="layout-default-header-data-setting">
          <div>
            <q-icon
              id="level-start"
              class="layout-default-header-data-setting-text"
            >
              {{ `Lv ${state.level}` }}
              <q-menu
                class="layout-default-header-data-setting-detail"
                self="top middle"
              >
                <q-list style="min-width: 2.1rem">
                  <q-item>
                    <q-item-section>
                      <q-icon style="width: 0.35rem">
                        <q-img
                          src="@/assets/images/home/icon_xp.svg"
                          alt="icon"
                        />
                      </q-icon>
                      <span>
                        {{ t("pages.home.without.xp") }}
                      </span>
                      <span class="layout-default-header-data-setting-result">
                        {{
                          new Intl.NumberFormat().format(state.withoutAmount)
                        }}
                      </span>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>
                      <q-icon style="width: 0.35rem">
                        <q-img
                          src="@/assets/images/home/icon_directions_coin.svg"
                          alt="icon"
                        />
                      </q-icon>
                      <span>
                        {{ t("pages.home.without.amount") }}
                      </span>
                      <span class="layout-default-header-data-setting-result">
                        {{
                          new Intl.NumberFormat().format(state.withoutAmount)
                        }}k
                      </span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </div>
          <div>
            <span class="layout-default-header-data-setting-text">
              {{ new Intl.NumberFormat().format(state.gem) }}
            </span>
          </div>
        </div>
      </div>
      <div class="layout-default-icon">
        <q-img class="piggy-bank" src="@/assets/images/home/piggy_bank.svg" />
      </div>
      <div class="layout-default-icon">
        <q-img
          src="@/assets/images/home/buy.svg"
          class="buy"
          @click="router.push('/shop')"
        ></q-img>
      </div>
    </div>
    <div class="layout-default-main">
      <slot />
    </div>
    <div
      class="layout-default-footer no-select"
      :class="['animated-footer', { 'animated-footer--leave': isAnimation }]"
    >
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/mail_icon.svg" />
        <span>{{ t("pages.home.messages") }}</span>
      </div>
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/gift_icon.svg" />
        <span>{{ t("pages.home.gift") }}</span>
      </div>
      <div
        class="layout-default-footer-item layout-default-footer-item-middle"
        @click="onToggleAward"
      >
        <q-img class="icon" src="@/assets/images/home/footer_coin.svg" />
        <q-img class="icon-str" src="@/assets/images/home/footer_str.png" />
      </div>
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/bingo_icon.svg" />
        <span>{{ t("pages.home.award") }}</span>
      </div>
      <div class="layout-default-footer-item">
        <q-img class="icon" src="@/assets/images/home/vip_icon.svg" />
        <span>{{ t("pages.home.vip") }}</span>
      </div>
    </div>
    <Award v-click-outsize="onCloseAward" v-if="state.isOpenAward" />
    <SettingDialog v-model="state.isShowSettingDialog" />
    <div class="layout-default-bg"></div>
    <transition>
      <div class="mask" v-if="layoutDefaultMask"></div>
    </transition>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/home.scss";
</style>
