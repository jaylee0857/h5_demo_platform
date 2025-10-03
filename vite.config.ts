import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { fileURLToPath, URL } from "node:url";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { resolve } from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/game_platform/", // 設置基礎路徑 為了配合github action
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: "src/quasar-variables.sass"
    }),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/animation/*.atlas",
          dest: "assets/animation"
        },
        {
          src: "src/assets/animation/*.json",
          dest: "assets/animation"
        },
        {
          src: "src/assets/animation/*.webp",
          dest: "assets/animation"
        }
      ]
    }),
    /** 自動導入plugins */
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          "@arshown/vue3-i18n": [
            // 列出你想要自動導入的函數或方法
            "useI18n"
            // 如果有其他你經常使用的函數，也可以加在這裡
          ]
        }
      ], // 自動導入的模塊
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/auto-imports.d.ts",
      // eslint报错解决
      eslintrc: {
        enabled: true, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    {
      // do not fail on serve (i.e. local development)
      ...eslint({
        failOnWarning: false,
        failOnError: false
      }),
      apply: "serve",
      enforce: "post"
    },
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true
      },
      manifest: {
        name: "Casino",
        short_name: "Casino",
        description: "thie is a demo Casino Game",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa_icon.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        start_url: "/game_platform/",
        display: "standalone",
        background_color: "#ffffff"
      }
    })
  ],
  assetsInclude: ["**/*.atlas"],
  /** 快捷路徑設定 */
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  /** 在全域也可以使用await */
  esbuild: {
    supported: {
      "top-level-await": true //browsers can handle top-level-await features
    }
  },
  /** 本地開發設定 */
  server: {
    //用来配置跨域
    // host: "0.0.0.0",
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    },
    cors: {
      origin: "*"
    }
  },
  /** 打包設定 */
  build: {
    // 根據當前 Git 分支決定輸出目錄，如果是 "online" 分支，則輸出到 `dist_online`，否則輸出到 `dist`
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // 這裡添加了一個新的入口文件，用於加載精靈圖集
        atlas: resolve(__dirname, "src/assets/animation/02.atlas")
      },
      output: {
        // 定義資源文件的輸出路徑和命名規則
        assetFileNames: (assetInfo) => {
          // if (assetInfo.name.includes("02")) {
          //   console.log(assetInfo.name);
          // }
          let extType = assetInfo.name.split(".").at(1); // 獲取文件的擴展名
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img"; // 如果是圖片文件，將擴展名設置為 "img"
          }
          return `assets/${extType}/[name]-[hash][extname]`; // 將資源文件輸出到對應的文件夾
        },
        // 定義代碼塊的輸出路徑和命名規則
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        // 手動定義代碼分塊策略
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 如果模塊來自 node_modules，將其單獨打包，並以其第一級目錄命名
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
          if (id.includes("pages")) {
            // 如果模塊來自 views 目錄，將其單獨打包為 "views"
            return "pages";
          }
        }
      }
    }
  }
});
