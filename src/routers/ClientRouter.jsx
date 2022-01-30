import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Header from "../components/common/Header/Header";
import BasketPage from "../pages/client/BasketPage";
import CategoryPage from "../pages/client/CategoryPage";
import LikePage from "../pages/client/LikePage";
import MainPage from "../pages/client/MainPage";
import SearchPage from "../pages/client/SearchPage";
import UserPage from "../pages/client/UserPage";

const ClientRouter = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search/:content" element={<SearchPage />} />
        <Route path=":category" element={<CategoryPage />} />
        <Route path="/like" element={<LikePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default ClientRouter;
