import React from "react";
import PropTypes from "prop-types";
import IconUser from "../Icon/IconUser";
import styled from "styled-components";
import RatingStars from "./RatingStars";

const ReviewHeader = ({ rate, memberName, option, date }) => {
  return (
    <HeaderWrapper>
      <UserIconWrapper>
        <IconUser color={"#424242"} />
      </UserIconWrapper>
      <UserInfoWrapper>
        <RatingWrapper name="user-rate">
          <StarWrapper>
            <RatingStars rate={rate} />
          </StarWrapper>
          <RateNumSpan>{rate.toFixed(1)}</RateNumSpan>
        </RatingWrapper>
        <HeaderSpanWrapper>
          <HeaderSpan>{memberName}</HeaderSpan>│
          <HeaderSpan>{option}</HeaderSpan>│
          <HeaderSpan>{date.substring(0, 10)}</HeaderSpan>
        </HeaderSpanWrapper>
      </UserInfoWrapper>
    </HeaderWrapper>
  );
};

ReviewHeader.propTypes = {
  rate: PropTypes.number.isRequired,
  memberName: PropTypes.string.isRequired,
  option: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  margin: 5px 0px;
`;

const UserIconWrapper = styled.div`
  font-size: 50px;
`;

const UserInfoWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RatingWrapper = styled.div`
  margin: 2px 0 2px 5px;
`;

const StarWrapper = styled.div`
  font-size: 25px;
  width: 140px;
  display: inline-block;
`;

const HeaderSpanWrapper = styled.div`
  margin: 2px 0px;
`;
const HeaderSpan = styled.span`
  margin: 0px 10px;
  color: #616161;
  font-size: 13px;
`;

const RateNumSpan = styled.span`
  font-size: 18px;
`;

export default ReviewHeader;
