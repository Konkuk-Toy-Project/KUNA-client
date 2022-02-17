import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { showCouponPopUpState } from "../../../../store/owner/coupon";

const MenuCategory = ({ link, imageUrl, title, type }) => {
  const setShowCouponPopUp = useSetRecoilState(showCouponPopUpState);

  const onClickAdd = () => {
    setShowCouponPopUp(true);
  };
  return (
    <MenuCategoryWrapper>
      {type === "coupon" ? (
        <PageWrapper onClick={onClickAdd}>
          <Image src={imageUrl} alt="Category" />
          <Title>{title}</Title>
        </PageWrapper>
      ) : (
        <PageLink to={link}>
          <PageWrapper>
            <Image src={imageUrl} alt="Category" />
            <Title>{title}</Title>
          </PageWrapper>
        </PageLink>
      )}
    </MenuCategoryWrapper>
  );
};

const MenuCategoryWrapper = styled.div`
  width: 15em;
  height: 15em;
  border: 2px solid black;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin: 0em 0.2em;
  color: black;
  &:hover {
    transition: all 0.3s ease-in;
    background-color: black;
    color: white;
  }
`;

const PageLink = styled(Link)`
  text-decoration: none;
`;

const PageWrapper = styled.div`
  color: black;
  &:hover {
    color: white;
  }
`;

const Image = styled.img`
  width: 6em;
  margin-bottom: 0.4em;
`;

const Title = styled.p`
  font-size: 18px;
  font-weight: 400;
`;

export default MenuCategory;
