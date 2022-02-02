import { atom } from "recoil";

export const enrolledCouponState = atom({
  key: "enrolledCouponState",
  default: [
    {
      id: 0,
      name: "신규 가입 유저 환영 쿠폰",
      discount: 30,
    },
    {
      id: 1,
      name: "새해 기념 쿠폰",
      discount: 20,
    },
  ],
});

export const showCouponPopUpState = atom({
  key: "showCouponPopUpState",
  default: false,
});
