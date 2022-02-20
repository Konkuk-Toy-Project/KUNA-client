import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const QnAItemInfo = ({ thumbnail, name }) => {
  return (
    <div>
      <InfoWrapper name="productInfoSection">
        <Img name="thumbnail" src={thumbnail} alt="썸네일" />
        <ItemName name="상품명">{name}</ItemName>
      </InfoWrapper>
    </div>
  );
};

QnAItemInfo.propTypes = {
  thumbnail: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const ItemName = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  padding: 0px 10px;
`;

export default QnAItemInfo;
