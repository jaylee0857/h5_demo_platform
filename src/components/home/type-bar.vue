<script setup lang="ts">
import { GameObject } from "@/models/game";
import { FACK_GAME_LIST } from "@/contants/game";
import getImageUrl from "@/utils/getImageUrl";
import { useI18n } from "@/i18n";
import { useGlobalStore } from "@/store/app-store";
import { useGameStore } from "@/store/game-store";

const { t } = useI18n();
const appStore = useGlobalStore();
const gameStore = useGameStore();

interface State {
  selectType: string;
  originList: GameObject[];
  showList: GameObject[];
  options: { label: string; value: string; icon: string }[];
  isShowSelect: boolean;
}
const state: State = reactive({
  selectType: "all",
  originList: FACK_GAME_LIST,
  showList: computed(() => {
    switch (state.selectType) {
      case "all":
        return state.originList;
      case "record":
        return state.originList.filter((item, index) => index > 1);
      case "favorite":
        return state.originList.filter((item, index) => index > 2);
    }
    return state.originList;
  }),
  options: [
    { label: "all", value: "all", icon: "type_bar_icon.svg" },
    { label: "record", value: "record", icon: "record.svg" },
    { label: "favorite", value: "favorite", icon: "love_icon.svg" }
  ],
  isShowSelect: false
});

const changeSelectType = (type: string) => {
  state.selectType = type;
  gameStore.setGameType(state.selectType);
};

const onCloseOptions = () => {
  state.isShowSelect = false;
  appStore.setLayoutDefaultMask(false);
};

const onShowOptions = () => {
  state.isShowSelect = true;
  appStore.setLayoutDefaultMask(true);
};

const init = () => {
  gameStore.setGameType(state.selectType);
};

init();
</script>

<template>
  <div class="type-bar">
    <div class="type-bar-list scrollable-content">
      <div class="type-bar-item" v-for="item in state.showList" :key="item.src">
        <q-img :src="getImageUrl(`home/${item.src}`)" />
      </div>
    </div>
    <div class="type-bar-select">
      <div class="type-bar-select-selected">
        <q-icon>
          <q-img
            v-if="state.selectType === 'all'"
            src="@/assets/images/home/type_bar_icon.svg"
            alt=""
          />
          <q-img v-else src="@/assets/images/home/record.svg" alt="" />
        </q-icon>
        <span class="no-select">{{ t(`pages.home.${state.selectType}`) }}</span>
      </div>
      <q-btn class="type-bar-select-arrow" @click="onShowOptions">
        <q-img
          class="type-bar-select-arrow-icon"
          src="@/assets/images/home/type_bar_arrow.svg"
          :class="{ 'type-bar-select-arrow-icon--down': state.isShowSelect }"
        />
        <q-menu class="type-bar-select-options" @hide="onCloseOptions">
          <q-list style="min-width: 2.5rem; white-space: nowrap">
            <q-item
              v-for="option in state.options"
              :key="option.value"
              class="no-select"
              :class="{ 'q-item--active': state.selectType === option.value }"
              @click="changeSelectType(option.value)"
              clickable
            >
              <q-item-section>
                <q-icon style="width: 0.35rem">
                  <q-img :src="getImageUrl(`home/${option.icon}`)" alt="icon" />
                </q-icon>
                <span>
                  {{ t(`pages.home.${option.label}`) }}
                </span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/home.scss";
</style>
