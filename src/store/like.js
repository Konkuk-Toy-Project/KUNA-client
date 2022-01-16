import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "teams",
  storage: localStorage,
});

export const itemState = atom({
  key: "itemState",
  default: [
    {
      id: 1,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
    {
      id: 2,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
    {
      id: 3,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
    {
      id: 4,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
    {
      id: 5,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
    {
      id: 6,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
    {
      id: 7,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
    {
      id: 8,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: "25,400",
    },
  ],
});

export const basketItemState = atom({
  key: "basketItemState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
