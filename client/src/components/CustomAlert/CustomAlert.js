import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';

import { hideAlert } from '../../store/actions/alertActions';

const useStyles = makeStyles((theme) => ({
  alert: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: 0,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  }
}));

const CustomAlert = ({ alert, hideAlert }) => {
  const classes = useStyles();

  if (alert.show && alert.text && alert.severity) {
    if (alert.timeout > 0) {
      setTimeout(() => {
        hideAlert();
      }, alert.timeout);
    }
    return (
      <Alert className={classes.alert} severity={alert.severity}>
        {alert.text}
        {alert.button?.onClick && alert.button?.label ? (
          <Button className={classes.button} size="small" onClick={alert.button.onClick}>{alert.button.label}</Button>
        ) : (
          <React.Fragment />
        )}
      </Alert>
    );
  } else {
    return (<React.Fragment />)
  }
};

const mapStateToProps = (state) => ({
  alert: state.alert,
})

const mapDispatchToProps = {
  hideAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlert)
