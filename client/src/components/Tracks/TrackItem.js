import React from 'react'
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { addTrackToPlaylist, setCurrentTrack, playTrack } from '../../store/actions/playerActions';

const useStyles = makeStyles((theme) => ({
    track: {
        '&:hover': {
            backgroundColor: '#333'
        },
        cursor: 'pointer',
    },
    disabled: {
        opacity: 0.1,
    },
    isPlaying: {
        color: '#8AF',
    }
}));

export const TrackItem = ({ player, addTrackToPlaylist, setCurrentTrack, playTrack, track, action, playlistPosition }) => {
    const classes = useStyles();

    let _onClick;
    let itemClassName;

    if (action === 'add') {
        itemClassName = track.videoIds.length === 0 ? classes.disabled : null;

        _onClick = () => {
            addTrackToPlaylist(track);
        }
    } else if (action === 'play') {
        itemClassName = player.currentPlaying.trackIndex === playlistPosition ? classes.isPlaying : null;

        _onClick = () => {
            setCurrentTrack(playlistPosition);
            playTrack();
        }
    }

    return (
        <Typography
            paragraph
            classes={{ root: classes.track }}
            className={itemClassName}
            onClick={() => {
                if (track.videoIds) _onClick();
            }}
        >
            <Typography variant="body1" component="span" display="block">
                <b>{track.artists}</b>
            </Typography>
            <Typography variant="body2" component="span" display="block">
                <i>{track.title}</i>
            </Typography>
        </Typography>
    )
}

const mapStateToProps = (state) => ({
    player: state.player,
})

const mapDispatchToProps = {
    addTrackToPlaylist,
    setCurrentTrack,
    playTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem)
