import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(3),
    },
}));

export const AuthLoader = ({ auth, user, children }) => {
    const classes = useStyles();


    if (!user.loading && !auth.loading) {
        return (
            <React.Fragment>{children}</React.Fragment>
        );
    } else {
        return (
            <Box className={classes.box}>
                <CircularProgress />
            </Box>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoader)
