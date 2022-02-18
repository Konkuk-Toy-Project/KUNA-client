import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const PageTitle = ({ title }) => {
  return <Title>{title}</Title>;
};
PageTitle.propTypes = {};
const Title = styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  margin: 30px;
`;
export default PageTitle;
