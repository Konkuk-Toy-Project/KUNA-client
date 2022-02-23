import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { basketPopupState } from "../../../../../store/client/popup";
import UpDownBtn from "../../../../common/UpDownBtn/UpDownBtn";

const Option = ({ item, price, chosen, setChosen, setChosenSubInfo }) => {
  const optionOnes = item.option1;
  const [optionTwos, setOptionTwos] = useState([]); // 선택한 옵션1의 child

  const [isOpt1Chosen, setIsOpt1Chosen] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);

  const [option1, setOption1] = useState(["", ""]); // 선택한 옵션1[옵션명, id]
  const [option2, setOption2] = useState(["", ""]); // 선택한 옵션2
  const [stock, setStock] = useState();

  const [isSoldout, setIsSoldout] = useState(false);
  const [selItems, setSelItems] = useState([]);

  const basketPopup = useRecoilValue(basketPopupState);

  const onChange = (e) => {
    const target = e.target;
    const optIdx = target.options.selectedIndex - 1;

    if (!isOpt1Chosen) {
      setIsOpt1Chosen(true);
      setOption1([target.value, target.children[optIdx + 1].dataset.id]);

      // 선택된 option1의 option2 찾기
      const tempOptTwos = optionOnes[optIdx]["option2"];
      setOptionTwos(tempOptTwos);

      if (tempOptTwos.length === 0) {
        // option2 없음
        setStock(optionOnes[optIdx].stock);
        setIsItemSelected(true);
      }
    } else {
      setStock(optionTwos[optIdx].stock);
      setIsItemSelected(true);
      setOption2([target.value, target.children[optIdx + 1].dataset.id]);
    }
  };
  const onUpBtnClick = (e) => {
    const itemIdx = Number(e.target.name);
    if (selItems[itemIdx].count < selItems[itemIdx].stock) {
      setSelItems(
        selItems.map((sel, idx) =>
          idx === itemIdx ? { ...sel, count: sel.count + 1 } : sel
        )
      );
      setChosen(
        chosen.map((chosen, idx) =>
          idx === itemIdx ? { ...chosen, count: chosen.count + 1 } : chosen
        )
      );
    } else alert("최대 수량입니다");
  };

  const onDownBtnClick = (e) => {
    const itemIdx = Number(e.target.name);
    if (selItems[itemIdx].count > 1) {
      setSelItems(
        selItems.map((sel, idx) =>
          idx === itemIdx ? { ...sel, count: sel.count - 1 } : sel
        )
      );
      setChosen(
        chosen.map((chosen, idx) =>
          idx === itemIdx ? { ...chosen, count: chosen.count - 1 } : chosen
        )
      );
    }
  };
  const onDelBtnClick = (e) => {
    setSelItems(selItems.filter((sel, idx) => idx != e.target.name));
    setChosen(chosen.filter((chose, idx) => idx != e.target.name));
  };
  useEffect(() => {
    optionOnes.map((o1) => o1.stock).reduce((prev, post) => prev + post) === 0
      ? setIsSoldout(true)
      : setIsSoldout(false);
  }, []);

  useEffect(() => {
    if (!isItemSelected) return;

    // 수량 쪽으로 데이터 넘겨주기
    const idx = selItems.findIndex(
      (item) => item.option1 === option1[0] && item.option2 === option2[0]
    );

    if (idx === -1) {
      // 기존에 선택한 적 없음
      setSelItems((cur) =>
        cur.concat({
          option1: option1[0],
          option2: option2[0],
          count: 1,
          stock: stock,
        })
      );
      setChosen((cur) =>
        cur.concat({
          itemId: item.itemId,
          option1Id: parseInt(option1[1]),
          option2Id: parseInt(option2[1]),
          count: 1,
        })
      );
    } else alert("이미 추가된 옵션입니다! 수량을 변경해주세요. ");

    setOption1(["", ""]);
    setOption2(["", ""]);

    setIsOpt1Chosen(false);
    setIsItemSelected(false);
  }, [isItemSelected]);

  useEffect(() => {
    setChosenSubInfo(selItems);
  }, [selItems]);

  useEffect(() => {
    if (!basketPopup) {
      setChosen([]);
      setChosenSubInfo([]);
      setSelItems([]);
    }
  }, [basketPopup]);
  console.log(item);
  console.log(optionTwos);

  return (
    <div>
      <OptionsWrapper>
        <SelectLi>
          <Label>옵션 1</Label>
          <Select
            name="option1"
            id="option1"
            onChange={onChange}
            disabled={isOpt1Chosen || isSoldout}
          >
            <option selected={!isOpt1Chosen || !isItemSelected} disabled>
              옵션1
            </option>
            {optionOnes.map((optOne) => (
              <option
                key={"o1_" + optOne.name}
                disabled={optOne.stock === 0}
                data-id={optOne.option1Id}
              >
                {optOne.name}
                {optOne.stock == 0 ? "(품절)" : null}
              </option>
            ))}
          </Select>
        </SelectLi>
        <SelectLi>
          <Label>옵션 2</Label>
          <Select
            name="option2"
            id="option2"
            onChange={onChange}
            disabled={!isOpt1Chosen}
          >
            <option selected={isOpt1Chosen} disabled>
              옵션2
            </option>
            {isOpt1Chosen
              ? optionTwos.map((optTwo) => (
                  <option
                    key={"o2_" + optTwo.name}
                    disabled={optTwo.stock === 0}
                    data-id={optTwo.option2Id}
                  >
                    {optTwo.name}
                    {optTwo.stock === 0 ? "(품절)" : null}
                  </option>
                ))
              : null}
          </Select>
        </SelectLi>
      </OptionsWrapper>

      <div name="option-counter">
        <OptionAndCounterWrapper>
          {selItems.map((item, idx) => (
            <ItemLi key={item.option1 + idx} id={idx}>
              <ItemName>
                {item.option1}
                {item.option2 === "" ? " " : ", " + item.option2}
              </ItemName>
              <ItemCount>{item.count}</ItemCount>
              <UpDownBtn
                onUpBtnClick={onUpBtnClick}
                onDownBtnClick={onDownBtnClick}
                idx={idx}
              />

              <Price>{(price * item.count).toLocaleString()}원</Price>
              <DelBtn name={idx} key={"x_" + idx} onClick={onDelBtnClick}>
                ⨉
              </DelBtn>
            </ItemLi>
          ))}
        </OptionAndCounterWrapper>
        {chosen.length === 0 ? null : (
          <TotalPriceWrapper>
            <PriceLabel>총 결제금액</PriceLabel>
            <TotalPrice>
              {(
                chosen.map((c) => c.count).reduce((prev, post) => prev + post) *
                price
              ).toLocaleString()}
              <Won>원</Won>
            </TotalPrice>
          </TotalPriceWrapper>
        )}
      </div>
    </div>
  );
};

