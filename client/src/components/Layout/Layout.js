import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const useStyles = makeStyles((theme) => ({
  box: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Header />
      <Box className={classes.box}>{children}</Box>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;