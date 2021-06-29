import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Sidebar from '../Sidebar/Sidebar';
import Player from '../Player/Player';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative'
  },
  sidebar: {
    position: 'sticky',
    height: '100vh',
    top: 0,
    backgroundColor: '#111',
  },
  page: {
    backgroundColor: '#222',
    color: '#FFF',
  },
  player: {
    position: 'sticky',
    height: '100vh',
    top: 0,
    backgroundColor: '#111',
    color: '#FFF',
    display: 'flex',
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <Grid item xs={2} className={classes.sidebar}>
        <Sidebar/>
        </Grid>
        <Grid item xs={6} className={classes.page}>
        { children }
        </Grid>
        <Grid item xs={4} className={classes.player}>
          <Player />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
