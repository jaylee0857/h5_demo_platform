import { Howl } from "howler";
import clickAudio from "@/assets/audio/click_001.mp3";
import { useGlobalStore } from "@/store/app-store";
import { storeToRefs } from "pinia";

export default {
  // 当指令绑定到元素上时调用
  mounted(el, binding) {
    // 預設的聲音路徑（可以替換為你想要的預設聲音）
    const defaultSoundPath = clickAudio;

    // 获取传入的声音路径，如果没有则使用默认值
    const soundPath = binding.value || defaultSoundPath;
    // 创建一个 Howl 实例，用于播放声音
    const sound = new Howl({
      src: [soundPath],
      preload: true // 预加载声音
    });

    // 创建一个点击事件处理器
    const playSoundHandler = () => {
      const store = useGlobalStore();
      const { systemConfig } = storeToRefs(store);
      console.log(systemConfig.value.openAudio);
      if (!systemConfig.value.openAudio) return;
      sound.play();
    };

    // 将事件处理器绑定到元素上，以便稍后卸载时可以引用
    el.__playSoundHandler__ = playSoundHandler;

    // 为元素添加点击事件监听器，触发声音播放
    el.addEventListener("click", playSoundHandler);
  },
  // 当指令与元素解绑时调用
  unmounted(el) {
    // 移除点击事件监听器
    if (el.__playSoundHandler__) {
      el.removeEventListener("click", el.__playSoundHandler__);
      el.__playSoundHandler__ = null;
    }
  }
};
