import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Grid,
    IconButton,
    Slider
} from '@material-ui/core/';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import VolumeDownIcon from '@material-ui/icons/VolumeDown';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
// import VolumeOffIcon from '@material-ui/icons/VolumeOff';

import { playTrack, pauseTrack, resumeTrack } from '../../store/actions/playerActions';

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: '#222',
        padding: theme.spacing(1),
        margin: theme.spacing(3),
    },
    item: {
        display: 'flex',
        padding: theme.spacing(0, 2),
    },
    largeIcon: {
        fontSize: '2.8rem',
        color: 'white',
        margin: theme.spacing(0, 1),
    },
    smallIcon: {
        fontSize: '1.8rem',
        color: 'white'
    },
    sliderPrimary: {
        color: 'white'
    }
}));

export const PlayerControls = ({ player, pauseTrack, resumeTrack, playTrack, playerInstance }) => {
    const classes = useStyles();

    // useEffect(() => {
    //     if (player.playing) playerInstance.playVideo();
    //     else playerInstance.pauseVideo();
    // }, [player.playing, playerInstance])

    const play = () => {
        // console.log('play');
        playerInstance.playVideo();
        resumeTrack();
    }

    const pause = () => {
        // console.log('pause');
        playerInstance.pauseVideo();
        pauseTrack();
    }

    const previous = () => {
        // console.log('previous');
        if (player.currentPlaying > 0) {
            playTrack(player.currentPlaying-1);
        }
    }

    const next = () => {
        // console.log('next');
        const nextTrack = player.currentPlaying + 1;
        if (nextTrack < player.playlist.length) {
            playTrack(nextTrack);
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
                            {/* <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" /> */}
                            <Slider classes={{colorPrimary: classes.sliderPrimary}} aria-labelledby="continuous-slider" />
                        </Grid>
                        <Grid item>
                            <VolumeUpIcon />
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
    playTrack,
    pauseTrack,
    resumeTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)
