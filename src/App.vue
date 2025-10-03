<script setup lang="ts">
import { useImagePreloader } from "@/composable/imagePreload";
import { useMultiProgress } from "@/composable/mutiProgressTracker";
import { isNil, defaultTo, path } from "ramda";
import { getImageUrl } from "@/utils/getImageUrl";
import { useGlobalStore } from "@/store/app-store";
import { DefaultImageLoader } from "@/utils/class";
import storage from "store2";

const route = useRoute();
const router = useRouter();
const appStore = useGlobalStore();
const deferredPrompt = ref(null);

const layout = computed(() => {
  /* 一開始都是 undefined */
  /* isNil為檢查空值，為null或undefined則return null */
  if (isNil(route?.path)) return null;
  /*
    拿設定的 layout。
    通常預設是layout-default，但如果該頁面沒有設定layout，則會使用layout-error
    defaultTo 設定預設值
    path 取得物件的值 相當於route.meta.layout
   */
  const currentLayout = defaultTo("layout-error")(
    path(["meta", "layout"], route)
  );
  // defaulto的功用就是給預設值
  // 這邊的用法是先設定defaultTo預設值，
  // 緊接著馬上用設置好的預設值下去執行再return結果給變數
  // 所以才會是兩個（）（）分別代表執行了兩次fn，設置及使用
  // 分解大概長這樣：
  // const default = defaultTo("layout-error");
  // default(path(["meta", "layout"], store.state.route))
  return currentLayout;
});

const computeSize = (): void => {
  /* 設計尺寸： 750 * 1334 */
  /* 字體大小隨著螢幕寬度更改 */
  document.getElementsByTagName("html")[0].style.cssText = `font-size: ${
    (document.body.clientWidth / 750) * 100
  }px`;
};

const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

const imagesToPreload = [
  getImageUrl("home/gift_icon.svg"), // footer-icon
  getImageUrl("home/slot_btn.svg"), // footer-icon
  getImageUrl("home/poker_btn.svg"), // footer-icon
  getImageUrl("home/mail_icon.svg"), // footer-icon
  getImageUrl("home/footer_coin.svg"), // footer-icon
  // getImageUrl("home/profile_img.png"), // header-icon
  getImageUrl("home/footer_str.png"), // footer-icon
  getImageUrl("home/buy.svg"), // footer-icon
  getImageUrl("home/piggy_bank.svg"), // footer-icon
  getImageUrl("default_background.png"), // background
  getImageUrl("downbar_bg.png"), // footer
  getImageUrl("topbar_bg.png"), // header
  getImageUrl("home/award_bg.png"), // footer
  getImageUrl("home/award_1.png"), // footer
  getImageUrl("home/award_2.png"), // footer
  getImageUrl("home/award_3.png"), // footer
  // login
  getImageUrl("facebook_btn.png"), // header
  getImageUrl("google_btn.png") // header
  // loading
];

const { totalProgress: imageProgress } = useImagePreloader(
  imagesToPreload,
  () => {
    console.log("imageProgress 圖片加載完成", imageProgress.value);
  }
);

const { addSource, updateProgress, totalProgress } = useMultiProgress();

// 添加圖片預加載進度源
addSource("imagePreloader", 1);
// 添加另一個進度源
addSource("pendingProgress", 1);

const initializePwaInstallListeners = () => {
  // 已經有安裝過pwa會載加載此事件
  window.addEventListener("appinstalled", () => {
    deferredPrompt.value = null;
    console.log("PWA was installed");
  });

  // 尚未安裝pwa並且使用者裝置可以安裝時載加載此事件 此時顯示彈窗提示使用者是否要安裝
  window.addEventListener("beforeinstallprompt", (e) => {
    const isInstallPrompt = storage.get("installPwa");
    if (isInstallPrompt) return;
    e.preventDefault();
    deferredPrompt.value = e;
    appStore.setPwaState(true, e);
  });
};

const init = async () => {
  /** 優先載入Loading背景圖片 */
  const defaultImageLoader = new DefaultImageLoader();
  await defaultImageLoader.load(getImageUrl("Loading.png"));
};

init();

onMounted(() => {
  initializePwaInstallListeners();
});

/** 為了進度條可以讓使用者看到正常跑動，而不是載入太快一下就跳轉顯得太突兀，加入了pending功能 */
watch(imageProgress, (value) => {
  updateProgress("imagePreloader", value);
  if (value === 100) {
    updateProgress("pendingProgress", 10);
    setTimeout(() => {
      updateProgress("pendingProgress", 100);
    }, 500);
  }
});

watch(totalProgress, (value) => {
  appStore.setProgress(value);
  /** 載入完成前往登入頁面 */
  if (value === 100) {
    router.replace("/login");
  }
});

onMounted(() => {
  computeSize();
  setVh();
  window.addEventListener("resize", () => {
    computeSize();
    setVh();
  });
});
</script>

<template>
  <!-- 外層利用is載入layout -->
  <component :is="layout">
    <!-- 內層利用router顯示 透過解構賦值 取得從router-view取得的component 在把Component用在:is＝"Component"身上-->
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </component>
</template>
