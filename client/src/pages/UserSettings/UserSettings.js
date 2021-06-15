import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
// import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Typography,
} from '@material-ui/core';

import { loadUser, loadUserWithToken, setRandomUsername } from '../../store/actions/userActions';

import PageContainer from '../../components/PageContainer/PageContainer';
import AuthLoader from '../../components/AuthLoader/AuthLoader';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

export const UserSettings = ({ user, loadUser, loadUserWithToken, setRandomUsername }) => {
    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
        },
        onSubmit: (values) => {
            loadUser();
        },
    });

    return (
        <PageContainer title="User Settings" maxWidth="xs">
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => { setRandomUsername(); }}
            >Set Random Username</Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => { loadUserWithToken(); }}
            >Load User With Token</Button>
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Load User</Button>
            </form>
            { user.data ? (
                <AuthLoader>
                    <Typography component="pre">
                        user: {JSON.stringify(user.data, null, '\t')}
                    </Typography>
                </AuthLoader>
            ) : (
                <React.Fragment />
            )}
        </PageContainer>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = {
    loadUser,
    loadUserWithToken,
    setRandomUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);