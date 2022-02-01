import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ItemOptionState } from "../../../itemData/itemData";

const UP = "up";
const DOWN = "down";
const SEP = "_"; // seperator

const Option = () => {
  const optionOnes = useRecoilValue(ItemOptionState);
  const [optionTwos, setOptionTwos] = useState([]);
  const [isOpt1Chosen, setIsOpt1Chosen] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [stack, setStack] = useState("");
  const [selItems, setSelItems] = useState([]);

  const onChange = (e) => {
    if (!isOpt1Chosen) {
      setIsOpt1Chosen(true);
      setOption1(e.target.value);

      const tempOptOne = optionOnes.find((o) => o.name === e.target.value);
      const tempOptTwos = tempOptOne["option2"];
      // option2 있나 확인
      setOptionTwos(tempOptTwos);

      // option2 없음
      if (tempOptTwos.length === 0) {
        setStack(tempOptOne.count);
        setIsItemSelected(true);
      }
    } else {
      setStack(optionTwos.find((o) => o.name === e.target.value).count);
      setIsItemSelected(true);
      setOption2(e.target.value);
    }
  };

  const onBtnClick = (e) => {
    const btnName = e.target.name.split(SEP);
    const btnType = btnName[0];
    const itemIdx = Number(btnName[1]);

    switch (btnType) {
      case UP:
        selItems[itemIdx].count < selItems[itemIdx].stack
          ? setSelItems(
              selItems.map((item, idx) =>
                idx === itemIdx ? { ...item, count: item.count + 1 } : item
              )
            )
          : alert("최대 수량입니다");
        break;
      case DOWN:
        if (selItems[itemIdx].count > 1)
          setSelItems(
            selItems.map((item, idx) =>
              idx === itemIdx ? { ...item, count: item.count - 1 } : item
            )
          );

        break;
    }
  };

  useEffect(() => {
    if (!isItemSelected) return;

    // 수량 쪽으로 데이터 넘겨주기
    const idx = selItems.findIndex(
      (item) => item.option1 === option1 && item.option2 === option2
    );

    if (idx === -1) {
      // 기존에 선택한 적 없음
      setSelItems((cur) =>
        cur.concat({
          option1: option1,
          option2: option2,
          count: 1,
          stack: stack,
        })
      );
    } else alert("이미 추가된 옵션입니다! 수량을 변경해주세요. ");

    setOption1("");
    setOption2("");

    setIsOpt1Chosen(false);
    setIsItemSelected(false);
  }, [isItemSelected]);

  console.log(selItems);
  return (
    <div>
      <ul>
        <li>
          <select
            name="option1"
            id="option1"
            onChange={onChange}
            disabled={isOpt1Chosen}
          >
            <option selected={!isOpt1Chosen || !isItemSelected} disabled>
              옵션1
            </option>
            {optionOnes.map((optOne) => (
              <option key={"o1_" + optOne.name} disabled={optOne.count === 0}>
                {optOne.name}
                {optOne.count == 0 ? "(품절)" : null}
              </option>
            ))}
          </select>
        </li>
        <li>
          <select
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
                    disabled={optTwo.count === 0}
                  >
                    {optTwo.name}
                    {optTwo.count == 0 ? "(품절)" : null}
                  </option>
                ))
              : null}
          </select>
        </li>
      </ul>
      <div name="option-counter">
        <ul>
          {selItems.map((item, idx) => (
            <li key={item.option1 + idx} id={idx}>
              {item.option1}
              {item.option2 === "" ? " " : ", " + item.option2}
              <span>{item.count}</span>
              <div>
                <button name={UP + SEP + idx} onClick={onBtnClick}>
                  🔼
                </button>
                <button name={DOWN + SEP + idx} onClick={onBtnClick}>
                  🔽
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Option.propTypes = {};

export default Option;
