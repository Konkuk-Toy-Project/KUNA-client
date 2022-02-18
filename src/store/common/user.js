import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userToken",
  storage: localStorage,
});

export const isClientState = atom({
  key: "isClientState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const currentY = atom({
  key: "currentY",
  default: 0,
});

export const userTokenState = atom({
  key: "userTokenState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
