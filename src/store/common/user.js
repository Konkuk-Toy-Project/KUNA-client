import { atom } from "recoil";

export const isClientState = atom({
  key: "isClientState",
  default: true,
});

export const currentY = atom({
  key: "currentY",
  default: 0,
});

export const userTokenState = atom({
  key: "userTokenState",
  default: [],
});
