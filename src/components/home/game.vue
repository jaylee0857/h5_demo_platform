<script setup lang="ts">
import { useGameStore } from "@/store/game-store";
import { storeToRefs } from "pinia";
import { GameItem } from "@/models/game";
import getImageUrl from "@/utils/getImageUrl";

const router = useRouter();

interface State {
  gameList: GameItem[][];
}

const state: State = reactive({
  gameList: computed(() => {
    return setGameGroup(gameStore.gameList);
  })
});

const gameStore = useGameStore();
const { gameType } = storeToRefs(gameStore);
const setGameGroup = (ary: GameItem[]): GameItem[][] => {
  return ary.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / 2);

    if (!result[chunkIndex]) {
      result[chunkIndex] = []; // 創建新的子陣列
    }

    result[chunkIndex].push(item);

    return result;
  }, []);
};

const onForwardGame = (id) => {
  // if (gameType.value === "all") return;
  console.log(typeof id);
  if (id === "8") {
    router.push("/game-room-animation");
    return;
  }
  router.push("/game-room");
};
</script>

<template>
  <div class="game scrollable-content">
    <div class="game-recommend" v-if="gameType === 'all'">
      <q-img
        src="@/assets/images/game/img_game_00.svg"
        @click="onForwardGame"
      />
    </div>
    <div class="game-list">
      <div
        class="game-list-item-wrap"
        v-for="(games, index) in state.gameList"
        :key="`game-${index}`"
      >
        <div
          class="normal-game"
          v-for="game in games"
          :key="game.id"
          @click="onForwardGame(game.id)"
        >
          <q-img :src="getImageUrl(`game/${game.src}`)"></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/game.scss";
</style>
