import { atom, selector } from "recoil";

export const buyingState = atom({ key: "buyingState", default: [] });

export const buyingDefaultPrice = selector({
  key: "defaultPriceState",
  get: ({ get }) => {
    const buyings = get(buyingState);
    if (buyings.lengh == 0) return 0;
    const _defaultPrice = buyings
      .map((b) => b.price)
      .reduce((prev, post) => prev + post);
    return _defaultPrice;
  },
});

export const buyingSalePrice = selector({
  key: "salePriceState",
  get: ({ get }) => {
    const buyings = get(buyingState);
    if (buyings.lengh == 0) return 0;
    const _salePrice = buyings
      .map((b) => (b.price * (100 - b.sale)) / 100)
      .reduce((prev, post) => prev + post);
    return _salePrice;
  },
});
// {
//     thumbnailImg: 상품 이미지 저장 이름,
//     name: 아이템 이름,
//     price: 판매 가격,
//     sale: 세일 % 지수,
//     itemId: 상품 고유 id,
//     option1Name: 옵션1 이름,
//     option1Id: 옵션1 고유 id,
//     option2Name: 옵션2 이름,
//     option2Id: 옵션2 고유 id,
//     count: 구매개수,
//     stock: 선택한 옵션조합의 재고,
// }
