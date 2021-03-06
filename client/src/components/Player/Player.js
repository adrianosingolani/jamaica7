import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

import PlayerControls from './PlayerControls';
import Playlist from './Playlist';

import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Box,
} from '@material-ui/core/';

import { setVolume, setDuration, setCurrentTime } from '../../store/actions/playerActions';

const useStyles = makeStyles((theme) => ({
    box: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
    }
}));

export const Player = ({ player, setVolume, setDuration, setCurrentTime }) => {
    const classes = useStyles();

    const [videoIndex, setVideoIndex] = useState(0);
    const [playerInstance, setPlayerInstance] = useState(null);

    const { playlist, currentPlaying } = player;

    useEffect(() => {
        setVideoIndex(0);
    }, [player.currentPlaying]);

    const changeVideo = () => {
        if (videoIndex + 1 >= playlist[currentPlaying.trackIndex]?.videoIds.length) setVideoIndex(0);
        else setVideoIndex(prevVideoIndex => prevVideoIndex + 1);
    }

    const playerError = (error) => {
        // console.log('playerError');
        // console.log(error);
        changeVideo();
    }

    const playerReady = (event) => {
        console.log('playerReady');
        event.target.setVolume(player.volume);
        setPlayerInstance(event.target);
    }

    const playerStateChange = (playerState) => {
        let currentTimeInterval;

        switch (playerState) {
            case -1:
                // unstarted
                // console.log('unstarted');
                break;
            case 0:
                // ended
                // console.log('ended');
                clearInterval(currentTimeInterval);
                break;
            case 1:
                // playing
                // console.log('playing');
                setDuration(playerInstance.getDuration());

                currentTimeInterval = setInterval(() => {
                    setCurrentTime(playerInstance.getCurrentTime());
                }, 1000);
                break;
            case 2:
                // paused
                // console.log('paused');
                clearInterval(currentTimeInterval);
                break;
            case 3:
                // buffering
                // console.log('buffering');
                break;
            case 5:
                // video cued
                // console.log('video cued');
                if (player.playing) playerInstance.playVideo();
                break;
            default:
                break;
        }
    }

    const options = {
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
        },
    };

    // bangarang: nw1ECvnqlu8
    // shortest: cdwal5Kw3Fc
    const videoId = playlist[currentPlaying.trackIndex]?.videoIds ? playlist[currentPlaying.trackIndex]?.videoIds[videoIndex] : null;

    return (
        <Box className={classes.box}>
            <YouTube
                videoId={videoId}
                opts={options}
                onError={(error) => { playerError(error) }}
                onReady={(event) => { playerReady(event) }}
                // onPlay={() => { console.log('onPlay'); }}
                // onPause={() => { console.log('onPause'); }}
                // onEnd={() => { console.log('onEnd'); }}
                onStateChange={(playerState) => { playerStateChange(playerState.data) }}
            />
            <Box display="flex" justifyContent="center">
                <Button
                    variant='outlined'
                    fullWidth
                    color='primary'
                    size='small'
                    onClick={() => {
                        changeVideo(videoIndex);
                    }}
                >change video</Button>
            </Box>
            {playerInstance ? <PlayerControls playerInstance={playerInstance} /> : <React.Fragment />}
            <Playlist />
        </Box>
    );
}

const mapStateToProps = (state) => ({
    player: state.player,
});

const mapDispatchToProps = {
    setVolume,
    setDuration, 
    setCurrentTime,
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);