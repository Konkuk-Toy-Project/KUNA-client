import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "basketItems",
  storage: localStorage,
});

export const basketItemState = atom({
  key: "basketItemState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const buyingItemState = atom({
  key: "buyingItemState",
  default: [],
});
