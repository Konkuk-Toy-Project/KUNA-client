import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const isClientState = atom({
  key: "isClientState",
  default: true,
});

export const currentY = atom({
  key: "currentY",
  default: 0,
});

const { persistAtom } = recoilPersist({
  key: "userToken",
  storage: localStorage,
});

export const userTokenState = atom({
  key: "userTokenState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
