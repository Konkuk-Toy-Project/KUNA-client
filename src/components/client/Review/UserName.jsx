import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const UserName = ({ name }) => {
  return (
    <div>
      <FontAwesomeIcon icon={faUserCircle} className={"styles.icon"} />
      <span>{name}</span>
    </div>
  );
};

UserName.propTypes = { name: PropTypes.string.isRequired };

export default UserName;
