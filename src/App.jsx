import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CategoryPage from "./pages/CategoryPage";
import LikePage from "./pages/LikePage";
import BasketPage from "./pages/BasketPage";
import UserPage from "./pages/UserPage";
import SearchPage from "./pages/SearchPage";

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

const App = () => {
  return (
    <Router>
      <GlobalStyles />
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
      <Footer />
    </Router>
  );
};

export default App;
