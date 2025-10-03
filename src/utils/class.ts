import { ref, computed, Ref } from "vue";
import { ImageLoader, ProgressTracker, ImagePreloader } from "@/types/global";

// DefaultImageLoader 負責圖片載入
export class DefaultImageLoader implements ImageLoader {
  load(src: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
      img.src = src;
    });
  }
}

// DefaultProgressTracker 負責追蹤進度
export class DefaultProgressTracker implements ProgressTracker {
  private progress = ref(0);

  updateProgress(loaded: number, total: number): void {
    this.progress.value = Math.round((loaded / total) * 100);
  }

  getProgress(): Ref<number> {
    return computed(() => this.progress.value);
  }
}

// MultiProgressTracker 負責多個來源的進度追蹤
export class MultiProgressTracker {
  private sources: Map<string, { progress: number; weight: number }> =
    new Map();
  private totalWeight: number = 0;
  private progressRef: Ref<number> = ref(0);

  addSource(name: string, weight: number = 1) {
    this.sources.set(name, { progress: 0, weight });
    this.totalWeight += weight;
  }

  updateProgress(name: string, progress: number) {
    const source = this.sources.get(name);
    if (source) {
      source.progress = progress;
      this.recalculateTotalProgress();
    }
  }

  private recalculateTotalProgress() {
    let totalProgress = 0;
    for (const [, { progress, weight }] of this.sources) {
      totalProgress += (progress * weight) / this.totalWeight;
    }
    this.progressRef.value = Math.round(totalProgress);
  }

  getTotalProgress(): Ref<number> {
    return computed(() => this.progressRef.value);
  }
}

// DefaultImagePreloader 使用 MultiProgressTracker 來追蹤每張圖片的載入進度
export class DefaultImagePreloader implements ImagePreloader {
  private loadedImages: Record<string, boolean> = {};
  private imageLoader: ImageLoader;
  private progressTracker: DefaultProgressTracker;

  constructor(
    imageLoader: ImageLoader,
    progressTracker: DefaultProgressTracker
  ) {
    this.imageLoader = imageLoader;
    this.progressTracker = progressTracker;
  }

  async preloadImages(sources: string[]): Promise<void> {
    const total = sources.length;

    let loaded = 0;
    for (const src of sources) {
      try {
        const isLoaded = await this.imageLoader.load(src);
        this.loadedImages[src] = isLoaded;
      } catch {
        this.loadedImages[src] = false;
      }
      loaded++;
      this.progressTracker.updateProgress(loaded, total);
    }
  }

  isImageLoaded(src: string): boolean {
    return this.loadedImages[src] || false;
  }

  getProgress(): Ref<number> {
    return this.progressTracker.getProgress();
  }
}
