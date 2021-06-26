import React from 'react'
import { connect } from 'react-redux';
// import { closest } from 'fastest-levenshtein';

import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { addTrackToPlaylist, playTrack } from '../../store/actions/playlistActions';

const useStyles = makeStyles((theme) => ({
    track: {
        '&:hover': {
            backgroundColor: '#1113'
        },
        cursor: 'pointer',
    }
}));

export const TrackItem = ({ addTrackToPlaylist, playTrack, track, action }) => {
    const classes = useStyles();

    // const record = recordState.selected.data;

    // function findVideoAndPlay(trackString) {
    //     const { videos } = record;

    //     if (videos) {
    //         const videoTitles = videos.map(video => {
    //             return video.title;
    //         })

    //         const closestVideoTitle = closest(trackString, videoTitles);
    //         const closestVideoIndex = videoTitles.indexOf(closestVideoTitle);

    //         const url = new URL(videos[closestVideoIndex].uri);
    //         const searchParams = new URLSearchParams(url.search);
    //         const videoId = searchParams.get("v");

    //         playTrack(videoId);
    //     } else {
    //         console.log('no videos');
    //     }
    // }

    let _onClick;

    if (action === 'add') {
        _onClick = () => {
            addTrackToPlaylist(track);
        }
    } else if (action === 'play') {
        _onClick = () => {
            playTrack(track);
        }
    }

    return (
        <React.Fragment>
            <Typography
                paragraph
                className={classes.track}
                onClick={() => {
                    // findVideoAndPlay(`${track.artists} - ${track.title}`);
                    _onClick();
                }}
            >
                <Typography variant="body1" component="span" display="block">
                    <b>{track.artists}</b>
                </Typography>
                <Typography variant="body2" component="span" display="block"><i>{track.title}</i></Typography>
            </Typography>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    addTrackToPlaylist,
    playTrack,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackItem)
