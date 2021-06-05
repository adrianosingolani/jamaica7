import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  alert: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

const CustomAlert = ({ alert }) => {
  const classes = useStyles();

  if (alert.show && alert.text && alert.severity) {
    return (<Alert className={classes.alert} severity={alert.severity}>{alert.text}</Alert>);
  } else {
    return (<React.Fragment />)
  }
};

const mapStateToProps = (state) => ({
  alert: state.alert,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlert)
