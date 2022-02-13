import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY } from "../../../../store/common/user";
import {
  currentItemState,
  showOptionPopUpState,
} from "../../../../store/owner/product";
import CloseButton from "../../../common/CloseButton/CloseButton";

const AddOptionPopUp = () => {
  const scrollY = useRecoilValue(currentY);
  const [option, setOption] = useState("");
  const [optionCount, setOptionCount] = useState("");
  const [detailOption, setDetailOption] = useState("");
  const [detailOptionCount, setDetailOptionCount] = useState("");
  const [addDetailOption, setAddDetailOption] = useState(false);
  const [detailOptions, setDetailOptions] = useState([]);
  const setShowOptionPopUp = useSetRecoilState(showOptionPopUpState);
  const currentItem = useRecoilValue(currentItemState);
  const navigate = useNavigate();

  const onChange = (handleChange) => (event) => {
    handleChange(event.target.value);
  };

  const createDetailOption = () => {
    const option = {
      name: detailOption,
      stock: Number(detailOptionCount),
    };
    setDetailOption("");
    setDetailOptionCount("");
    return option;
  };

  const accumulateOption = () => {
    const detailOption = createDetailOption();
    setDetailOptions([...detailOptions, detailOption]);
  };

  const onClickAddDetail = () => {
    if (!addDetailOption) {
      return setAddDetailOption(true);
    }
    if (window.confirm("해당 세부 옵션을 추가하시겠습니까?")) {
      accumulateOption();
      alert(
        "세부 옵션이 추가되었습니다. 더 추가하실 세부 입력이 있다면 다시 입력해주세요."
      );
    }
  };

  const onClickFinish = () => {
    accumulateOption();
    setAddDetailOption(false);
  };

  function addNewOption(data) {
    axios
      .post(`http://localhost:8080/item/${currentItem.itemId}/option`, data)
      .then((response) => response.data);
  }

  const onClickSubmit = async () => {
    if (addDetailOption) {
      return alert("세부 옵션 등록 완료 버튼을 눌러주세요");
    }
    const data = {
      option1s: [
        {
          name: option,
          stock: Number(optionCount),
          option2s: detailOptions,
        },
      ],
    };
    if (window.confirm("해당 옵션을 등록하시겠습니까?")) {
      await addNewOption(data);
      alert("옵션이 추가되었습니다. 홈페이지로 이동합니다.");
      setShowOptionPopUp(false);
      navigate("/");
    }
  };

  return (
    <AddOptionPopUpWrapper top={scrollY}>
      <CloseButton onClick={setShowOptionPopUp} />
      <div>
        <h1>옵션</h1>
        <input type="text" onChange={onChange(setOption)} />
      </div>
      <div>
        <h1>재고</h1>
        <input type="text" onChange={onChange(setOptionCount)} />
      </div>
      {addDetailOption && (
        <div>
          <div>
            <h1>세부 옵션</h1>
            <input
              type="text"
              value={detailOption}
              onChange={onChange(setDetailOption)}
            />
          </div>
          <div>
            <h1>재고</h1>
            <input
              type="text"
              value={detailOptionCount}
              onChange={onChange(setDetailOptionCount)}
            />
          </div>
        </div>
      )}
      {addDetailOption ? (
        <button onClick={onClickAddDetail}>세부 옵션 더 추가하기</button>
      ) : (
        <button onClick={onClickAddDetail}>세부 옵션 추가하기</button>
      )}
      {addDetailOption && (
        <button onClick={onClickFinish}>세부 옵션 추가 완료</button>
      )}
      <button onClick={onClickSubmit}>상품 추가하기</button>
    </AddOptionPopUpWrapper>
  );
};

const AddOptionPopUpWrapper = styled.div`
  top: ${(props) => props.top + "px"};
  left: 20vw;
  width: 60vw;
  height: 60vh;
  border: 1px solid black;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AddOptionPopUp;
