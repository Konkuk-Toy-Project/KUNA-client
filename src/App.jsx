import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Router from "./Router";

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Router />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
