import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { CircularProgress } from '@material-ui/core/';

import { setAlert } from '../../store/actions/alertActions';
import { sendConfirmationEmail } from '../../store/actions/emailActions';

import Login from '../../pages/Login/Login';

export const ProtectedRoute = (props) => {
    const { auth, user, setAlert, sendConfirmationEmail } = props;

    useEffect(() => {
        if (user?.data && !user.data?.email_confirmed) {
            setAlert({
                show: true,
                text: 'Please click on the link sent to your email address to confirm it.',
                severity: 'warning',
                button: {
                    onClick: () => sendConfirmationEmail(),
                    label: 'send again',
                },
            });
        }
    }, [user?.data, user.data?.email_confirmed, setAlert, sendConfirmationEmail]);

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
    email: state.email,
})

const mapDispatchToProps = {
    setAlert,
    sendConfirmationEmail
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
