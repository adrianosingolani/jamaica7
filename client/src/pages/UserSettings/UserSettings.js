import React from 'react';
import { connect } from 'react-redux';

import { useFormik } from 'formik';
// import * as yup from 'yup';

import PageContainer from '../../components/PageContainer/PageContainer';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
} from '@material-ui/core';

import { loadUser } from '../../store/actions/authActions';

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

export const UserSettings = ({ loadUser }) => {
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
        </PageContainer>
    )
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, { loadUser })(UserSettings)