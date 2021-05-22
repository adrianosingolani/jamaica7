import React from 'react';
import PropTypes from 'prop-types';

import Header from '../features/header/Header';
import Footer from '../features/footer/Footer';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;