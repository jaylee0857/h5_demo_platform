import { defineStore } from "pinia";
import { ref } from "vue";
import { FACK_GAMELIST, FACK_GAMELIST2 } from "@/contants/game";

export const useGameStore = defineStore("useGameStore", () => {
  const gameType = ref("all");
  const gameList = ref([]);
  const setGameType = (type: string) => {
    gameType.value = type;
    gameList.value = gameType.value === "all" ? FACK_GAMELIST : FACK_GAMELIST2;
  };
  return {
    gameType,
    gameList,
    setGameType
  };
});
