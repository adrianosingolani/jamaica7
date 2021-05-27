import React from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
}));

export const Footer = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="relative">
            <Toolbar>
                <Typography className={classes.title}>MERN Boilerplate - 2021</Typography>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
