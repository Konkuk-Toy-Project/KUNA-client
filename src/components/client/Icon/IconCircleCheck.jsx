import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import React from "react";

const IconCircleCheck = ({ color, size }) => {
  return (
    <>
      <FontAwesomeIcon
        icon={faCircleCheck}
        className={"styles.icon"}
        style={{ color: color, fontSize: size !== undefined ? size : "100px" }}
      />
    </>
  );
};

export default IconCircleCheck;
