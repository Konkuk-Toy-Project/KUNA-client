import { atom } from "recoil";

export const showAnswerPopUpState = atom({
  key: "showAnswerPopUpState",
  default: false,
});

export const currentAnswerItemState = atom({
  key: "currentAnswerItemState",
  default: {},
});
