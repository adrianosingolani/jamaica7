import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';

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

const CustomAlert = ({ alert }) => {
  const classes = useStyles();

  if (alert.show && alert.text && alert.severity) {
    return (
      <React.Fragment>
        <Alert className={classes.alert} severity={alert.severity}>
          {alert.text}
          { alert.button?.to && alert.button?.label ? (
            <Button className={classes.button} size="small" component={Link} to={alert.button.to}>{alert.button.label}</Button>
          ) : (
            <React.Fragment />
          )}
        </Alert>
      </React.Fragment>
    );
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
