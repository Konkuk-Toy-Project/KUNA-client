import React from "react";
import { useParams } from "react-router";

const CategoryPage = () => {
  const { category } = useParams();
  return <div>{category}</div>;
};

export default CategoryPage;
