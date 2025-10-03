import { defineStore } from "pinia";
import { ref } from "vue";

interface LayoutLeaveAnimation {
  startLeave: boolean;
  mode: string | null;
}

export const useGlobalStore = defineStore("useGlobalStore", () => {
  const lang = ref<string>("zh-CN"); // 語系
  const layoutLeaveAnimation = ref<LayoutLeaveAnimation>({
    startLeave: false,
    mode: null
  });
  // 進度條
  const progress = ref<number>(0);
  // 遮罩
  const layoutDefaultMask = ref<boolean>(false);
  // pwa設定
  const pwaState = ref({
    show: false,
    deferredPrompt: null
  });
  // 系統設定
  const systemConfig: Ref<{ openAudio: boolean }> = ref({
    openAudio: true
  });

  function setLayoutLeaveAnimation(isLeave: boolean) {
    layoutLeaveAnimation.value.startLeave = isLeave;
  }

  function setProgress(value: number) {
    progress.value = value;
  }

  function setLayoutDefaultMask(value: boolean) {
    layoutDefaultMask.value = value;
  }

  function setPwaState(value: boolean, deferredPrompt: any) {
    pwaState.value.show = value;
    pwaState.value.deferredPrompt = deferredPrompt;
  }

  function setSystemConfig(key: string, value: any) {
    console.log(key, value);
    systemConfig.value[key] = value;
  }

  return {
    lang,
    pwaState,
    progress,
    systemConfig,
    layoutDefaultMask,
    layoutLeaveAnimation,
    setSystemConfig,
    setProgress,
    setLayoutDefaultMask,
    setPwaState,
    setLayoutLeaveAnimation
  };
});
