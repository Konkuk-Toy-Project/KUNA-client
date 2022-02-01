import React from "react";
import PropTypes from "prop-types";

const QnAItemInfo = ({ thumbnail, name }) => {
  return (
    <div>
      <div name="productInfoSection">
        <img name="thumbnail" src={thumbnail} alt="썸네일" />
        <div name="상품명">{name}</div>
      </div>
    </div>
  );
};

QnAItemInfo.propTypes = {
  thumbnail: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default QnAItemInfo;
