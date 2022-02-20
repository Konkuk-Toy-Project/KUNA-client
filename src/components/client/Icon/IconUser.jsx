import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const IconUser = ({ color }) => {
  return (
    <>
      <FontAwesomeIcon
        icon={faUserCircle}
        className={"styles.icon"}
        style={{ color: color }}
      />
    </>
  );
};

export default IconUser;
