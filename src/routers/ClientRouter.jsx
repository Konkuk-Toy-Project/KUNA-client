import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Header from "../components/client/Header/Header";
import BasketPage from "../pages/client/BasketPage";
import CategoryPage from "../pages/client/CategoryPage";
import FindAccountPage from "../pages/client/FindAccountPage";
import LikePage from "../pages/client/LikePage";
import LoginPage from "../pages/client/LoginPage";
import MainPage from "../pages/client/MainPage";
import SearchPage from "../pages/client/SearchPage";
import ItemDetailPage from "../pages/client/ItemDetailPage";
import SignUpFinPage from "../pages/client/SignUpFinPage";
import SignUpPage from "../pages/client/SignUpPage";
import UserPage from "../pages/client/UserPage";
import OrderPage from "../pages/client/OrderPage";

const ClientRouter = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="login/signUp" element={<SignUpPage />} />
        <Route path="login/signUp/complete" element={<SignUpFinPage />} />
        <Route path="login/findAccount" element={<FindAccountPage />} />
        <Route path="/search/:content" element={<SearchPage />} />
        <Route path=":category" element={<CategoryPage />} />
        <Route path="/item/:itemId" element={<ItemDetailPage />} />
        <Route path="/like" element={<LikePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default ClientRouter;
