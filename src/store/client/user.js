import { atom } from "recoil";

export const passwordPopUpState = atom({
  key: "passwordPopUpState",
  default: false,
});

export const showPointState = atom({
  key: "showPointState",
  default: false,
});

export const showCouponState = atom({
  key: "showCouponState",
  default: false,
});

export const orderedItemState = atom({
  key: "orderedItemState",
  default: [
    {
      id: 1,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: 25400,
      review: true,
    },
    {
      id: 3,
      image:
        "https://img.sonyunara.com/files/goods/159936/1640237296_5.gif.webp",
      title: "라이크 브이넥 꽈배기 도톰 니트(T)",
      discount: "24%",
      price: 23500,
      review: false,
    },
    {
      id: 4,
      image:
        "https://img.sonyunara.com/files/goods/163972/1641436842_5.gif.webp",
      title: "아일렛 스트라이프 라운드넥 니트(T)",
      discount: "25%",
      price: 16500,
      review: false,
    },
  ],
});

export const showOrderedItemState = atom({
  key: "showOrderedItemState",
  default: false,
});

export const showWriteReviewState = atom({
  key: "showWriteReviewState",
  default: false,
});

export const currentReviewItemState = atom({
  key: "currentReviewItemState",
  default: [],
});

export const showRankState = atom({
  key: "showRankState",
  default: false,
});
