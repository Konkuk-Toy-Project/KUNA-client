import { atom } from "recoil";

export const likeState = atom({
  key: "likeState",
  default: [
    {
      itemState: "NORMALITY",
      thumbnailUrl: "thumbnail.webp",
      name: "Jordan 1 Retro High - Men Shoes",
      price: 199000,
      preference: 1,
      sale: 0,
      itemId: 14,
      categoryId: 4,
      categoryName: "상의",
    },
    {
      itemState: "NORMALITY",
      thumbnailUrl: "thumbnail.webp",
      name: "Jordan 1 Retro Low - Men Shoes",
      price: 1000,
      preference: 1,
      sale: 0,
      itemId: 15,
      categoryId: 4,
      categoryName: "상의",
    },
  ],
});
