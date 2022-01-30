import React from "react";
import OwnerMainPage from "../pages/owner/OwnerMainPage";
import { Navigate, Route, Routes } from "react-router";
import OwnerHeader from "../components/owner/OwnerHeader/OwnerHeader";

const OwnerRouter = () => {
  return (
    <div>
      <OwnerHeader />
      <Routes>
        <Route path="/" element={<OwnerMainPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default OwnerRouter;
