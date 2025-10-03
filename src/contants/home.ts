import { getImageUrl } from "@/utils/getImageUrl";

const defaultBanner = getImageUrl("home/banner/banner2.png");
export const BANNERS = [
  {
    id: 1,
    title: "Banner 1",
    src: defaultBanner
  },
  {
    id: 2,
    title: "Banner 2",
    src: defaultBanner
  },
  {
    id: 3,
    title: "Banner 3",
    src: defaultBanner
  }
];
