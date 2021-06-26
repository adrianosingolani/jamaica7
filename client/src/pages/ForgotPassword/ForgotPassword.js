import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
} from '@material-ui/core';

import PageContainer from '../../components/Layout/PageContainer';
import AuthLoader from '../../components/AuthLoader/AuthLoader';

import { sendPasswordEmail } from '../../store/actions/passwordActions';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
}));

export const ForgotPassword = ({ history, auth, sendPasswordEmail }) => {
    const location = useLocation();

    useEffect(() => {
        if (auth.authenticated) {
            if (location.pathname === '/login') history.push('/usersettings');
            else history.push(location.pathname);
        }
    }, [auth.authenticated, history, location.pathname]);

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            sendPasswordEmail(values.email);
        },
    });
    return (
        <AuthLoader>
            <PageContainer title="Forgot Password" maxWidth="xs">
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Send Email</Button>
                </form>
            </PageContainer>
        </AuthLoader>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    sendPasswordEmail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)