import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import YoutubePlayer from './YoutubePlayer';
import PlayerControls from './PlayerControls';
import Playlist from './Playlist';

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

export const Player = (props) => {
    // useEffect(() => {
    // }, [])

    // const classes = useStyles();

    return (
        <React.Fragment>
            <YoutubePlayer />
            <PlayerControls />
            <Playlist />
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Player);