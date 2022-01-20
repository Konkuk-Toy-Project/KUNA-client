import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "itemDetailData",
  storage: localStorage,
});

export const itemDetailState = atom({
  key: "itemDetailState",
  default: {
    id: 1,
    title: "sts9717 [1+1기획] 맨살에 닿아도 부드러운 핫팩 기모 폴라티 2종",
    briefImg: [
      "https://img.sonyunara.com/files/goods/139373/1637742098_0.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637652166_2.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637657482_3.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637715429_4.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637740513_16.jpg",
    ],
    infoImg: "https://img.sonyunara.com/files/goodsm/139373/1639466954_7.jpg",
    price: 15000,
    discount: 30,
    option1: ["그레이", "검정", "핑크"],
    option2: ["M", "L"],
    quantity: [3, 50, 2, 1, 15, 30],
    title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
  },
  effects_UNSTABLE: [persistAtom],
});

export const ItemBriefImgsState = selector({
  key: "ItemBriefImgsState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const item = get(itemDetailState);

    return item.briefImg;
  },
});

export const ItemInfoImgState = selector({
  key: "ItemInfoImgsState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const item = get(itemDetailState);
    return item.infoImg;
  },
});

export const LikeNumState = atom({
  key: "LikeNumState",
  default: {
    id: 1,
    likes: 7,
  },
});

export const OnlyLikeNumState = selector({
  key: "OnlyLikeNumState",
  get: ({ get }) => {
    const likeState = get(LikeNumState);
    return likeState.likes;
  },
});
