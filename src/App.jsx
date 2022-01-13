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
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
