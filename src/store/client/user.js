import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    image:
      "https://w.namu.la/s/18cdc3e45fee5e76f3f3a29056396db782c12502afe39de7539f82893cd2339c70522a6bdbb849a2cf990ce554dca7db8307eac97b5591f4a623fc595694af51ef0b92a216ae9bbc63c4a65415f7579a977dcf5da16a4e26a34efb1ae546b93f",
    email: "asdf@asdf.com",
    password: "mypassword",
    name: "홍길동",
    phone: "010123456789",
    birth: "19980101",
    role: "Bronze",
  },
});

export const passwordPopUpState = atom({
  key: "passwordPopUpState",
  default: false,
});

export const userPointState = atom({
  key: "userPointState",
  default: 35000,
});

export const showPointState = atom({
  key: "showPointState",
  default: false,
});

export const userCouponState = atom({
  key: "userCouponState",
  default: [
    {
      id: 123123123,
      name: "신규 가입 유저 환영 쿠폰",
      discount: 30,
    },
    {
      id: 321321321,
      name: "새해 기념 쿠폰",
      discount: 20,
    },
  ],
});

export const showCouponState = atom({
  key: "showCouponState",
  default: false,
});

export const orderedItemState = atom({
  key: "orderedItemState",
  default: [
    {
      id: 1,
      image:
        "https://img.sonyunara.com/files/goods/165196/1641453724_5.gif.webp",
      title: "레셔 아가일패턴 브이넥 벌룬소매 니트 가디건(G)",
      discount: "5%",
      price: 25400,
      review: true,
    },
    {
      id: 3,
      image:
        "https://img.sonyunara.com/files/goods/159936/1640237296_5.gif.webp",
      title: "라이크 브이넥 꽈배기 도톰 니트(T)",
      discount: "24%",
      price: 23500,
      review: false,
    },
    {
      id: 4,
      image:
        "https://img.sonyunara.com/files/goods/163972/1641436842_5.gif.webp",
      title: "아일렛 스트라이프 라운드넥 니트(T)",
      discount: "25%",
      price: 16500,
      review: false,
    },
  ],
});

export const showOrderedItemState = atom({
  key: "showOrderedItemState",
  default: false,
});

export const showWriteReviewState = atom({
  key: "showWriteReviewState",
  default: false,
});

export const currentReviewItemState = atom({
  key: "currentReviewItemState",
  default: [],
});

export const currentY = atom({
  key: "currentY",
  default: 0,
});

export const showRankState = atom({
  key: "showRankState",
  default: false,
});