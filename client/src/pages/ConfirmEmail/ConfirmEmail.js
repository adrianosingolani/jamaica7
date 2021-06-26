import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { confirmEmail, sendConfirmationEmail } from '../../store/actions/emailActions';

import PageContainer from '../../components/Layout/PageContainer';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Button, Box } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        margin: theme.spacing(1, 0),
    },
    button: {
        marginTop: theme.spacing(2),
    }
}));

export const ConfirmEmail = (props) => {
    const { confirmEmail, sendConfirmationEmail } = props;
    const { loading, confirmed, resendTo } = props.email;
    const token = props.match.params.token;

    const classes = useStyles();

    useEffect(() => {
        confirmEmail(token);
    }, [token, confirmEmail]);

    return (
        <PageContainer title="Email Address Confirmation">
            <Box className={classes.box}>
                {loading || confirmed === null ? (
                    <CircularProgress />
                ) : (
                    resendTo ? (
                        <React.Fragment>
                            <Typography>We couldn't confirm your email address with this link.</Typography>
                            <Typography>Please, click on the button below to send a new link to your email.</Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => sendConfirmationEmail(resendTo, token)}
                            >Send a new verification email</Button>
                        </React.Fragment>
                    ) : (
                        confirmed === false ? (
                            <React.Fragment>
                                <Typography>An error occurred while confirming your email address.</Typography>
                                <Typography>Please log in and go to user settings page for sending a new link to your email.</Typography>
                            </React.Fragment>
                        ) : (
                            confirmed === true ? (
                                <Typography>Thank you for confirming your email address!</Typography>
                            ) : (
                                <React.Fragment />
                            )
                        )
                    )
                )}
            </Box>
        </PageContainer >
    );
}

const mapStateToProps = (state) => ({
    email: state.email,
});

const mapDispatchToProps = {
    confirmEmail,
    sendConfirmationEmail,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
