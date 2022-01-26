import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentX,
  currentY,
  showCouponState,
  showOrderedItemState,
  showPointState,
  showWriteReviewState,
  userState,
} from "../../../store/atoms";
import PointPopUp from "../PointPopUp/PointPopUp";
import CouponPopUp from "../CouponPopUp/CouponPopUp";
import OrderedItemPopUp from "../OrderedItemPopUp/OrderedItemPopUp";
import WriteReviewPopUp from "../WriteReviewPopUp/WriteReviewPopUp";

const ProfileBannerWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90vw;
  height: 20vh;
  border: 1px solid black;
  margin: 1em;
  border-radius: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.img`
  width: 10em;
  height: 10em;
  border-radius: 50%;
  border: 1px solid black;
`;

const NameAndRankWrapper = styled.div`
  margin-left: 1em;
`;

const Name = styled.p`
  font-size: 32px;
  font-weight: 600;
`;

const Rank = styled.p`
  font-size: 24px;
`;

const UserMenus = styled.ul`
  width: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const UserMenu = styled.li`
  width: 6em;
  height: 6em;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 20px;
  text-align: center;
  line-height: 6em;
  margin: 0 1em;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
    transition: all 0.3s linear;
    transform: scale(1.1);
  }
`;

const ProfileBanner = () => {
  const userInfo = useRecoilValue(userState);
  const [showPoint, setShowPoint] = useRecoilState(showPointState);
  const [showCoupon, setShowCoupon] = useRecoilState(showCouponState);
  const [showOrderedItem, setShowOrderedItem] =
    useRecoilState(showOrderedItemState);
  const setCurrentX = useSetRecoilState(currentX);
  const setCurrentY = useSetRecoilState(currentY);
  const showWriteReview = useRecoilValue(showWriteReviewState);

  const calculatePopUpWidth = () => {
    setCurrentX(window.scrollX + window.innerWidth * 0.15);
  };
  const calculatePopUpHeight = () => {
    setCurrentY(window.scrollY + window.innerHeight * 0.15);
  };

  const onClickPoint = () => {
    calculatePopUpWidth();
    calculatePopUpHeight();
    setShowPoint(true);
  };

  const onClickCoupon = () => {
    calculatePopUpWidth();
    calculatePopUpHeight();
    setShowCoupon(true);
  };

  const onClickOrderedItem = () => {
    calculatePopUpWidth();
    calculatePopUpHeight();
    setShowOrderedItem(true);
  };

  return (
    <ProfileBannerWrapper>
      <UserInfo>
        <UserImage src={userInfo.image} alt="User Image" />
        <NameAndRankWrapper>
          <Name>{userInfo.name}님</Name>
          <Rank>등급 : {userInfo.role}</Rank>
        </NameAndRankWrapper>
      </UserInfo>
      <UserMenus>
        <UserMenu onClick={onClickPoint}>포인트</UserMenu>
        <UserMenu onClick={onClickCoupon}>쿠폰</UserMenu>
        <UserMenu onClick={onClickOrderedItem}>주문한 상품</UserMenu>
      </UserMenus>
      {showPoint && <PointPopUp />}
      {showCoupon && <CouponPopUp />}
      {showOrderedItem && <OrderedItemPopUp />}
      {showWriteReview && <WriteReviewPopUp />}
    </ProfileBannerWrapper>
  );
};

export default ProfileBanner;
