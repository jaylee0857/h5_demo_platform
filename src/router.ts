import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import createRoutes from "@/_app/routes";
import { useGlobalStore } from "@/store/app-store";
/* 設定預設導入頁面 */
const options = {
  defaultPath: "/loading"
};

/* 建立router */
const router = createRouter({
  //hash模式
  history: createWebHashHistory(import.meta.env.VITE_ROUTE_BASE),
  //掛載處理好的routes
  routes: createRoutes(options) as Array<RouteRecordRaw>,
  scrollBehavior() {
    /** 換頁捲軸回到上方 */
    return { top: 0 };
  }
});

router.beforeEach(async (to, from, next) => {
  const appStore = useGlobalStore();
  /** 首次加載必須進首頁 */
  if (appStore.progress === 0 && to.path !== "/loading") {
    next("/loading");
  }
  next();
});

export default router;
