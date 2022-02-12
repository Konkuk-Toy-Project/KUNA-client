import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import AddCouponPopUp from "../../components/owner/Coupon/AddCouponPopUp/AddCouponPopUp";
import MenuCategory from "../../components/owner/Main/MenuCategory/MenuCategory";
import { showCouponPopUpState } from "../../store/owner/coupon";

const OwnerMainPage = () => {
  const showCouponPopUp = useRecoilValue(showCouponPopUpState);
  return (
    <OwnerMainPageWrapper>
      <Title>원하는 작업을 선택하세요</Title>
      <MenuCategoryWrapper>
        <MenuCategory
          link="/products"
          imageUrl="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon3.png"
          title="상품 관리"
        />
        <MenuCategory
          type="coupon"
          imageUrl="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon2.png"
          title="쿠폰 등록하기"
          onClick={() => console.log("Coupon")}
        />
        <MenuCategory
          link="/answers"
          imageUrl="https://img.sonyunara.com/2020/asset/pc/img/common/header/my_icon1.png"
          title="Q&A 답변"
        />
      </MenuCategoryWrapper>
      {showCouponPopUp && <AddCouponPopUp />}
    </OwnerMainPageWrapper>
  );
};

const OwnerMainPageWrapper = styled.div`
  text-align: center;
  height: 70vh;
`;

const Title = styled.p`
  font-size: 2em;
  margin: 2em 0 4em 0;
`;

const MenuCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export default OwnerMainPage;
