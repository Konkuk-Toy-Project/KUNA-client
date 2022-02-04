import React, { useState } from "react";
import ItemBrief from "../../components/client/ItemDetail/ItemBrief/ItemBrief";

const ItemDetailPage = () => {
  //sample data
  const [item, setItem] = useState({
    itemState: "normality",
    itemImageUrl: [
      "https://img.sonyunara.com/files/goods/139373/1637742098_0.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637652166_2.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637657482_3.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637715429_4.jpg",
      "https://img.sonyunara.com/files/goods/139373/1637740513_16.jpg",
    ],
    name: "sts9717 [1+1기획] 맨살에 닿아도 부드러운 핫팩 기모 폴라티 2종",
    price: 15000,
    preference: 7,
    registryDate: 220102,
    sale: 15,
    itemId: 121935,
    categoryName: "shirt",
    categoryId: 1,
    option1: [
      {
        name: "Size M",
        option1Id: 18,
        stock: 16,
        option2: [],
      },
      {
        name: "Size L",
        option1Id: 15,
        stock: 5,
        option2: [
          {
            name: "빨간색",
            stock: 3,
            option2Id: 12,
          },
          {
            name: "노란색",
            stock: 2,
            option2Id: 10,
          },
        ],
      },
    ],
    detailImageUrl: [
      "https://img.sonyunara.com/files/goodsm/139373/1639466954_7.jpg",
    ],
  });
  return (
    <div>
      <ItemBrief itemObj={item} />
    </div>
  );
};

export default ItemDetailPage;
