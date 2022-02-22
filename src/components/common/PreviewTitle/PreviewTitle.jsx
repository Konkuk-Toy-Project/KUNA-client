import React from "react";
import styled from "styled-components";

const PreviewTitle = ({ name }) => {
  return <PreviewTitleWrapper>{name}</PreviewTitleWrapper>;
};

const PreviewTitleWrapper = styled.p`
  color: #ab46bc;
  font-size: 36px;
  font-weight: 800;
  margin: 1em 0 2em 0;
`;

export default PreviewTitle;
