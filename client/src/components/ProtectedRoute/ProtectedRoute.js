import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core/';

import { setAlert, resetAlert } from '../../store/actions/alertActions';

import Login from '../../pages/Login/Login';

export const ProtectedRoute = (props) => {
    const { auth, user, alert, setAlert, resetAlert } = props;

    useEffect(() => {
        if (user.data) {
            const userData = user.data;

            if (!userData.email_confirmed) {
                setAlert({
                    show: true,
                    text: 'Please click on the link sent to your email address to confirm it.',
                    severity: 'warning',
                    button: {
                        to: '#',
                        label: 'send again',
                    },
                    code: 'emailnotconfirmed'
                });
            } else if (alert.code === 'emailnotconfirmed') {
                resetAlert();
            }
        }

    }, [user?.data, alert.code, setAlert, resetAlert]);

    if (!auth.loading || !user.loading) {
        if (auth.authenticated) {
            return <Route {...props}></Route>
        } else {
            return <Login />
        }
    } else {
        return <CircularProgress />
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
    alert: state.alert,
})

const mapDispatchToProps = {
    setAlert,
    resetAlert,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
