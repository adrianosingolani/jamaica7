import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    CssBaseline,
    Typography,
    Box
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    container: {
        paddingLeft: 0,
    }
}));

export const PageContainer = (props) => {
    const {title, children} = props;
    
    const classes = useStyles();

    return (
        <Container className={classes.container} component="main" {...props}>
            <CssBaseline />
            <Box className={classes.box}>
                <Typography variant="h5">{ title }</Typography>
            </Box>
            { children }
            </Container>
    )
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, {})(PageContainer);