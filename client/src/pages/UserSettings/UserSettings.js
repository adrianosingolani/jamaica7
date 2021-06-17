import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    TextField,
    Grid
} from '@material-ui/core';

import { loadUser, updateUser } from '../../store/actions/userActions';
import { sendPasswordEmail } from '../../store/actions/passwordActions';

import PageContainer from '../../components/PageContainer/PageContainer';

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .min(3, 'Username should be of minimum 3 characters length')
        .required('Username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

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

export const UserSettings = ({ history, user, loadUser, updateUser, sendPasswordEmail }) => {
    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateUser(values);
        },
    });

    const { setFieldValue } = formik;

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    useEffect(() => {
        if (user.data?.email) setFieldValue('email', user.data.email);
    }, [user.data?.email, setFieldValue]);

    useEffect(() => {
        if (user.data?.username) setFieldValue('username', user.data.username);
    }, [user.data?.username, setFieldValue]);

    return (
        <PageContainer title="User Settings" maxWidth="xs">
            <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    disabled
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
                >Save</Button>
            </form>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        fullWidth
                        onClick={() => { sendPasswordEmail(user.data.email) }}
                    >Change Password</Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        fullWidth
                        disabled
                    >Change Email</Button>
                </Grid>
            </Grid>
        </PageContainer >
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = {
    loadUser,
    updateUser,
    sendPasswordEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);