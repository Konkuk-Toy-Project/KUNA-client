import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ItemOptionState } from "../../../itemData/itemData";

const Option = () => {
  const optionOnes = useRecoilValue(ItemOptionState);
  const [optionTwos, setOptionTwos] = useState([]);
  const [isOpt1Chosen, setIsOpt1Chosen] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [stack, setStack] = useState("");
  const [selItems, setSelItems] = useState([]);
  const [input, setInput] = useState({});

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

  const onInputChange = (e) => {
    console.log(e.target.value);
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
      setInput((cur) => Object.assign(cur, { [option1 + option2]: 1 }));
    } else alert("이미 추가된 옵션입니다! 수량을 변경해주세요. ");

    setOption1("");
    setOption2("");

    setIsOpt1Chosen(false);
    setIsItemSelected(false);
  }, [isItemSelected]);

  console.log(input);
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
              <input type="number" min={1} max={item.stack}></input>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

Option.propTypes = {};

export default Option;
