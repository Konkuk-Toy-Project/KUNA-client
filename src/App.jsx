import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { BrowserRouter } from "react-router-dom";

import Footer from "./components/common/Footer/Footer";
import Router from "./Router";

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Router />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
