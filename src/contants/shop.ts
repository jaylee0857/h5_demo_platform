import { getImageUrl } from "@/utils/getImageUrl";

export const FAKE_SHOP_LIST = [
  {
    id: 1,
    buyPrice: 60,
    point: 1000000,
    discountPoint: 2000000,
    img: getImageUrl("shop/shop_money.svg"),
    imgSize: {
      marginRight: "0.22rem"
    },
    vipPoint: 200,
    gemPoint: 500
  },
  {
    id: 2,
    buyPrice: 150,
    point: 1000000,
    discountPoint: 6500000,
    img: getImageUrl("shop/shop_money_2.svg"),
    imgSize: {
      marginRight: "0.22rem",
      width: "auto",
      height: "0.7rem"
    },
    vipPoint: 500,
    gemPoint: 800
  },
  {
    id: 3,
    buyPrice: 320,
    point: 1000000,
    discountPoint: 135000000,
    img: getImageUrl("shop/shop_money_3.svg"),
    imgSize: {
      width: "1.1rem",
      height: "auto",
      marginRight: "-0.1rem"
    },
    vipPoint: 1200,
    gemPoint: 1000
  },
  {
    id: 4,
    buyPrice: 690,
    point: 1000000,
    discountPoint: 335000000,
    img: getImageUrl("shop/shop_money_4.svg"),
    imgSize: {
      height: "0.8rem",
      width: "1rem",
      marginTop: "0.1rem"
    },
    vipPoint: 1500,
    gemPoint: 1000
  },
  {
    id: 5,
    buyPrice: 1490,
    point: 1000000,
    discountPoint: 112000001,
    img: getImageUrl("shop/shop_money_5.svg"),
    imgSize: {
      height: "1rem",
      width: "1rem",
      marginTop: "-0.01rem"
    },
    vipPoint: 2000,
    gemPoint: 1500
  },
  {
    id: 6,
    buyPrice: 2990,
    point: 1000000,
    discountPoint: 275500000,
    img: getImageUrl("shop/shop_money_6.svg"),
    imgSize: {
      width: "1.1rem",
      height: "0.9rem",
      marginTop: "0",
      marginRight: "-0.1rem"
    },
    vipPoint: 3000,
    gemPoint: 2500
  }
];
