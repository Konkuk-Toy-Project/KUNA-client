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
