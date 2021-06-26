import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
} from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: '#222',
        padding: theme.spacing(2),
        margin: theme.spacing(3),
    },
}));

export const PlayerControls = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            PlayerControls
        </Box>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)
