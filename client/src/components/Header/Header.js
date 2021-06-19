import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';

import { logOutUser } from '../../store/actions/authActions';
import { resetAlert } from '../../store/actions/alertActions';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'left',
    },
}));

export const Header = ({ location, history, auth, logOutUser, resetAlert }) => {
    const logOut = () => {
        logOutUser(history);
    }

    useEffect(() => {
        resetAlert();
    }, [location, resetAlert]);

    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>Jamaica 7''</Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                {!auth.authenticated ? (
                    <React.Fragment>
                        <Button color="inherit" component={Link} to="/register">Register</Button>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Button color="inherit" component={Link} to="/usersettings">User</Button>
                        <Button color="inherit" onClick={() => logOut()} >Logout</Button>
                    </React.Fragment>
                )}
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    logOutUser,
    resetAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));