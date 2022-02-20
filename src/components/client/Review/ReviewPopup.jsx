import React from "react";
import ImgSlide from "../../common/ImgSlide/ImgSlide";
import IconX from "../Icon/IconX";
import ReviewHeader from "./ReviewHeader";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { reviewPopupState } from "../../../store/client/popup";

const ReviewPopup = () => {
  const onClick = () => setData({});
  const [data, setData] = useRecoilState(reviewPopupState);

  return (
    <PopupBackGround>
      {Object.keys(data).length === 0 ? null : (
        <PopupContentWrapper>
          <IconXWrapper>
            <IconX onClick={onClick} />
          </IconXWrapper>
          <ImgSlideWrapper>
            <ImgSlide
              imgsrcs={data.reviewImagesUrl.map(
                (src) => `http://localhost:8080/image/review/${src}`
              )}
              defaultIdx={data.selImgIdx}
              mainW={"410px"}
              subW={"80px"}
            />
          </ImgSlideWrapper>

          <TextWrapper>
            <HeaderWrapper>
              <ReviewHeader
                rate={data.rate}
                memberName={data.memberName}
                option={data.option}
                date={data.registryDate}
              />
            </HeaderWrapper>

            <DescriptWrapper>{data.description}</DescriptWrapper>
          </TextWrapper>
        </PopupContentWrapper>
      )}
    </PopupBackGround>
  );
};

const PopupBackGround = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
`;
const PopupContentWrapper = styled.div`
  width: 850px;
  margin: 30px 0;
  display: flex;
  background-color: white;
  justify-content: space-around;
  border-radius: 5px;
  position: relative;
`;

const IconXWrapper = styled.div`
  text-align: right;
  font-size: 20px;
  z-index: 2;
  position: absolute;
  top: 1%;
  right: 1%;
`;

const TextWrapper = styled.div`
  width: 45%;
  background-color: white;
  border-radius: 5px;
  margin: 5px;
`;

const HeaderWrapper = styled.div`
  box-sizing: border-box;
  margin: 30px 0;
  padding: 0 0 15px 0;
  border-bottom: 1px #bdbdbd solid;
`;

const DescriptWrapper = styled.div`
  line-height: 180%;
  padding: 0 10px;
`;

const ImgSlideWrapper = styled.div`
  margin: 10px 5px;
  width: 45%;
`;

export default ReviewPopup;
