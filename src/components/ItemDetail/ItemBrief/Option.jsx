import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { ItemOptionState } from "../itemData/itemData";

const Option = () => {
  const optionOnes = useRecoilValue(ItemOptionState);
  const [optionTwos, setOptionTwos] = useState([]);
  const [isOpt1Chosen, setIsOpt1Chosen] = useState(false);
  const [hasOpt2, setHasOpt2] = useState(false);
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");

  const onChange = (e) => {
    if (!isOpt1Chosen) {
      setIsOpt1Chosen(true);
      setOption1(e.target.value);

      // option2 있나 확인
      const tempOptTwos = optionOnes.find((o) => o.name === e.target.value)[
        "option2"
      ];
      setOptionTwos(tempOptTwos);
      if (tempOptTwos.length === 0) {
        // option2 없음
        setHasOpt2(false);
        setIsOpt1Chosen(false);
      } else setHasOpt2(true); //option2 있음
    } else {
      setIsOpt1Chosen(false);
      setOption2(e.target.value);
    }
  };

  console.log("opt1 :" + option1);
  console.log("opt2 :" + option2);
  console.log(isOpt1Chosen);
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
            <option selected={!isOpt1Chosen} disabled>
              옵션1
            </option>
            {optionOnes.map((optOne) => (
              <option key={"o1_" + optOne.name}>{optOne.name}</option>
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
                  <option key={"o2_" + optTwo.name}>
                    {optTwo.name}
                    {optTwo.count == 0 ? "(품절)" : null}
                  </option>
                ))
              : null}
          </select>
        </li>
      </ul>
    </div>
  );
};

Option.propTypes = {};

export default Option;
