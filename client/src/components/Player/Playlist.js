import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
} from '@material-ui/core/';

import TrackList from '../Tracks/TrackList';

const useStyles = makeStyles((theme) => ({
    box: {
        border: '1px solid #222',
        padding: theme.spacing(2, 2, 0, 2),
        margin: theme.spacing(3),
    },
}));

export const Playlist = ({ playlist }) => {
    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <TrackList list={playlist.tracks} action={'play'} />
        </Box>
    )
}

const mapStateToProps = (state) => ({
    playlist: state.playlist,
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
