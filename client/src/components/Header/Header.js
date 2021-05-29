import React from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core/';

import { logOutUser } from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'left',
    },
}));

export const Header = ({ history, logOutUser }) => {
    const classes = useStyles();

    const logOut = () => {
        logOutUser(history);
    }

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>MERN Boilerplate</Typography>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/register">Register</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" onClick={() => logOut()} >Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { logOutUser })(withRouter(Header));