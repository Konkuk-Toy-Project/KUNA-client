import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const IconX = ({ onClick }) => {
  return (
    <>
      <FontAwesomeIcon
        icon={faTimes}
        className={"styles.icon"}
        onClick={onClick}
      />
    </>
  );
};

export default IconX;
