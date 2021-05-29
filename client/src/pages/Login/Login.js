import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
// import { Checkbox, FormControlLabel } from '@material-ui/core';
import {
    Container,
    TextField,
    CssBaseline,
    Typography,
    Button,
    Grid,
} from '@material-ui/core';

import PasswordField from '../../components/PasswordField/PasswordField';

import { logInUser } from '../../store/actions/authActions';

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

export const Login = ({ history, logInUser }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            logInUser(values, history);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">Login</Typography>
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
                    <PasswordField
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Keep me logged in"
                    /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >Log In</Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="#">Don't have an account? Register</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, { logInUser })(Login)