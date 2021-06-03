import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Login from '../../pages/Login/Login';

import { CircularProgress } from '@material-ui/core/';

export const ProtectedRoute = (props) => {
    const { auth } = props;

    if (auth.isLoaded) {
        if (auth.isAuthenticated) { 
            return <Route {...props}></Route>
        } else {
            return <Login />
        }
    } else {
        return <CircularProgress />
        // return <React.Fragment />
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
