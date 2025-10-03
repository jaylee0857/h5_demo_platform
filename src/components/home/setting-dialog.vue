<script setup lang="ts">
import toggle from "@/components/toggle.vue";
import { defineModel } from "vue";
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";
import { useI18n } from "@/i18n";
const { t, locale } = useI18n();
const isShowSettingDialog = defineModel({ type: Boolean, default: false });
const store = useGlobalStore();
const { systemConfig } = storeToRefs(store);
interface State {
  selectTab: string;
  currentLang: string;
  toggleSetting: { name: string; value: boolean }[];
  betToggleSetting: { name: string; value: boolean }[];
  userId: number;
}

const state: State = reactive({
  selectTab: "setting",
  currentLang: locale.value === "zh-tw" ? "en" : "zh",
  toggleSetting: [
    {
      name: "audio", // 對應的是語言包的 key
      value: systemConfig.value.openAudio
    },
    {
      name: "music",
      value: true
    },
    {
      name: "push",
      value: false
    }
  ],
  betToggleSetting: [
    {
      name: "auto.bet",
      value: true
    },
    {
      name: "auto.bet.max.amount",
      value: true
    }
  ],
  userId: 5743041
});

const onToggleTab = (tab: string) => {
  state.selectTab = tab;
};

const onToggleLang = (lang: string) => {
  state.currentLang = lang;
  locale.value = lang === "zh" ? "zh-tw" : "en";
};

const onHideSettingDialog = () => {
  isShowSettingDialog.value = false;
};

const onToggle = ({ id, isSwitchOn }) => {
  console.log(id, isSwitchOn);
  switch (id) {
    case "audio":
      store.setSystemConfig("openAudio", isSwitchOn);
      break;
    case "music":
      break;
    case "push":
      break;
    case "auto.bet":
      break;
    case "auto.bet.max.amount":
      break;
  }
};
</script>

<template>
  <q-dialog
    class="setting-dialog-wrap"
    v-model="isShowSettingDialog"
    @hide="onHideSettingDialog"
  >
    <div class="setting-dialog">
      <div class="setting-dialog-close-btn">
        <q-img
          src="@/assets/images/home/shop_cancel_btn.svg"
          @click="onHideSettingDialog"
        />
      </div>
      <div class="setting-dialog-tab">
        <div
          class="setting-dialog-tab-item"
          :class="{
            'setting-dialog-tab-item--active-setting':
              state.selectTab === 'setting'
          }"
          @click="onToggleTab('setting')"
        >
          <span>
            {{ t("pages.home.setting.dialog.tab.setting") }}
          </span>
        </div>
        <div
          class="setting-dialog-tab-item"
          :class="{
            'setting-dialog-tab-item--active-account':
              state.selectTab === 'account'
          }"
          @click="onToggleTab('account')"
        >
          <span>
            {{ t("pages.home.setting.dialog.tab.account") }}
          </span>
        </div>
      </div>
      <div class="setting-dialog-main">
        <template v-if="state.selectTab === 'setting'">
          <div class="setting-dialog-main-title-bar">
            <span>
              {{ t("pages.home.setting.dialog.system.setting") }}
            </span>
          </div>
          <!--   開關設定     -->
          <div
            class="setting-dialog-main-item"
            v-for="item in state.toggleSetting"
            :key="item.name"
          >
            <div class="setting-dialog-main-item-left">
              {{ t(`pages.home.setting.dialog.system.setting.${item.name}`) }}
            </div>
            <div class="setting-dialog-main-item-right">
              <toggle
                :id="item.name"
                v-model="item.value"
                :on-text="
                  t('pages.home.setting.dialog.system.setting.switch.on')
                "
                :off-text="
                  t('pages.home.setting.dialog.system.setting.switch.off')
                "
                @toggle="onToggle"
              ></toggle>
            </div>
          </div>
          <!--    語言設定     -->
          <div class="setting-dialog-main-item">
            <div class="setting-dialog-main-item-left">
              {{ t(`pages.home.setting.dialog.system.setting.lang`) }}
            </div>
            <div class="setting-dialog-main-item-right">
              <div
                @click="onToggleLang(state.currentLang === 'zh' ? 'en' : 'zh')"
                class="setting-dialog-main-lang-btn"
                :class="`setting-dialog-main-lang-btn-${state.currentLang}`"
              ></div>
            </div>
          </div>
          <div class="setting-dialog-main-title-bar" style="margin-top: 0.3rem">
            <span>
              {{ t("pages.home.setting.dialog.system.setting") }}
            </span>
          </div>
          <!--   下注設定     -->
          <div
            class="setting-dialog-main-item"
            v-for="item in state.betToggleSetting"
            :key="item.name"
          >
            <div class="setting-dialog-main-item-left">
              {{ t(`pages.home.setting.dialog.system.setting.${item.name}`) }}
            </div>
            <div class="setting-dialog-main-item-right">
              <toggle
                v-model="item.value"
                :on-text="
                  t('pages.home.setting.dialog.system.setting.switch.on')
                "
                :off-text="
                  t('pages.home.setting.dialog.system.setting.switch.off')
                "
              ></toggle>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="setting-dialog-main-title-bar">
            <span>
              {{ t("pages.home.setting.dialog.system.setting") }}
            </span>
          </div>
          <div class="setting-dialog-main-item setting-dialog-main-item--one">
            <div class="setting-dialog-main-item-left">
              {{ t(`pages.home.setting.dialog.system.setting.user.id`) }}
            </div>
            <div class="setting-dialog-main-item-right">
              <div class="setting-dialog-main-item-right-user">
                <span>{{ state.userId }}</span>
                <q-img
                  class="setting-dialog-main-item-right-user-icon"
                  src="@/assets/images/home/setting-dialog-user-icon.svg"
                />
              </div>
            </div>
          </div>
          <div class="setting-dialog-main-title-bar">
            <span>
              {{ t("pages.home.setting.dialog.system.setting") }}
            </span>
          </div>
          <div
            class="setting-dialog-main-item"
            style="grid-template-columns: 1fr; padding: 0.5rem 0"
          >
            <div
              class="setting-dialog-main-item-right"
              style="justify-content: center"
            >
              <div class="setting-dialog-main-item-right-help">
                <div v-for="item in 3" :key="item">
                  <q-img src="@/assets/images/home/help-icon-mark.svg" />
                  <span>{{
                    t("pages.home.setting.dialog.system.setting.help")
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </q-dialog>
</template>

<style scoped lang="scss">
@import "@/assets/scss/setting.dialog.scss";
</style>
