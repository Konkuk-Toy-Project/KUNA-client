import React, { useEffect, useState } from "react";
import IconX from "../../../Icon/IconX";
import PropTypes from "prop-types";

const UP = "up";
const DOWN = "down";
const SEP = "_"; // seperator

const Option = ({ item, chosen, setChosen, setChosenSubInfo }) => {
  const optionOnes = item.option1;
  const [optionTwos, setOptionTwos] = useState([]); // 선택한 옵션1의 child

  const [isOpt1Chosen, setIsOpt1Chosen] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);

  const [option1, setOption1] = useState(["", ""]); // 선택한 옵션1[옵션명, id]
  const [option2, setOption2] = useState(["", ""]); // 선택한 옵션2
  const [stock, setStock] = useState();

  const [selItems, setSelItems] = useState([]);

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

  const onBtnClick = (e) => {
    const btnName = e.target.name.split(SEP);
    const btnType = btnName[0];
    const itemIdx = Number(btnName[1]);

    switch (btnType) {
      case UP:
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
        break;
      case DOWN:
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

        break;
    }
  };

  const onDelBtnClick = (e) => {
    setSelItems(selItems.filter((sel, idx) => idx != e.target.name));
    setChosen(chosen.filter((chose, idx) => idx != e.target.name));
  };

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
          option1Id: option1[1],
          option2Id: option2[1],
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

  return (
    <div>
      <ul>
        <li>
          <select
            name="option1"
            id="option1"
            onChange={onChange}
            disabled={isOpt1Chosen || item.itemState === "sold_out"}
          >
            <option selected={!isOpt1Chosen || !isItemSelected} disabled>
              옵션1
            </option>
            {optionOnes.map((optOne) => (
              <option
                key={"o1_" + optOne.name}
                disabled={optOne.count === 0}
                data-id={optOne.option1Id}
              >
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
                    data-id={optTwo.option2Id}
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
                <button name={idx} key={"x_" + idx} onClick={onDelBtnClick}>
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
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

export default Option;
