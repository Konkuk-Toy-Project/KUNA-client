import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "teams",
  storage: localStorage,
});

export const basketItemState = atom({
  key: "basketItemState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
