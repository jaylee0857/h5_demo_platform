// composables/usePixi.ts
import * as PIXI from "pixi.js";
import { Spine } from "pixi-spine";
import { Assets } from "pixi.js";

export function usePixi() {
  const app = ref<PIXI.Application | null>(null);
  const animations = ref<Map<string, Spine>>(new Map());

  // 初始化 PIXI
  const initPixi = (container: HTMLElement) => {
    app.value = new PIXI.Application({
      resizeTo: container,
      autoDensity: true,
      resolution: window.devicePixelRatio || 1,
      backgroundColor: 0x000000,
      backgroundAlpha: 0
    });

    container.appendChild(app.value.view as HTMLCanvasElement);
  };

  // 加載 Spine 動畫資源
  const loadSpineAnimation = async (name: string) => {
    const basePath = "/game_platform";
    const resources = {
      atlas: `${basePath}/${name}.atlas`,
      image: `${basePath}/${name}.webp`,
      json: `${basePath}/${name}.json`
    };

    try {
      await Assets.load([
        { alias: `${name}Data`, src: resources.json },
        { alias: `${name}Atlas`, src: resources.atlas },
        { alias: `${name}Image`, src: resources.image }
      ]);

      const spineData = Assets.get(`${name}Data`);
      return spineData;
    } catch (error) {
      console.error(`Failed to load spine animation ${name}:`, error);
      throw error;
    }
  };

  // 創建動畫實例
  const createAnimation = (name: string, spineData: any) => {
    if (!app.value) return null;

    const animation = new Spine(spineData.spineData);
    animation.state.timeScale = 1;
    animation.x = app.value.screen.width / 2;
    animation.y = app.value.screen.height / 1.5;
    animation.scale.set(0.15);

    // 添加到舞台
    app.value.stage.addChild(animation);

    animations.value.set(name, animation);
    return animation;
  };

  // 播放動畫
  const playAnimation = (name: string, animationName?: string, loop = true) => {
    const animation = animations.value.get(name);
    if (!animation) return;

    const availableAnimations = animation.spineData.animations.map(
      (anim) => anim.name
    );

    const targetAnimation = animationName || availableAnimations[0];
    if (availableAnimations.includes(targetAnimation)) {
      animation.state.setAnimation(0, targetAnimation, loop);
    }
  };

  // 停止動畫
  const stopAnimation = (name: string) => {
    const animation = animations.value.get(name);
    if (animation) {
      animation.state.clearTrack(0);
    }
  };

  // 清理資源
  const cleanup = () => {
    animations.value.forEach((animation) => {
      animation.destroy();
    });
    animations.value.clear();
    app.value?.destroy(true);
    app.value = null;
  };

  onUnmounted(() => {
    cleanup();
  });

  return {
    app,
    animations,
    initPixi,
    loadSpineAnimation,
    createAnimation,
    playAnimation,
    stopAnimation,
    cleanup
  };
}
