import React from "react";
import styled from "styled-components";

const PreviewTitle = ({ name }) => {
  return <PreviewTitleWrapper>{name}</PreviewTitleWrapper>;
};

const PreviewTitleWrapper = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 1em;
`;

export default PreviewTitle;
