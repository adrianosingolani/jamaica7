import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Grid,
    IconButton,
    Slider,
    Typography
} from '@material-ui/core/';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
// import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import {
    setCurrentTrack,
    pauseTrack,
    playTrack,
    setVolume,
    setCurrentTime,
} from '../../store/actions/playerActions';

const useStyles = makeStyles((theme) => ({
    box: {
        margin: theme.spacing(3, 1),
    },
    item: {
        display: 'flex',
        padding: theme.spacing(0, 2),
    },
    largeIcon: {
        fontSize: '2.8rem',
        margin: theme.spacing(0, 1),
    },
    smallIcon: {
        fontSize: '1.8rem',
    },
    sliderPrimary: {
        color: 'white'
    }
}));

const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor((timeInSeconds % 60)).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
    const timeString = `${minutes}:${seconds}`;

    return timeString;
}

export const PlayerControls = ({ player, pauseTrack, playTrack, setCurrentTrack, setVolume, playerInstance }) => {
    const classes = useStyles();

    // useEffect(() => {
    //     if (player.playing) playerInstance.playVideo();
    //     else playerInstance.pauseVideo();
    // }, [player.playing, playerInstance])

    useEffect(() => {
        playerInstance.setVolume(player.volume);
    }, [player.volume, playerInstance]);

    // useEffect(() => {
    //     console.log(playerInstance.playerInfo.currentTime);
    // }, [playerInstance.playerInfo.currentTime])

    const play = () => {
        // console.log('play');
        playerInstance.playVideo();
        playTrack();
    }

    const pause = () => {
        // console.log('pause');
        playerInstance.pauseVideo();
        pauseTrack();
    }

    const previous = () => {
        // console.log('previous');
        if (player.currentPlaying.trackIndex > 0) {
            setCurrentTrack(player.currentPlaying.trackIndex - 1);
        }
    }

    const next = () => {
        // console.log('next');
        const nextTrack = player.currentPlaying.trackIndex + 1;
        if (nextTrack < player.playlist.length) {
            setCurrentTrack(nextTrack);
        }
    }

    return (
        <Box className={classes.box}>
            <Grid container alignItems='center'>
                <Grid item sm={6} className={classes.item}>
                    <IconButton size='small' onClick={() => { previous() }}>
                        <SkipPreviousIcon className={classes.smallIcon} />
                    </IconButton>
                    <IconButton size='small' onClick={() => { player.playing ? pause() : play() }}>
                        {
                            player.playing ? (
                                <PauseCircleFilledIcon className={classes.largeIcon} />
                            ) : (
                                <PlayCircleFilledIcon className={classes.largeIcon} />
                            )
                        }
                    </IconButton>
                    <IconButton size='small' onClick={() => { next() }}>
                        <SkipNextIcon className={classes.smallIcon} />
                    </IconButton>
                </Grid>
                <Grid item sm={6} className={classes.item}>
                    <Grid container spacing={1} alignItems='center'>
                        <Grid item>
                            <VolumeDownIcon />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                classes={{ colorPrimary: classes.sliderPrimary }}
                                value={player.volume}
                                onChange={(event, value) => {
                                    setVolume(value);
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <VolumeUpIcon />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sm={12} className={classes.item}>
                    <Grid container spacing={2} alignItems='center'>
                        <Grid item>
                            <Typography variant='subtitle2'>
                                {player.currentPlaying.currentTime ? formatTime(player.currentPlaying.currentTime) : '0:00'}
                            </Typography>
                        </Grid>
                        <Grid item xs='auto' xs>
                            <Slider
                                classes={{ colorPrimary: classes.sliderPrimary }}
                                value={player.currentPlaying.currentTime}
                                max={player.currentPlaying.duration}
                                onChange={(event, value) => {
                                    console.log(value);
                                    setCurrentTime(value);
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle2'>
                                {player.currentPlaying.duration ? formatTime(player.currentPlaying.duration) : '0:00'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box>
    )
}

const mapStateToProps = (state) => ({
    player: state.player,
})

const mapDispatchToProps = {
    setCurrentTrack,
    pauseTrack,
    playTrack,
    setVolume
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)
