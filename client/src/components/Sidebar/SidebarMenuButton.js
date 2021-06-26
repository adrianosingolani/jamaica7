import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    label: {
        justifyContent: 'flex-start'
    }
}));

export const SidebarButton = (props) => {
    const classes = useStyles();

    return (
        <Button {...props} classes={{label: classes.label}} color="inherit" component={Link}>{ props.children }</Button>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarButton)
