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

export const AuthLoader = ({ auth, children, isAuthenticatedCondition }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            {auth.isLoaded && !auth.isLoading && auth.isAuthenticated === isAuthenticatedCondition ? (
                <React.Fragment>{children}</React.Fragment>
            ) : (
                <Box className={classes.box}>
                    <CircularProgress />
                </Box>
            )}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoader)
