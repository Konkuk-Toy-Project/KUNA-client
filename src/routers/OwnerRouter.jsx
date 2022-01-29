import React from "react";
import OwnerMainPage from "../pages/owner/OwnerMainPage";
import { Navigate, Route, Routes } from "react-router";

const OwnerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<OwnerMainPage />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default OwnerRouter;
