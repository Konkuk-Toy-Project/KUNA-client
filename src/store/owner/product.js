import { atom } from "recoil";

export const productState = atom({
  key: "productState",
  default: [],
});

export const currentItemState = atom({
  key: "currentItemState",
  default: {},
});

export const showAddPopUpState = atom({
  key: "showAddPopUpState",
  default: false,
});

export const showEditPopUpState = atom({
  key: "showEditPopUpState",
  default: false,
});

export const showOptionPopUpState = atom({
  key: "showOptionPopUpState",
  default: false,
});
