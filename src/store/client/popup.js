import { atom } from "recoil";

export const basketPopupState = atom({
  key: "basketPopupState",
  default: false,
});

export const reviewPopupState = atom({
  key: "reviewPopupState",
  default: {},
});

export const qnAWritePopupState = atom({
  key: "qnAWritePopupState",
  default: false,
});
