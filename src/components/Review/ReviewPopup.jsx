import React from "react";
import PropTypes from "prop-types";
import ImgSection from "../ItemDetail/ItemBrief/ImgSection";
import UserName from './UserName';
import RatingStars from './RatingStars';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTimes } from "@fortawesome/free-solid-svg-icons";


const ReviewPopup = () => {
    // recoil로 선택한 리뷰 관련 데이터 가져오기 
    const onClick=()=>{console.log("팝업창 보이는 boolean -> false로")}
  return (
    <div>
        {/* 팝업창 관련 boolean === true 되면 보이기 */}
        <button onClick={onClick}>
            <FontAwesomeIcon 
                icon={faTimes}
                className={"styles.icon"}
            />
        </button>
      <ImgSection imgsrcs={} defaultIdx={}/>
      <div name="textSection" backGroundColor="#f3e5f5">
          <UserName name={}/>
          <RatingStars rate={}/>
          <br/>
        <div name="text">{}</div>
      </div>
    </div>
  );
};

ReviewPopup.propTypes = {};

export default ReviewPopup;
