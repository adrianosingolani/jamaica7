import React, { useEffect } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';

import { logOutUser, loadUser } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'left',
    },
}));

export const Header = ({ history, auth, loadUser, logOutUser }) => {
    useEffect(() => {
        if (!auth.isAuthenticated) {
            loadUser();
        }
    }, [auth.isAuthenticated, loadUser]);

    const logOut = () => {
        logOutUser(history);
    }

    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>MERN Boilerplate</Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                {!auth.isAuthenticated ? (
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

export default connect(mapStateToProps, { logOutUser, loadUser })(withRouter(Header));