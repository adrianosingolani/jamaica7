import React from 'react';
import { connect } from 'react-redux';

import PageContainer from '../../components/PageContainer/PageContainer';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        justifyContent: 'center',
        // margin: theme.spacing(3),
    },
}));

export const NotFound = (props) => {
    const classes = useStyles();
    
    return (
        <PageContainer title="404">
            <Box className={classes.box}>
                <Typography>Page not found</Typography>
            </Box>
        </PageContainer>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound)