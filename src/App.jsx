import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import ClientRouter from "./routers/ClientRouter";
import OwnerRouter from "./routers/OwnerRouter";

const GlobalStyles = createGlobalStyle`
  ${reset}
`;

const isClient = true;

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      {isClient ? <ClientRouter /> : <OwnerRouter />}
      <Footer />
    </Router>
  );
};

export default App;
