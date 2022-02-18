import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react/cjs/react.development";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentY, userTokenState } from "../../../../store/common/user";
import {
  currentItemState,
  showOptionPopUpState,
} from "../../../../store/owner/product";
import CloseButton from "../../../common/CloseButton/CloseButton";
import ProductButton from "../../../common/ProductButton/ProductButton";

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
  const userToken = useRecoilValue(userTokenState);
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
      .post(`http://localhost:8080/item/${currentItem.itemId}/option`, data, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((response) => response.data);
  }

  const onClickSubmit = async () => {
    if (addDetailOption) {
      return alert("세부 옵션 추가 완료 버튼을 눌러주세요");
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
      <Title>옵션 추가</Title>
      <InputWrapper>
        <CategoryTitle>옵션</CategoryTitle>
        <InputText
          type="text"
          placeholder="옵션을 입력해주세요"
          onChange={onChange(setOption)}
        />
      </InputWrapper>
      <InputWrapper>
        <CategoryTitle>재고</CategoryTitle>
        <InputText
          type="text"
          placeholder="재고를 입력해주세요"
          onChange={onChange(setOptionCount)}
        />
      </InputWrapper>
      {addDetailOption && (
        <div>
          <InputWrapper>
            <CategoryTitle>세부 옵션</CategoryTitle>
            <InputText
              type="text"
              placeholder="옵션을 입력해주세요"
              value={detailOption}
              onChange={onChange(setDetailOption)}
            />
          </InputWrapper>
          <InputWrapper>
            <CategoryTitle>재고</CategoryTitle>
            <InputText
              type="text"
              placeholder="재고를 입력해주세요"
              value={detailOptionCount}
              onChange={onChange(setDetailOptionCount)}
            />
          </InputWrapper>
        </div>
      )}
      <OptionButtons>
        {addDetailOption ? (
          <ProductButton onClick={onClickAddDetail}>
            세부 옵션 더 추가하기
          </ProductButton>
        ) : (
          <ProductButton onClick={onClickAddDetail}>
            세부 옵션 추가하기
          </ProductButton>
        )}
        {addDetailOption && (
          <ProductButton onClick={onClickFinish}>
            세부 옵션 추가 완료
          </ProductButton>
        )}
      </OptionButtons>
      <ProductButton onClick={onClickSubmit}>상품 추가하기</ProductButton>
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

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1.5em;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 0.5em;
  justify-content: center;
  align-items: center;
  width: 24em;
`;

const CategoryTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  width: 4em;
  text-align: end;
  margin-right: 0.5em;
`;

const InputText = styled.input`
  border: none;
  border-bottom: 1px solid black;
  align-self: flex-start;
  width: 12em;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const OptionButtons = styled.div`
  display: flex;
  margin: 1em 0;
`;

export default AddOptionPopUp;
