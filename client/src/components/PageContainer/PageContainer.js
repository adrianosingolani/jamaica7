import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    CssBaseline,
    Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

export const PageContainer = ({title, children}) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">{ title }</Typography>
            </div>
            { children }
            </Container>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, {})(PageContainer);