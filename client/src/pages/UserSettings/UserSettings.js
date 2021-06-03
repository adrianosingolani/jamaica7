import React from 'react';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
// import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Typography,
} from '@material-ui/core';

import { loadUser } from '../../store/actions/authActions';

import PageContainer from '../../components/PageContainer/PageContainer';
import AuthLoader from '../../components/AuthLoader/AuthLoader';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

export const UserSettings = ({ auth, loadUser }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: 'email@email.com',
            password: 'password123',
        },
        onSubmit: (values) => {
            loadUser(values);
        },
    });

    return (
        <PageContainer title="User Settings">
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >Load User</Button>
            </form>
            <AuthLoader isAuthenticatedCondition={true}>
                <Typography component="pre">
                    user: {JSON.stringify(auth.user, null, '\t')}
                </Typography>
            </AuthLoader>
        </PageContainer>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)