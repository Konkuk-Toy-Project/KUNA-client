import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  showCouponState,
  showOrderedItemState,
  showPointState,
  showRankState,
  showWriteReviewState,
} from "../../../../store/client/user";
import PointPopUp from "../PointPopUp/PointPopUp";
import CouponPopUp from "../CouponPopUp/CouponPopUp";
import OrderedItemPopUp from "../OrderedItemPopUp/OrderedItemPopUp";
import WriteReviewPopUp from "../WriteReviewPopUp/WriteReviewPopUp";
import RankPopUp from "../RankPopUp/RankPopUp";
import { currentY } from "../../../../store/common/user";

const ProfileBanner = ({ userInfo }) => {
  const [showRank, setShowRank] = useRecoilState(showRankState);
  const [showPoint, setShowPoint] = useRecoilState(showPointState);
  const [showCoupon, setShowCoupon] = useRecoilState(showCouponState);
  const [showOrderedItem, setShowOrderedItem] =
    useRecoilState(showOrderedItemState);
  const setCurrentY = useSetRecoilState(currentY);
  const showWriteReview = useRecoilValue(showWriteReviewState);

  const calculatePopUpHeight = () => {
    setCurrentY(window.scrollY + window.innerHeight * 0.15);
  };

  const onClick = (handleState) => {
    calculatePopUpHeight();
    handleState(true);
  };

  return (
    <ProfileBannerWrapper>
      <UserInfo>
        <NameAndRankWrapper>
          <Name>{userInfo.name}님</Name>
          <Rank>등급 : {userInfo.role}</Rank>
          <button onClick={() => onClick(setShowRank)}>등급 달성 기준</button>
        </NameAndRankWrapper>
      </UserInfo>
      <UserMenus>
        <UserMenu onClick={() => onClick(setShowPoint)}>포인트</UserMenu>
        <UserMenu onClick={() => onClick(setShowCoupon)}>쿠폰</UserMenu>
        <UserMenu onClick={() => onClick(setShowOrderedItem)}>
          주문한 상품
        </UserMenu>
      </UserMenus>
      {showRank && <RankPopUp />}
      {showPoint && <PointPopUp />}
      {showCoupon && <CouponPopUp />}
      {showOrderedItem && <OrderedItemPopUp />}
      {showWriteReview && <WriteReviewPopUp />}
    </ProfileBannerWrapper>
  );
};

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

export default ProfileBanner;
