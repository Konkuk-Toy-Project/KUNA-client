import React from "react";
import PropTypes from "prop-types";
import ImgSection from "../ItemDetail/ItemBrief/ImgSection";
import UserName from "./UserName";
import RatingStars from "./RatingStars";
import IconX from "../Icon/IconX";

const ReviewPopup = () => {
  // 라우터 path로 정보 보내기
  // name, rate, text, imgs => 실제 데이터로 바꿔주기
  const name = "김냥냥";
  const rate = 3.5;
  const text = "상품리뷰입니다 울랄라";
  const imgs = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPU5ILakhRz1Sxs57QLxGFBlsXA1TgOczVFg&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBts2GJsjEOpSL03rk_3oLacW28UZ_oIVzw&usqp=CAU",
  ];

  // recoil로 선택한 리뷰 관련 데이터 가져오기
  const onClick = () => {
    console.log("팝업창 보이는 boolean -> false로");
  };
  return (
    <div>
      {/* 팝업창 관련 boolean === true 되면 보이기 */}
      <button onClick={onClick}>
        <IconX />
      </button>
      <ImgSection imgsrcs={imgs} defaultIdx={1} />
      <div name="textSection" backGroundColor="#f3e5f5">
        <UserName name={name} />
        <RatingStars rate={rate} />
        <span>{rate}</span>
        <br />
        <div name="text">{text}</div>
      </div>
    </div>
  );
};

ReviewPopup.propTypes = {};

export default ReviewPopup;
