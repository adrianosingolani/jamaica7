import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    Grid,
} from '@material-ui/core';

import PasswordField from '../../components/PasswordField/PasswordField';
import PageContainer from '../../components/Layout/PageContainer';
import AuthLoader from '../../components/AuthLoader/AuthLoader';

import { registerUser } from '../../store/actions/authActions';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const useStyles = makeStyles((theme) => ({
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0),
    },
}));

export const Register = ({ history, auth, registerUser }) => {
    useEffect(() => {
        if (auth.authenticated) {
            history.push('/usersettings');
        }
    }, [auth.authenticated, history]);

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            registerUser(values, history);
        },
    });

    return (
        <AuthLoader>
            <PageContainer title="Register" maxWidth="xs">
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit} >
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
                    <PasswordField
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Register</Button>
                    <Grid container>
                        <Grid item xs></Grid>
                        <Grid item>
                            <Link to="/login">Already have an account? Log in</Link>
                        </Grid>
                    </Grid>
                </form >
            </PageContainer >
        </AuthLoader>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapDispatchToProps = {
    registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)