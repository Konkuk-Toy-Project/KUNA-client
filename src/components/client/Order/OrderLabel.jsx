import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const OrderLabel = ({ text }) => {
  return <Label>{text}</Label>;
};

OrderLabel.propTypes = {};

const Label = styled.label`
  display: inline-block;
  width: 120px;
  font-weight: bold;
  padding: 10px 10px;
`;

export default OrderLabel;
