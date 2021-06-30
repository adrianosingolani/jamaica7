import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
} from '@material-ui/core/';

import TrackList from '../Tracks/TrackList';

import { playTrack, setCurrentTrack } from '../../store/actions/playerActions';

const useStyles = makeStyles((theme) => ({
    box: {
        border: '1px solid #222',
        padding: theme.spacing(2, 2, 0, 2),
        margin: theme.spacing(0, 3, 3, 3),
        flexGrow: 1,
        overflow: 'auto'
    },
}));

export const Playlist = ({ player, playTrack, setCurrentTrack }) => {
    useEffect(() => {
        if (player.playlist.length === 1) {
            setCurrentTrack(0);
            playTrack();
        }
    }, [player.playlist]);

    const classes = useStyles();

    return (
        <Box className={classes.box}>
            <TrackList list={player.playlist} action='play' />
        </Box>
    )
}

const mapStateToProps = (state) => ({
    player: state.player,
})

const mapDispatchToProps = {
    setCurrentTrack,
    playTrack
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
