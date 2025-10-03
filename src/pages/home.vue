<script setup lang="ts">
import { useGlobalStore } from "@/store/app-store";
// import { storeToRefs } from "pinia";
// import { useQuasar } from "quasar";
import TypeBar from "@/components/home/type-bar.vue";
import Game from "@/components/home/game.vue";
import Banner from "@/components/home/banner.vue";
// import PwaDialog from "@/components/layout/pwa-dialog.vue";
// import storage from "store2";

defineOptions({
  layout: "layout-default"
});

const appStore = useGlobalStore();

// pwa暫時使用不到 註解
// const $q = useQuasar();
// const { pwaState } = storeToRefs(appStore);

// const installPWA = () => {
//   if (pwaState.value.deferredPrompt) {
//     pwaState.value.deferredPrompt.prompt();
//     pwaState.value.deferredPrompt.userChoice.then((choiceResult) => {
//       if (choiceResult.outcome === "accepted") {
//         console.log("User accepted the install prompt");
//       } else {
//         console.log("User dismissed the install prompt");
//       }
//       appStore.setPwaState(false, null);
//     });
//   }
// };
//
// const onShowPwaDialog = () => {
//   $q.dialog({
//     component: PwaDialog
//   })
//     .onOk(() => {
//       installPWA();
//       console.log("OK");
//     })
//     .onCancel(() => {
//       console.log("Cancel");
//     })
//     .onDismiss(() => {
//       console.log("Called on OK or Cancel");
//     });
//   storage.set("installPwa", true);
// };
//
// onMounted(() => {
//   if (pwaState.value.show) {
//     onShowPwaDialog();
//   }
// });

onBeforeRouteLeave((to, from, next) => {
  const animationTime = 200;
  appStore.setLayoutLeaveAnimation(true);
  setTimeout(() => {
    next();
    appStore.setLayoutLeaveAnimation(false);
  }, animationTime);
});
</script>

<template>
  <div class="home">
    <TypeBar />
    <Game />
    <Banner />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
