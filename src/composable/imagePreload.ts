import {
  DefaultImageLoader,
  DefaultImagePreloader,
  DefaultProgressTracker
} from "@/utils/class";

export function useImagePreloader(
  imageSources: string[],
  finishCallback: () => void = () => {}
) {
  const progressTracker = new DefaultProgressTracker();
  const imageLoader = new DefaultImageLoader();
  const imagePreloader = new DefaultImagePreloader(
    imageLoader,
    progressTracker
  );

  const totalProgress = progressTracker.getProgress(); // 取得總進度的 Ref

  // 當組件載入時預載圖片
  imagePreloader.preloadImages(imageSources).then(() => {
    finishCallback();
  });

  return {
    totalProgress
  };
}
