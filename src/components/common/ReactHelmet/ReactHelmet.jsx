import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PropTypes from "prop-types";

const ReactHelmet = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet title={`KUNA │ ${title}`} />
    </HelmetProvider>
  );
};

ReactHelmet.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ReactHelmet;
