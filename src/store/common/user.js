import { atom } from "recoil";

export const isClientState = atom({
  key: "isClientState",
  default: false,
});

export const currentY = atom({
  key: "currentY",
  default: 0,
});
