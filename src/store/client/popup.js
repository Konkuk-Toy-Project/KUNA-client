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

export const selAnswIdxState = atom({
  key: "selAnswIdxState",
  default: null,
});
