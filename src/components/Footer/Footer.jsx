import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterWrapper>
      <Title>ABOUT KU_SHOPPING_MALL</Title>
      <Description>
        <Content>상호 : 건국대학교(주)</Content>
        <Content>사업장 : 건국대학교 도서관 401호</Content>
        <Content>안내 전화 : 1234-5678</Content>
      </Description>
      <Description>
        <Content>대표이사 : Billy</Content>
        <Content>사업자등록번호 : 010-1234-5678</Content>
      </Description>
      <Content>© COPYRIGHT 2022 KUSM ALL RIGHTS RESERVED.</Content>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  height: 10vh;
  background-color: black;
  color: white;
  padding: 2em 3em;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 14px;
  display: flex;
  margin: 0.5em 0;
`;

const Content = styled.p`
  margin-right: 2em;
`;

export default Footer;
