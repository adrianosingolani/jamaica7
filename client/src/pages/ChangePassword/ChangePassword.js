import React from 'react';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
} from '@material-ui/core';

import PasswordField from '../../components/PasswordField/PasswordField';
import PageContainer from '../../components/Layout/PageContainer';

import { changePassword } from '../../store/actions/passwordActions';

const validationSchema = yup.object({
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
        margin: theme.spacing(1, 0, 2),
    },
}));

export const ChangePassword = (props) => {
    const token = props.match.params.token;
    const { changePassword } = props;

    const classes = useStyles();

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            changePassword(values.password, token);
        },
    });
    return (
            <PageContainer title="Change Password" maxWidth="xs">
                <form className={classes.form} noValidate onSubmit={formik.handleSubmit}>
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
                    >Save</Button>
                </form>
            </PageContainer>
    )
}

const mapStateToProps = (state) => ({
    password: state.password,
});

const mapDispatchToProps = {
    changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)