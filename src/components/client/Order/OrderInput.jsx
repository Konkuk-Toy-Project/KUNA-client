import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import OrderLabel from "./OrderLabel";
import { OrderList } from "./OrderList";

const OrderInput = ({ label, info, name, onChange }) => {
  return (
    <OrderList>
      <OrderLabel text={label} />
      <Input type="text" name={name} value={info[name]} onChange={onChange} />
    </OrderList>
  );
};

OrderInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Input = styled.input`
  display: inline-block;
  height: 60%;
  width: ${({ width }) => (width !== undefined ? `${width}px` : "68%")};
  border: none;
  border-bottom: solid black 1px;
  padding-left: 5px;
  &:focus {
    outline: none;
  }
`;

export default OrderInput;
