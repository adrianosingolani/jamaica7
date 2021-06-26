import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';

// import { makeStyles } from '@material-ui/core/styles';
// import {
//     Typography,
// } from '@material-ui/core/';

// const useStyles = makeStyles((theme) => ({
//     title: {
//         flexGrow: 1,
//         textAlign: 'left',
//     },
// }));

const playerError = (e) => {
    console.log('playerError');
    console.log(e);
}

export const YoutubePlayer = ({ playlist }) => {
    // useEffect(() => {
    // }, [])

    // const classes = useStyles();

    const options = {
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
        },
    };

    // bangarang: nw1ECvnqlu8
    // shortest: cdwal5Kw3Fc
    const videoId = playlist.currentTrack?.videoId ? playlist.currentTrack?.videoId : 'cdwal5Kw3Fc';

    return (
        <React.Fragment>
            <YouTube
                videoId={videoId}
                opts={options}
                onError={(e) => { playerError(e) }}
            />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    playlist: state.playlist,
});

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubePlayer);