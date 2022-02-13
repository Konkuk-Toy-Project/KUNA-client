import React from "react";
import OwnerMainPage from "../pages/owner/OwnerMainPage";
import { Navigate, Route, Routes } from "react-router";
import OwnerHeader from "../components/owner/OwnerHeader/OwnerHeader";
import OwnerProductPage from "../pages/owner/OwnerProductPage";
import OwnerAnswerPage from "../pages/owner/OwnerAnswerPage";

const OwnerRouter = () => {
  return (
    <div>
      <OwnerHeader />
      <Routes>
        <Route path="/" element={<OwnerMainPage />} />
        <Route path="/products" element={<OwnerProductPage />} />
        <Route path="/answers" element={<OwnerAnswerPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default OwnerRouter;
