import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const RatingStars = ({ rate }) => {
  const [rateArr, setRateArr] = useState([0, 0, 0, 0, 0]);
  useEffect(() => {
    const share = Math.floor(rate);
    const rest = rate - share;
    const tempArr = [0, 0, 0, 0, 0];
    var i = 0;
    for (i = 0; i < share; i++) tempArr[i] = 1;
    tempArr[share] = rest;

    setRateArr(tempArr);
  }, [rate]);

  return (
    <>
      {rateArr.map((rate, i) =>
        rate !== 0 ? (
          <FontAwesomeIcon
            key={i}
            icon={rate === 1 ? faStar : faStarHalf}
            style={{ color: "#ba68c8" }}
            className={"styles.icon"}
          />
        ) : null
      )}
    </>
  );
};

RatingStars.propTypes = { rate: PropTypes.number };

export default RatingStars;
