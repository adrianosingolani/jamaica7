import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core/';

import SidebarMenu from './SidebarMenu';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textAlign: 'left',
        fontWeight: 700,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    appbarRoot: {
        display: 'flex',
        position: 'relative',
        padding: theme.spacing(2),
    },
    appbarPrimary: {
        backgroundColor: 'transparent',
    }
}));

export const Sidebar = ({ location }) => {
    const classes = useStyles();

    return (
        <AppBar classes={{ root: classes.appbarRoot, colorPrimary: classes.appbarPrimary }} elevation={0}>
            <Toolbar className={classes.toolbar} disableGutters>
                <Typography variant="h6" className={classes.title}>Jamaica7.in</Typography>
                <SidebarMenu />
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));