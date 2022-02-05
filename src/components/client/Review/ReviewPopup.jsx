import React from "react";
import PropTypes from "prop-types";
import ImgSlide from "../../common/ImgSlide/ImgSlide";
import UserName from "./UserName";
import RatingStars from "./RatingStars";
import IconX from "../Icon/IconX";

const ReviewPopup = ({ data, setData }) => {
  const onClick = () => setData({});

  return (
    <div>
      {Object.keys(data).length === 0 ? null : (
        <div>
          <button onClick={onClick}>
            <IconX />
          </button>
          <ImgSlide
            imgsrcs={data.reviewImagesUrl}
            defaultIdx={data.selImgIdx}
          />

          <div name="textSection" backgroundcolor="#f3e5f5">
            <UserName name={data.memberName} />
            <div>{data.option}</div>
            <RatingStars rate={data.rate} />
            <span>{data.rate}</span>
            <br />
            <div name="text">{data.description}</div>
            <div>{data.registryDate}</div>
          </div>
        </div>
      )}
    </div>
  );
};

ReviewPopup.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default ReviewPopup;