Option.propTypes = {
  item: PropTypes.object.isRequired,
  chosen: PropTypes.arrayOf(PropTypes.object).isRequired,
  setChosen: PropTypes.func.isRequired,
  setChosenSubInfo: PropTypes.func.isRequired,
};

const OptionAndCounterWrapper = styled.div`
  border-bottom: solid 1px #bdbdbd;
`;
const OptionsWrapper = styled.div`
  padding: 20px 0px;
  list-style-type: none;
  border-top: dashed 0.3px #bdbdbd;
  border-bottom: dashed 0.3px #bdbdbd;
`;
const SelectLi = styled.li`
  width: 100%;
  height: 60px;
`;

const Select = styled.select`
  display: inline-block;
  position: relative;
  top: 10%;
  width: 170px;
  height: 80%;
  padding-left: 10px;
  text-align: center;
`;

const Label = styled.label`
  display: inline-block;
  font-size: 13.5px;
  width: 20%;
  position: relative;
  top: 10%;
  text-align: center;
`;

const ItemLi = styled.li`
  display: flex;
  height: 40px;
  width: 100%;
  align-items: center;
  space-between: 20px;
  margin: 10px 0;
  padding-left: 10px;
`;

const ItemName = styled.span`
  display: inline-block;
  width: 35%;
`;
const ItemCount = styled.span`
  display: inline-block;
  height: 80%;
  text-align: center;
  width: 18%;
  border: 1px solid black;
  border-radius: 3px;
  line-height: 32px;
  margin: 0 3px;
`;
// const UpDownWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100%;
//   width: 10%;
//   margin: 0px 3px;
// `;

// const UpDownBtn = styled.button`
//   display: inline-block;
//   height: 50%;
//   border: none;
//   &:hover {
//     background-color: #424242;
//     color: white;
//   }
//   ${({ type }) =>
//     type === "up"
//       ? "{border-radius : 3px 3px 0 0 ; border-bottom: 0.1px solid #707070}"
//       : "{border-radius :  0 0 3px 3px;"}
// `;
const Price = styled.div`
  width: 22%;
  text-align: center;
`;
const DelBtn = styled.button`
  display: inline-block;
  background-color: transparent;
  font-weight: bold;
  outline: none;
  border: none;
`;

const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 45px;
  margin: 15px 0px;
`;

const PriceLabel = styled.label`
  font-size: 19px;
`;
const TotalPrice = styled.div`
  font-size: 26px;
  color: #ab47bc;
`;
const Won = styled.span`
  font-size: 15px;
`;
export default Option;
