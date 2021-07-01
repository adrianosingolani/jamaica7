import React from 'react';
import { connect } from 'react-redux';

import { createMuiTheme, MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Container } from '@material-ui/core';

import Sidebar from '../Sidebar/Sidebar';
import Player from '../Player/Player';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      paper: '#333',
      default: '#222',
    }
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        '&:-webkit-autofill': {
          '-webkit-box-shadow': 'inherit',
          'box-shadow': 'inherit',
          'transition': 'background-color 99999999s ease-in-out 0s',
        }
      }
    },
    MuiLink: {
      root: {
      }
    }
  }
});

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    position: 'relative',
  },
  sidebar: {
    position: 'sticky',
    height: '100vh',
    top: 0,
    backgroundColor: '#111',
  },
  page: {
    marginTop: theme.spacing(2),
  },
  player: {
    position: 'sticky',
    height: '100vh',
    top: 0,
    backgroundColor: '#111',
    display: 'flex',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Box display='flex' alignItems='flex-start'>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={3} md={2} className={classes.sidebar}>
            <Sidebar />
          </Grid>
          <Grid item xs={3} md={5} lg={6} className={classes.page}>
            {children}
          </Grid>
          <Grid item xs={6} md={5} lg={4} className={classes.player}>
            <Player />
          </Grid>
        </Grid>
      </Box>
    </MuiThemeProvider>
  );
};

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
