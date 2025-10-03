// useMultiProgress.ts
import { MultiProgressTracker } from "@/utils/class";

export function useMultiProgress() {
  const tracker = new MultiProgressTracker();

  return {
    addSource: (name: string, weight: number = 1) =>
      tracker.addSource(name, weight),
    updateProgress: (name: string, progress: number) =>
      tracker.updateProgress(name, progress),
    totalProgress: tracker.getTotalProgress()
  };
}
